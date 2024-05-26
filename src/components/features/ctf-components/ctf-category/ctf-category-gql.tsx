import {useContentfulLiveUpdates} from "@contentful/live-preview/react"
import {Container} from "@mui/material"
import Head from "next/head"

import {useCtfCategoryQuery} from "./__generated/ctf-category.generated"
import {CtfCategory} from "./ctf-category"

import {EntryNotFound} from "@src/components/features/errors/entry-not-found"

interface CtfCategoryGqlPropsInterface {
  id: string
  locale: string
  preview?: boolean
}

export const CtfCategoryGql = (props: CtfCategoryGqlPropsInterface) => {
  const {isLoading, data} = useCtfCategoryQuery({
    id: props.id,
    locale: props.locale,
    preview: props.preview,
  })

  const topicCategory = useContentfulLiveUpdates(data?.categoryTopic)

  if (!data || isLoading) {
    return null
  }

  if (!topicCategory) {
    return (
      <Container>
        <EntryNotFound />
      </Container>
    )
  }

  return (
    <>
      {topicCategory?.featuredImage && (
        <Head>
          <meta
            key="og:image"
            property="og:image"
            content={`${topicCategory.featuredImage.url}?w=1200&h=630&f=faces&fit=fill`}
          />
        </Head>
      )}
      <CtfCategory {...topicCategory} />
    </>
  )
}
