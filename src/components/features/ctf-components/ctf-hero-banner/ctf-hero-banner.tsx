import {useContentfulInspectorMode} from "@contentful/live-preview/react"
import {Container, Theme, Typography} from "@mui/material"
import {makeStyles} from "@mui/styles"
import clsx from "clsx"
import {useMemo} from "react"

import {HeroBannerFieldsFragment} from "./__generated/ctf-hero-banner.generated"

import {CtfRichtext} from "@src/components/features/ctf-components/ctf-richtext/ctf-richtext"
import {PageLink} from "@src/components/features/page-link"
import LayoutContext, {defaultLayout, useLayoutContext} from "@src/layout-context"
import {getColorConfigFromPalette, HEADER_HEIGHT, PRIMARY_COLOR} from "@src/theme"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },

  fullScreen: {
    [theme.breakpoints.up("md")]: {
      minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
    },
    "@media (min-height: 91.2em)": {
      minHeight: "91.2rem",
    },
  },

  innerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(5, 0),
    position: "relative",
    width: "100%",
    textAlign: "center",
    "@media (min-height: 91.2em)": {
      padding: theme.spacing(39, 0, 39),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "125.8rem",
      textAlign: "left",
      padding: theme.spacing(5, 0, 33),
    },
  },

  partialBgContainer: {
    height: "300px",
    left: 0,
    maxWidth: "192rem",
    position: "relative",
    top: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      height: "100%",
      display: "block",
    },
  },

  partialBg: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    position: "relative",
    right: 0,
    top: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
    },
  },

  headline: {
    fontSize: "3rem",
    fontWeight: 800,
    lineHeight: 1.08,
    [theme.breakpoints.up("md")]: {
      width: "60rem",
      fontSize: "3.8rem",
    },
  },

  body: {
    fontWeight: 400,
    lineHeight: 1.56,
    marginTop: theme.spacing(6),
    "& p": {
      fontSize: "2rem",
      [theme.breakpoints.up("md")]: {
        width: "40rem",
      },
    },
  },
  ctaContainer: {
    marginTop: theme.spacing(6),
    "& a": {
      background: PRIMARY_COLOR,
    },
  },
}))

export const CtfHeroBanner = (props: HeroBannerFieldsFragment) => {
  const {
    image,
    imageStyle: imageStyleBoolean,
    headline,
    // Tutorial: uncomment the line below to make the Greeting field available to render
    // greeting,
    bodyText,
    ctaText,
    targetPage,
    sys: {id},
    heroSize: heroSizeBoolean,
  } = props
  const layout = useLayoutContext()

  const colorConfig = getColorConfigFromPalette()
  const imageStyle = imageStyleBoolean ? "partial" : "full"
  const heroSize =
    heroSizeBoolean === null || heroSizeBoolean === true ? "full_screen" : "fixed_height"
  const backgroundImage = useMemo(
    () =>
      image
        ? `${image.url}?w=${imageStyle === "partial" ? 767 * 2 : layout.containerWidth * 2}`
        : undefined,
    [image, imageStyle, layout.containerWidth],
  )
  const classes = useStyles()
  const inspectorMode = useContentfulInspectorMode({entryId: id})

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.root, heroSize === "full_screen" ? classes.fullScreen : null)}
      {...inspectorMode({fieldId: "image"})}
      style={{
        backgroundImage:
          imageStyle === "full" && backgroundImage ? `url(${backgroundImage!})` : undefined,
        backgroundColor: colorConfig.backgroundColor,
      }}
    >
      {imageStyle === "partial" && backgroundImage && (
        <div className={classes.partialBgContainer}>
          <div
            className={classes.partialBg}
            style={{
              backgroundImage: `url(${backgroundImage!})`,
            }}
          />
        </div>
      )}
      <div className={classes.innerContainer}>
        {/* Tutorial: uncomment this block to render the Greeting field value
        {greeting && (
          <Typography>
            {greeting}
          </Typography>
        )}
        */}
        {headline && (
          <Typography
            variant="h1"
            className={classes.headline}
            style={{color: colorConfig.headlineColor}}
            {...inspectorMode({fieldId: "headline"})}
          >
            {headline}
          </Typography>
        )}
        {bodyText && (
          <LayoutContext.Provider value={{...defaultLayout, parent: "hero-banner-body"}}>
            <div style={{color: colorConfig.textColor}} {...inspectorMode({fieldId: "bodyText"})}>
              <CtfRichtext {...bodyText} className={classes.body} />
            </div>
          </LayoutContext.Provider>
        )}
        {targetPage && ctaText && (
          <div className={classes.ctaContainer}>
            <PageLink
              page={targetPage}
              variant="contained"
              color={colorConfig.buttonColor}
              isButton
            >
              {ctaText}
            </PageLink>
          </div>
        )}
      </div>
    </Container>
  )
}
