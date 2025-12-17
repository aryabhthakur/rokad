import fs from "fs";
import path from "path";
import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client/core";

/* =========================================================
   CONFIG
========================================================= */

const BASE_URL = "https://rokad.co";
const OUT_DIR = "public";

const GRAPHQL_ENDPOINT = process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1338/graphql';
const GRAPHQL_TOKEN = process.env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN || "110d9b452188755d394b4bfc68dd5e00af92060a5d6a935653c89ae389b34038f40bda4971ee7e926bc98da260d5796d812caa98ca7069526baad43e085884260bd2f1bbf9f5d44b33f47f2a42bc2f767ade450a1d1d6a0393b16818efc0c5d1934022a950ff37f70c1b69c0a87176600167e4e742a5cbbad4551a9fd9512a8e";

/* =========================================================
   APOLLO CLIENT (NODE SAFE)
========================================================= */

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    fetch,
    headers: GRAPHQL_TOKEN
      ? { Authorization: `Bearer ${GRAPHQL_TOKEN}` }
      : undefined,
  }),
  cache: new InMemoryCache(),
});

/* =========================================================
   GRAPHQL QUERY (AS PROVIDED)
========================================================= */

const SEARCHABLES_QUERY = gql`
  query Searchables {
    industries {
      slug
    }
    capabilities {
      slug
    }
    insights {
      slug
    }
    caseStudies {
      slug
    }
    mediaCenters {
      slug
    }
  }
`;

/* =========================================================
   TYPES
========================================================= */

type SlugItem = {
  slug: string;
};

type QueryResult = {
  industries: { slug: string }[];
  capabilities: { slug: string }[];
  insights: { slug: string }[];
  caseStudies: { slug: string }[];
  mediaCenters: { slug: string }[];
};

type SitemapUrl = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
};

/* =========================================================
   ROUTE PREFIX MAP (IMPORTANT)
========================================================= */

const PREFIX_MAP: Record<keyof QueryResult, string> = {
  industries: "/industry",
  capabilities: "/capability",
  insights: "/insight",
  caseStudies: "/case-study",
  mediaCenters: "/press",
};

/* =========================================================
   MANUAL ROUTES
========================================================= */

const MANUAL_ROUTES: SitemapUrl[] = [
  {
    loc: `${BASE_URL}/`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    loc: `${BASE_URL}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "yearly",
    priority: "0.6",
  },
  {
    loc: `${BASE_URL}/contact`,
    lastmod: new Date().toISOString(),
    changefreq: "yearly",
    priority: "0.6",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function buildUrls<T extends SlugItem>(
  items: T[],
  prefix: string,
  priority = "0.8",
  changefreq = "monthly"
): SitemapUrl[] {
  return items.map((item) => ({
    loc: `${BASE_URL}${prefix}/${item.slug}`,
    lastmod: new Date().toISOString(),
    changefreq,
    priority,
  }));
}

/* =========================================================
   MAIN
========================================================= */

async function generateSitemap() {
  console.log("🚀 Fetching data from GraphQL...");

  const { data } = await client.query<{ [K in keyof QueryResult]: QueryResult[K] }>({
    query: SEARCHABLES_QUERY,
  });

  const dynamicUrls: SitemapUrl[] = [
    ...buildUrls(data!.industries, PREFIX_MAP.industries, "0.9"),
    ...buildUrls(data!.capabilities, PREFIX_MAP.capabilities, "0.8"),
    ...buildUrls(data!.insights, PREFIX_MAP.insights, "0.7"),
    ...buildUrls(data!.caseStudies, PREFIX_MAP.caseStudies, "0.7"),
    ...buildUrls(data!.mediaCenters, PREFIX_MAP.mediaCenters, "0.6"),
  ];

  const allUrls = [...MANUAL_ROUTES, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
      .map(
        (u) => `<url>
  <loc>${u.loc}</loc>
  <lastmod>${u.lastmod}</lastmod>
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`
      )
      .join("\n")}
</urlset>`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemapXml);

  console.log("✅ sitemap.xml generated");

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), robotsTxt);
  console.log("✅ robots.txt generated");
}

generateSitemap().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});
