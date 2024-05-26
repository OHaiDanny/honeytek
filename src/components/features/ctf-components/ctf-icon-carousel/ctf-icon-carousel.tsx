import {useContentfulInspectorMode} from "@contentful/live-preview/react"
import {Container, Theme} from "@mui/material"
import {makeStyles} from "@mui/styles"
import clsx from "clsx"
import Image from "next/image"
import Carousel from "react-multi-carousel"

import {IconCarouselFieldsFragment} from "./__generated/ctf-icon-carousel.generated"

import "react-multi-carousel/lib/styles.css"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    textAlign: "center",
    padding: theme.spacing(8, 0),
    background: "#222",
  },

  carouselTitle: {
    color: "#ff5d2f",
  },

  carouselWrapper: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
  },

  carouselItemContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    color: "white",
  },

  carouselItemTitle: {
    marginTop: theme.spacing(0),
    fontSize: "14px",
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
    items: 7,
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

export const CtfIconCarousel = (props: IconCarouselFieldsFragment) => {
  const {
    sys: {id},
    iconCarouselCollection,
  } = props

  const icons = iconCarouselCollection?.items
  const classes = useStyles()
  const inspectorMode = useContentfulInspectorMode({entryId: id})

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.root)}
      {...inspectorMode({fieldId: "carousel"})}
    >
      {icons && (
        <Carousel
          responsive={responsive}
          draggable={true}
          swipeable={true}
          infinite={true}
          autoPlay={true}
          partialVisbile={false}
          containerClass={classes.carouselWrapper}
        >
          {icons.map(
            (item, i) =>
              item &&
              item?.iconImage && (
                <article key={`${item.internalName}${i}`} className={classes.carouselItemContainer}>
                  <Image
                    src={item?.iconImage?.url || "none"}
                    width={50}
                    height={50}
                    alt={item?.iconImage?.description || "broken image"}
                  />
                  <h3 className={classes.carouselItemTitle}>{item.name}</h3>
                </article>
              ),
          )}
        </Carousel>
      )}
    </Container>
  )
}
