import { gql } from '@apollo/client';
import { getServerApollo } from "@/lib/apollo-server";
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import ServiceHero from '@/components/service/hero';
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
type Props = { params: { service: string } };
export default async function ServicePage(props: Props): Promise<ReactNode> {
    const { service } = await props.params;
    const client = getServerApollo();
    const { data } = await client.query({
        query: QUERY,
        variables: {
            "filters": {
                "slug": {
                    "eq": service
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