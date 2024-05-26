import {useContentfulInspectorMode} from "@contentful/live-preview/react"
import {Theme, Typography, Container} from "@mui/material"
import {makeStyles} from "@mui/styles"
import throttle from "lodash/throttle"
import Image, {ImageLoader} from "next/image"
import queryString from "query-string"
import {useState, useRef, useEffect, useCallback} from "react"

import {CategoryFieldsFragment} from "./__generated/ctf-category.generated"
import {SectionHeadlines} from "../../section-headlines"

import {CtfRichtext} from "@src/components/features/ctf-components/ctf-richtext/ctf-richtext"
import {Breadcrumb} from "@src/components/shared/breadcrumb"

const contentfulLoader: ImageLoader = ({src, width, quality}) => {
  const params: Record<string, string | number> = {}

  if (width) {
    params.w = width
  }

  if (quality) {
    params.q = quality
  }

  return queryString.stringifyUrl({url: src, query: params})
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    backgroundColor: "#FCFCFC",
  },
  categoryContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
    padding: theme.spacing(4, 0, 11),
  },
  breadcrumbContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "126rem",
    padding: theme.spacing(4, 0),
    fontSize: "1.4rem",
  },
  sectionHeadlines: {
    marginBottom: theme.spacing(12),
  },
  comparisonTable: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    marginLeft: theme.spacing(-10),
    marginTop: theme.spacing(8),
    "@media (max-width: 1059px)": {
      '[data-columns-count="3"] & $comparisonTableColumn:nth-child(3) [data-equal-size]': {
        height: "auto !important",
      },
    },
    "@media (max-width: 819px)": {
      "[data-columns-count] & [data-equal-size]": {
        height: "auto !important",
      },
      "[data-columns-count] & $comparisonTableColumn:not(:first-child)": {
        marginTop: theme.spacing(8),
      },
    },
  },
  comparisonTableColumn: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    marginBottom: theme.spacing(4),
    maxWidth: "100%",
    paddingLeft: theme.spacing(10),
    width: "40.5rem",
    [theme.breakpoints.up("md")]: {
      width: "35rem",
    },
    "@media (min-width: 1320px)": {
      width: "21.5rem",
    },
  },
  comparisonFeaturesBreak: {
    padding: theme.spacing(6, 0, 6),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(11, 0, 11),
    },
  },
  title: {
    color: "#1B273A",
    fontSize: "2rem",
    fontWeight: 500,
    lineHeight: 1.09,
    textAlign: "center",
  },
  shortDescription: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    "& p": {
      fontWeight: 400,
      color: "#414D63",
      fontSize: "1.8rem",
      lineHeight: 1.55,
    },
  },
  featuredImage: {
    paddingBottom: theme.spacing(7),
  },
  feature: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing(5),
    },
    color: "#414D63",
  },
  featureInner: {
    overflow: "hidden",
  },
  signUp: {
    marginTop: theme.spacing(6),
  },
  categoryLink: {
    cursor: "pointer",
    textDecoration: "none",
  },
}))

export const CtfCategory = (props: CategoryFieldsFragment) => {
  // const { t } = useTranslation();
  const {
    name,
    description,
    productsCollection,
    sys: {id},
  } = props

  const classes = useStyles()
  const inspectorMode = useContentfulInspectorMode()

  // Rendering product features
  // const featureNames: string[] | null = useMemo(() => {
  //   if (!productsCollection || productsCollection?.items.length === 0) {
  //     return null
  //   }

  //   const names: string[] = []

  //   // TODO: I might need to revive featuresCollection and price if I am going to use this table

  //   // productsCollection?.items.forEach(product => {
  //   //   if (!product || (product.featuresCollection?.items.length || 0) === 0) {
  //   //     return;
  //   //   }

  //   //   product.featuresCollection!.items.forEach(feature => {
  //   //     if (!feature?.name) {
  //   //       return;
  //   //     }

  //   //     if (names.includes(feature.name)) {
  //   //       return;
  //   //     }

  //   //     names.push(feature.name);
  //   //   });
  //   // });

  //   return names
  // }, [productsCollection])

  // const featuresGrid: Record<
  //   string,
  //   Record<string, {attributes: Record<string, string>; value: any}>
  // > | null = useMemo(() => {
  //   if (!featureNames || !productsCollection) {
  //     return null
  //   }

  //   const grid = {}

  //   featureNames.forEach(featureName => {
  //     grid[featureName] = {}

  //     // productsCollection?.items.forEach(product => {
  //     //   if (!product || (product.featuresCollection?.items.length || 0) === 0) {
  //     //     return;
  //     //   }

  //     //   const feature = product.featuresCollection!.items.find(
  //     //     featureX => featureX?.name === featureName,
  //     //   );

  //     //   if (!feature) {
  //     //     return;
  //     //   }

  //     //   const fieldId: keyof typeof feature = feature.shortDescription
  //     //     ? 'shortDescription'
  //     //     : 'longDescription';

  //     //   grid[featureName][product.sys.id] = {
  //     //     attributes: inspectorMode({ fieldId, entryId: feature.sys.id }),
  //     //     value: feature[fieldId],
  //     //   };
  //     // });
  //   })

  //   return grid
  // }, [featureNames, productsCollection])

  // Keeping the grid items the same size
  const gridElement = useRef<HTMLDivElement>(null)
  const gridColumnElements = useRef<(HTMLDivElement | null)[]>([])
  const [gridSizes, setGridSizes] = useState<{[key: string]: number}>({})
  const resizeGridItems = useCallback(
    () =>
      throttle(() => {
        if (!gridElement.current || gridColumnElements.current.length === 0) {
          return
        }

        gridElement.current.setAttribute(
          "data-columns-count",
          `${gridColumnElements.current.length}`,
        )

        const children = gridElement.current.querySelectorAll("[data-equal-size]")

        if (children.length === 0) {
          return
        }

        const heightMap: {[key: string]: number} = {}

        for (let i = 0; i < children.length; i += 1) {
          const child = children[i]
          const childIndex = child.getAttribute("data-equal-size") || "0"
          const childHeight = child.scrollHeight

          if (heightMap[`index-${childIndex}`] === undefined) {
            heightMap[`index-${childIndex}`] = childHeight
          } else if (heightMap[`index-${childIndex}`] < childHeight) {
            heightMap[`index-${childIndex}`] = childHeight
          }
        }

        setGridSizes(heightMap)
      }, 100),
    [],
  )

  useEffect(() => {
    if (!gridElement.current) {
      return () => {
        window.removeEventListener("resize", resizeGridItems)
      }
    }

    window.addEventListener("resize", resizeGridItems)
    resizeGridItems()

    return () => {
      window.removeEventListener("resize", resizeGridItems)
    }
  }, [resizeGridItems])

  console.log(productsCollection)

  return (
    <div ref={gridElement}>
      <Container maxWidth={false} className={classes.section}>
        <section className={classes.breadcrumbContainer}>
          <Breadcrumb type="category" categoryName={name} />
        </section>
        <div className={classes.categoryContainer}>
          <SectionHeadlines
            headline={name}
            headlineLivePreviewProps={inspectorMode({entryId: id, fieldId: "name"})}
            className={classes.sectionHeadlines}
          />
          {description && <CtfRichtext {...description} />}
          {productsCollection && productsCollection.items.length > 0 && (
            <div className={classes.comparisonTable}>
              {productsCollection.items.map(
                (product, j) =>
                  product && (
                    <a
                      key={product.sys.id}
                      className={classes.categoryLink}
                      href={`/product/${product.name?.toLowerCase()}`}
                    >
                      <div
                        className={classes.comparisonTableColumn}
                        ref={el => {
                          gridColumnElements.current[j] = el
                        }}
                        {...inspectorMode({
                          entryId: product.sys.id,
                          fieldId: "internalName",
                        })}
                      >
                        <div
                          className={classes.featuredImage}
                          {...inspectorMode({
                            entryId: product.sys.id,
                            fieldId: "featuredImage",
                          })}
                        >
                          <div
                            data-equal-size="0"
                            style={{
                              height:
                                gridSizes[`index-0`] === undefined
                                  ? undefined
                                  : `${gridSizes[`index-0`]}px`,
                            }}
                          >
                            {product.featuredImage && (
                              <Image
                                src={product.featuredImage.url as string}
                                alt={product.featuredImage.description || ""}
                                width={product.featuredImage.width as number}
                                height={product.featuredImage.height as number}
                                quality={60}
                                loader={contentfulLoader}
                                sizes="(min-width: 355px) 355px, 98vw"
                              />
                            )}
                          </div>
                        </div>
                        <div
                          data-equal-size="1"
                          style={{
                            height:
                              gridSizes[`index-1`] === undefined
                                ? undefined
                                : `${gridSizes[`index-1`]}px`,
                          }}
                        >
                          <Typography
                            variant="h2"
                            className={classes.title}
                            {...inspectorMode({
                              entryId: product.sys.id,
                              fieldId: "name",
                            })}
                          >
                            {product.name}
                          </Typography>
                        </div>
                      </div>
                    </a>
                  ),
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
