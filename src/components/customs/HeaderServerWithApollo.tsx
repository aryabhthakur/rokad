import React from 'react';
import type { ReactElement } from 'react';
import Header from './header';
import { getServerApollo } from '@/lib/apollo-server';
import { gql } from '@apollo/client';
import { rokadOrder } from '@/lib/utils';

const QUERY = gql`
query HeaderMenus {
  headerMenus {
    slug
    name
    order
    list {
      href
      name
    }
    display
    desc
  }
}
`
export default async function HeaderServerWithFetch(): Promise<ReactElement | null> {
  const client = getServerApollo();
  const { data } = await client.query({
    query: QUERY,
  })

  // @ts-expect-error type err
  return <Header menus={Array.from(data.headerMenus).sort(rokadOrder)} />;
}
