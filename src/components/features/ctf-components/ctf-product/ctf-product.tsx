import {useContentfulInspectorMode} from "@contentful/live-preview/react"
import {Theme, Container, Typography, Link} from "@mui/material"
import {makeStyles} from "@mui/styles"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"

import {ProductFieldsFragment} from "./__generated/ctf-product.generated"

import {CtfRichtext} from "@src/components/features/ctf-components/ctf-richtext/ctf-richtext"
import {Breadcrumb} from "@src/components/shared/breadcrumb"
import LayoutContext, {defaultLayout} from "@src/layout-context"
import {PRIMARY_COLOR} from "@src/theme"

const useStyles = makeStyles((theme: Theme) => ({
  innerIntroContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
    padding: theme.spacing(19, 0, 19),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
  innerBody: {
    order: 2,
    width: "100%",

    [theme.breakpoints.up("md")]: {
      width: "calc(70% - 2rem)",
    },
  },
  headline: {
    fontSize: "3.2rem",
    maxWidth: "60.4rem",
    fontWeight: 600,
    lineHeight: 1.39,
    [theme.breakpoints.up("xl")]: {
      fontSize: "2.375rem",
    },
  },
  subtitle: {
    fontSize: "2.2rem",
    maxWidth: "60.4rem",
    fontWeight: 400,
    lineHeight: 1.39,
    [theme.breakpoints.up("xl")]: {
      fontSize: "2.375rem",
    },
  },
  body: {
    fontWeight: 400,
    lineHeight: 1.52,
    marginTop: theme.spacing(7),
    maxWidth: "51rem",

    "& p": {
      fontSize: "2rem",
      [theme.breakpoints.up("xl")]: {
        fontSize: "1.75rem",
        fontWeight: 400,
        lineHeight: 1.56,
      },
    },
  },
  specifications: {},
  link: {
    display: "inline-block",
    "& a": {
      display: "inline-block",
      padding: theme.spacing(3),
      margin: theme.spacing(3),
      background: PRIMARY_COLOR,
      color: "white",
      textDecoration: "none",
      borderRadius: "4px",
    },
  },
  ctaContainer: {
    marginTop: theme.spacing(8),
    "& svg.MuiSvgIcon-root": {
      fontSize: "inherit",
    },
  },
  imageContainer: {
    marginBottom: theme.spacing(10),
    order: 1,
    width: "100%",

    "& image-gallery-thumbnail": {
      width: "50%",
    },

    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 0,
      order: 2,
      width: "calc(70%)",
    },
  },
  imageInner: {
    maxWidth: "47rem",
  },
  innerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
  },
  // featuresSection: {
  //   backgroundColor: "#FCFCFC",
  //   padding: theme.spacing(19, 0, 12),
  // },
  // featureSeparator: {
  //   backgroundColor: "#707070",
  //   height: "2px",
  //   "&:first-child": {
  //     display: "none",
  //   },
  // },
  // featureRow: {
  //   [theme.breakpoints.up("md")]: {
  //     display: "flex",
  //   },
  //   "&:not(:nth-child(2))": {
  //     marginTop: theme.spacing(10),
  //   },
  // },
  // featureName: {
  //   marginBottom: theme.spacing(4),
  //   marginTop: 0,
  //   color: "#414D63",
  //   [theme.breakpoints.up("md")]: {
  //     flexGrow: 1,
  //     flexShrink: 0,
  //     marginBottom: theme.spacing(10),
  //     marginRight: theme.spacing(10),
  //     width: "auto",
  //   },
  // },
  // featureValue: {
  //   [theme.breakpoints.up("md")]: {
  //     flexGrow: 0,
  //     flexShrink: 0,
  //     width: "50rem",
  //   },
  //   "& .MuiTypography-body1": {
  //     fontSize: "1.8rem",
  //     fontWeight: 400,
  //     color: "#414D63",
  //   },
  //   "& > div:last-child": {
  //     marginBottom: theme.spacing(10),
  //   },
  // },
  productSliderThumbnail: {
    "& .image-gallery-thumbnail-image": {
      width: "60%",
    },
    "&.active, &:hover": {
      border: "2px solid #ff5d2f !important",
    },
    "&:hover": {
      opacity: "0.8",
    },
  },
}))

export const CtfProduct = (props: ProductFieldsFragment) => {
  const {
    category,
    description,
    name,
    pdfFile,
    productGalleryCollection,
    specifications,
    subTitle,
    sys: {id},
  } = props

  const inspectorMode = useContentfulInspectorMode()
  const classes = useStyles()
  const galleryUrls = productGalleryCollection?.items.map(item => {
    return {
      original: item?.url,
      thumbnail: item?.url,
      originalHeight: 640,
      thumbnailClass: classes.productSliderThumbnail,
    }
  })

  return (
    <>
      <Container maxWidth={false}>
        <section className={classes.innerContainer}>
          <Breadcrumb type="product" categoryName={category} productName={name} />
        </section>
        <section className={classes.innerIntroContainer}>
          {galleryUrls && (
            <div className={classes.imageContainer}>
              <ImageGallery
                items={galleryUrls}
                showNav={false}
                thumbnailPosition="left"
                showPlayButton={false}
                showFullscreenButton={false}
              />
            </div>
          )}
          {/* {featuredImage && (
            <div
              className={classes.imageContainer}
              {...inspectorMode({
                entryId: id,
                fieldId: "featuredImage",
              })}>
              <CtfAsset {...featuredImage} showDescription={false} className={classes.imageInner} />
            </div>
          )} */}
          <div className={classes.innerBody}>
            {name && (
              <Typography
                variant="h1"
                component="h2"
                className={classes.headline}
                {...inspectorMode({entryId: id, fieldId: "name"})}
              >
                {name}
              </Typography>
            )}
            {subTitle && (
              <Typography
                variant="h2"
                component="h4"
                className={classes.subtitle}
                {...inspectorMode({entryId: id, fieldId: "subTitle"})}
              >
                {subTitle}
              </Typography>
            )}
            {description && (
              <LayoutContext.Provider value={{...defaultLayout, parent: "product-description"}}>
                <div
                  {...inspectorMode({
                    entryId: id,
                    fieldId: "description",
                  })}
                >
                  <CtfRichtext {...description} className={classes.body} />
                </div>
              </LayoutContext.Provider>
            )}
          </div>
        </section>
        <section className={classes.innerContainer}>
          <h3>Specifications</h3>
          {specifications && <CtfRichtext {...specifications} />}
          {pdfFile && (
            <div className={classes.link}>
              <Link href={pdfFile?.url || "#"} download rel="noreferrer" target="_blank">
                PDF Download
              </Link>
            </div>
          )}
        </section>
      </Container>
      {/* {featuresCollection && featuresCollection.items.length > 0 && (
        <LayoutContext.Provider value={{ ...defaultLayout, parent: 'product-table' }}>
          <section className={classes.featuresSection}>
            <Container maxWidth={false}>
              <div className={classes.innerContainer}>
                <Box component="dl">
                  {featuresCollection.items.map(
                    item =>
                      item && (
                        <Fragment key={item.sys.id}>
                          <div className={classes.featureSeparator} />
                          <div className={classes.featureRow}>
                            <Typography
                              variant="h3"
                              component="dt"
                              className={classes.featureName}
                              {...inspectorMode({
                                entryId: item.sys.id,
                                fieldId: 'name',
                              })}
                            >
                              {item.name}
                            </Typography>
                            <Box component="dd" margin={0} className={classes.featureValue}>
                              {item.longDescription && (
                                <div
                                  {...inspectorMode({
                                    entryId: item.sys.id,
                                    fieldId: 'longDescription',
                                  })}
                                >
                                  <CtfRichtext {...item.longDescription} />
                                </div>
                              )}
                            </Box>
                          </div>
                        </Fragment>
                      ),
                  )}
                </Box>
              </div>
            </Container>
          </section>
        </LayoutContext.Provider>
      )} */}
    </>
  )
}
