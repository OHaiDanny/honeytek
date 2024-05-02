import {useContentfulLiveUpdates} from "@contentful/live-preview/react"
import React from "react"

import {useCtfIconCarouselQuery} from "./__generated/ctf-icon-carousel.generated"
import {CtfIconCarousel} from "./ctf-icon-carousel"

interface CtfIconGqlPropsInterface {
  id: string
  locale: string
  preview: boolean
}

export const CtfIconCarouselGql = (props: CtfIconGqlPropsInterface) => {
  const {id, locale, preview} = props
  const {data, isLoading} = useCtfIconCarouselQuery({
    id,
    locale,
    preview,
  })

  const componentIconCarousel = useContentfulLiveUpdates(data?.componentIconCarousel)

  if (!componentIconCarousel || isLoading) return null

  return <CtfIconCarousel {...componentIconCarousel} />
}
