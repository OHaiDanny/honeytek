import {useContentfulInspectorMode} from "@contentful/live-preview/react"
import {Container, Theme} from "@mui/material"
import {makeStyles} from "@mui/styles"
import clsx from "clsx"
import Image from "next/image"
import Carousel from "react-multi-carousel"

import {HeroCarouselFieldsFragment} from "./__generated/ctf-hero-carousel.generated"

import {PageLink} from "@src/components/features/page-link"
import {getColorConfigFromPalette} from "@src/theme"
import "react-multi-carousel/lib/styles.css"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    textAlign: "center",
    padding: theme.spacing(8, 0),
  },

  carouselTitle: {
    color: "#ff5d2f",
  },

  carouselWrapper: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
    padding: theme.spacing(8, 0, 8),
    gap: theme.spacing(7),
  },

  carouselItemContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    border: "2px solid #ff5d2f",
  },

  carouselItemTitle: {
    marginTop: theme.spacing(0),
  },

  moreButton: {
    backgroundColor: "#ff5d2f",
    "&:hover": {
      backgroundColor: "#ff5d2f",
    },
  },
}))

const responsive = {
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 4,
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 3,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1,
  },
}

export const CtfHeroCarousel = (props: HeroCarouselFieldsFragment) => {
  const {
    sys: {id},
    internalName,
    carouselProductsCollection,
  } = props

  const colorConfig = getColorConfigFromPalette()
  const carouselItems = carouselProductsCollection?.items
  const classes = useStyles()
  const inspectorMode = useContentfulInspectorMode({entryId: id})

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.root)}
      {...inspectorMode({fieldId: "carousel"})}
    >
      <h1 className={classes.carouselTitle}>{internalName}</h1>
      {carouselItems && (
        <Carousel
          responsive={responsive}
          showDots={true}
          draggable={true}
          swipeable={true}
          infinite={true}
          partialVisbile={false}
          containerClass={classes.carouselWrapper}
        >
          {carouselItems.map(
            (item, i) =>
              item &&
              item?.featuredImage && (
                <article key={`${item.internalName}${i}`} className={classes.carouselItemContainer}>
                  <Image
                    src={item?.featuredImage?.url || "none"}
                    width={202}
                    height={202}
                    alt={item?.featuredImage?.description || "broken image"}
                  />
                  <h3 className={classes.carouselItemTitle}>{item.name}</h3>
                  {item.targetPage && item.targetPage.slug && (
                    <PageLink
                      className={classes.moreButton}
                      page={item.targetPage}
                      variant="contained"
                      color={colorConfig.buttonColor}
                      isButton
                    >
                      More +
                    </PageLink>
                  )}
                </article>
              ),
          )}
        </Carousel>
      )}
    </Container>
  )
}
