import * as Types from '../../../../../lib/__generated/graphql.types';

import { AssetFieldsFragment } from '../../ctf-asset/__generated/ctf-asset.generated';
import { AssetFieldsFragmentDoc } from '../../ctf-asset/__generated/ctf-asset.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type ProductFieldsFragment = { __typename: 'TopicProduct', name?: string | null, subTitle?: string | null, sys: { __typename?: 'Sys', id: string }, description?: { __typename?: 'TopicProductDescription', json: any } | null, specifications?: { __typename?: 'TopicProductSpecifications', json: any } | null, featuredImage?: (
    { __typename?: 'Asset' }
    & AssetFieldsFragment
  ) | null, pdfFile?: { __typename?: 'Asset', url?: string | null } | null, productGalleryCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', url?: string | null } | null> } | null };

export type CtfProductQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfProductQuery = { __typename?: 'Query', topicProduct?: (
    { __typename?: 'TopicProduct' }
    & ProductFieldsFragment
  ) | null };

export const ProductFieldsFragmentDoc = `
    fragment ProductFields on TopicProduct {
  __typename
  sys {
    id
  }
  name
  subTitle
  description {
    json
  }
  specifications {
    json
  }
  featuredImage {
    ...AssetFields
  }
  pdfFile {
    url
  }
  productGalleryCollection {
    items {
      url
    }
  }
}
    `;
export const CtfProductDocument = `
    query CtfProduct($id: String!, $locale: String, $preview: Boolean) {
  topicProduct(id: $id, preview: $preview, locale: $locale) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`;
export const useCtfProductQuery = <
      TData = CtfProductQuery,
      TError = unknown
    >(
      variables: CtfProductQueryVariables,
      options?: UseQueryOptions<CtfProductQuery, TError, TData>
    ) =>
    useQuery<CtfProductQuery, TError, TData>(
      ['CtfProduct', variables],
      customFetcher<CtfProductQuery, CtfProductQueryVariables>(CtfProductDocument, variables),
      options
    );

useCtfProductQuery.getKey = (variables: CtfProductQueryVariables) => ['CtfProduct', variables];
;

useCtfProductQuery.fetcher = (variables: CtfProductQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfProductQuery, CtfProductQueryVariables>(CtfProductDocument, variables, options);