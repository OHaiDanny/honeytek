import * as Types from '../../../../../lib/__generated/graphql.types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type IconCarouselFieldsFragment = { __typename: 'ComponentIconCarousel', internalName?: string | null, sys: { __typename?: 'Sys', id: string }, iconCarouselCollection?: { __typename?: 'ComponentIconCarouselIconCarouselCollection', items: Array<{ __typename: 'CategoryTopic', internalName?: string | null, name?: string | null, sys: { __typename?: 'Sys', id: string }, iconImage?: { __typename?: 'Asset', title?: string | null, url?: string | null, description?: string | null } | null } | null> } | null };

export type CtfIconCarouselQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfIconCarouselQuery = { __typename?: 'Query', componentIconCarousel?: (
    { __typename?: 'ComponentIconCarousel' }
    & IconCarouselFieldsFragment
  ) | null };

export const IconCarouselFieldsFragmentDoc = `
    fragment IconCarouselFields on ComponentIconCarousel {
  __typename
  sys {
    id
  }
  internalName
  iconCarouselCollection {
    items {
      __typename
      sys {
        id
      }
      __typename
      sys {
        id
      }
      internalName
      name
      iconImage {
        title
        url
        description
      }
    }
  }
}
    `;
export const CtfIconCarouselDocument = `
    query CtfIconCarousel($id: String!, $locale: String, $preview: Boolean) {
  componentIconCarousel(id: $id, locale: $locale, preview: $preview) {
    ...IconCarouselFields
  }
}
    ${IconCarouselFieldsFragmentDoc}`;
export const useCtfIconCarouselQuery = <
      TData = CtfIconCarouselQuery,
      TError = unknown
    >(
      variables: CtfIconCarouselQueryVariables,
      options?: UseQueryOptions<CtfIconCarouselQuery, TError, TData>
    ) =>
    useQuery<CtfIconCarouselQuery, TError, TData>(
      ['CtfIconCarousel', variables],
      customFetcher<CtfIconCarouselQuery, CtfIconCarouselQueryVariables>(CtfIconCarouselDocument, variables),
      options
    );

useCtfIconCarouselQuery.getKey = (variables: CtfIconCarouselQueryVariables) => ['CtfIconCarousel', variables];
;

useCtfIconCarouselQuery.fetcher = (variables: CtfIconCarouselQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfIconCarouselQuery, CtfIconCarouselQueryVariables>(CtfIconCarouselDocument, variables, options);