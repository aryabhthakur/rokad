import { gql } from '@apollo/client';
import { getServerApollo } from "@/lib/apollo-server";
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import ServiceHero from '@/components/service/hero';
import { Metadata, ResolvingMetadata } from 'next/types';

type Props = {
  params: Promise<{ slug: string }>
}

const QUERY = gql`
query Services($filters: ServiceFiltersInput) {
  services(filters: $filters) {
    name
    herotext
      featuredPartnership {
      name
      desc
      news
      logo {
        url
      }
    }
  }
}
`
// generateStaticParams: return array of { slug } objects (what Next expects)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const q = gql`
  query Query {
    services {
      slug
    }
  }
  `
  const client = getServerApollo();
  const { data } = await client.query({ query: q });

  // @ts-expect-error if GraphQL types are loose
  return data.services.map((c: { slug: string }) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params
  const { slug } = await params;

  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
    variables: {
      filters: { slug: { eq: slug } }
    }
  });

  // @ts-expect-error type err from GraphQL loose typing
  const currentCap = data.services?.[0];
  if (!currentCap) {
    return { title: 'Rokad', description: '' };
  }

  return {
    title: currentCap.name,
    description: currentCap.subtitle,
  }
}


export default async function ServicePage(props: Props): Promise<ReactNode> {
  const params = await props.params;
  const { slug } = params;
  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
    variables: {
      "filters": {
        "slug": {
          "eq": slug
        }
      }
    }
  })

  // @ts-expect-error type err
  const current = data.services[0]

  if (!current) {
    return notFound()
  }
  return (<>
    <ServiceHero {...current} />
  </>)
}