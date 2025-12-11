// graphql/navbarQueries.ts
import { gql } from '@apollo/client';

export const NAVBAR_QUERY = gql`
  query HeaderMenus {
  headerMenus {
    slug
    name
    list {
      href
      name
      id
    }
    display
    desc
  }
}
`;
