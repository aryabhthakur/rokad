import "dotenv/config";
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
   APOLLO CLIENT
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

const RSS_QUERY = gql`
  query RssFeedItems {
    mediaCenters {
      title
      slug
      FeaturedImage {
        url
      }
      public_on
    }
    insights {
      Title
      slug
      FeaturedImage {
        url
      }
      publishedAt
    }
  }
`;

/* =========================================================
   TYPES
========================================================= */

type Image = {
    url: string;
};

type MediaCenter = {
    title: string;
    slug: string;
    FeaturedImage?: Image;
    public_on?: string;
};

type Insight = {
    Title: string;
    slug: string;
    FeaturedImage?: Image;
    publishedAt?: string;
};

type QueryResult = {
    mediaCenters: MediaCenter[];
    insights: Insight[];
};

/* =========================================================
   HELPERS
========================================================= */

function escapeXml(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function absoluteUrl(url?: string) {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://enduring-eggs-93543058c5.strapiapp.com/${url}`;
}

function buildItem({
    title,
    link,
    image,
    publishedAt,
}: {
    title: string;
    link: string;
    image?: string;
    publishedAt?: string;
}) {
    const pubDate = new Date(publishedAt ?? Date.now());

    return `
  <item>
    <title>${escapeXml(title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${pubDate.toUTCString()}</pubDate>

    ${image
            ? `<media:content url="${image}" medium="image"/>
           <media:thumbnail url="${image}" />`
            : ""
        }

    <news:news>
      <news:publication>
        <news:name>Rokad</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>
    </news:news>
  </item>`;
}

function buildFeed({
    title,
    description,
    items,
}: {
    title: string;
    description: string;
    selfLink: string;
    items: string;
}) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

  <channel>
    <title>${title}</title>
    <link>${BASE_URL}</link>
    <description>${description}</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Rokad RSS Generator</generator>

${items}
  </channel>
</rss>`;
}

/* =========================================================
   MAIN
========================================================= */

async function generateRss() {
    console.log("🚀 Fetching RSS feed data...");

    const { data } = await client.query<QueryResult>({
        query: RSS_QUERY,
    });

    /* ---------------- INSIGHTS FEED ---------------- */

    const insightItems = data!.insights
        .map((i) =>
            buildItem({
                title: i.Title,
                link: `${BASE_URL}/insight/${i.slug}`,
                image: absoluteUrl(i.FeaturedImage?.url),
                publishedAt: i.publishedAt,
            })
        )
        .join("\n");

    const insightsFeed = buildFeed({
        title: "Rokad — Insights",
        description:
            "Strategic insights and analysis on commerce, supply chains, and digital infrastructure.",
        selfLink: `${BASE_URL}/rss-insights.xml`,
        items: insightItems,
    });

    /* ---------------- MEDIA CENTER FEED ---------------- */

    const mediaItems = data!.mediaCenters
        .map((m) =>
            buildItem({
                title: m.title,
                link: `${BASE_URL}/press/${m.slug}`,
                image: absoluteUrl(m.FeaturedImage?.url),
                publishedAt: m.public_on,
            })
        )
        .join("\n");

    const mediaFeed = buildFeed({
        title: "Rokad — Media Center",
        description:
            "Official announcements, press releases, and company updates from Rokad.",
        selfLink: `${BASE_URL}/rss-media.xml`,
        items: mediaItems,
    });

    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, "rss-insights.xml"), insightsFeed);
    fs.writeFileSync(path.join(OUT_DIR, "rss-media.xml"), mediaFeed);

    console.log("✅ rss-insights.xml generated");
    console.log("✅ rss-media.xml generated");
}

generateRss().catch((err) => {
    console.error("❌ RSS generation failed:", err);
    process.exit(1);
});
