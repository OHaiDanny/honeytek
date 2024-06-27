import * as Types from '../../../../../lib/__generated/graphql.types';

import { AssetFieldsFragment } from '../../ctf-asset/__generated/ctf-asset.generated';
import { PageLinkFieldsFragment } from '../../../page-link/__generated/page-link.generated';
import { AssetFieldsFragmentDoc } from '../../ctf-asset/__generated/ctf-asset.generated';
import { PageLinkFieldsFragmentDoc } from '../../../page-link/__generated/page-link.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type CategoryFieldsFragment = { __typename: 'CategoryTopic', internalName?: string | null, name?: string | null, sys: { __typename?: 'Sys', id: string }, description?: { __typename?: 'CategoryTopicDescription', json: any } | null, featuredImage?: (
    { __typename?: 'Asset' }
    & AssetFieldsFragment
  ) | null, productsCollection?: { __typename?: 'CategoryTopicProductsCollection', items: Array<{ __typename?: 'TopicProduct', name?: string | null, filterDcVoltage?: string | null, filterAcVoltage?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: (
        { __typename?: 'Asset' }
        & AssetFieldsFragment
      ) | null } | null> } | null, targetPage?: { __typename?: 'CategoryTopic' } | { __typename?: 'ComponentCta' } | { __typename?: 'ComponentDuplex' } | { __typename?: 'ComponentHeroBanner' } | { __typename?: 'ComponentHeroCarousel' } | { __typename?: 'ComponentIconCarousel' } | { __typename?: 'ComponentInfoBlock' } | { __typename?: 'ComponentProductTable' } | { __typename?: 'ComponentTextBlock' } | { __typename?: 'FooterMenu' } | { __typename?: 'MenuGroup' } | { __typename?: 'NavigationMenu' } | (
    { __typename?: 'Page' }
    & PageLinkFieldsFragment
  ) | { __typename?: 'ProductDetailPage' } | { __typename?: 'Seo' } | { __typename?: 'TopicBusinessInfo' } | { __typename?: 'TopicPerson' } | { __typename?: 'TopicProduct' } | { __typename?: 'TopicProductFeature' } | null };

export type CtfCategoryQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfCategoryQuery = { __typename?: 'Query', categoryTopic?: (
    { __typename?: 'CategoryTopic' }
    & CategoryFieldsFragment
  ) | null };

export const CategoryFieldsFragmentDoc = `
    fragment CategoryFields on CategoryTopic {
  __typename
  sys {
    id
  }
  internalName
  name
  description {
    json
  }
  featuredImage {
    ...AssetFields
  }
  productsCollection {
    items {
      sys {
        id
      }
      name
      featuredImage {
        ...AssetFields
      }
      filterDcVoltage
      filterAcVoltage
    }
  }
  targetPage {
    ...PageLinkFields
  }
}
    `;
export const CtfCategoryDocument = `
    query CtfCategory($id: String!, $locale: String, $preview: Boolean) {
  categoryTopic(id: $id, preview: $preview, locale: $locale) {
    ...CategoryFields
  }
}
    ${CategoryFieldsFragmentDoc}
${AssetFieldsFragmentDoc}
${PageLinkFieldsFragmentDoc}`;
export const useCtfCategoryQuery = <
      TData = CtfCategoryQuery,
      TError = unknown
    >(
      variables: CtfCategoryQueryVariables,
      options?: UseQueryOptions<CtfCategoryQuery, TError, TData>
    ) =>
    useQuery<CtfCategoryQuery, TError, TData>(
      ['CtfCategory', variables],
      customFetcher<CtfCategoryQuery, CtfCategoryQueryVariables>(CtfCategoryDocument, variables),
      options
    );

useCtfCategoryQuery.getKey = (variables: CtfCategoryQueryVariables) => ['CtfCategory', variables];
;

useCtfCategoryQuery.fetcher = (variables: CtfCategoryQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfCategoryQuery, CtfCategoryQueryVariables>(CtfCategoryDocument, variables, options);