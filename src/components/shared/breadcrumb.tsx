import {Theme} from "@mui/material"
import {makeStyles} from "@mui/styles"
import clsx from "clsx"

import {PRIMARY_COLOR} from "@src/theme"
import Link from "next/link"

const useStyles = makeStyles((theme: Theme) => {
  console.log(theme)

  return {
    breadcrumbList: {
      display: "flex",
      flexDirection: "row",
      listStyleType: "none",
      padding: 0,

      "& li": {
        paddingLeft: theme.spacing(1),
      },
      "& li > a": {
        cursor: "pointer",
        textDecoration: "none",
        color: "#000",

        "&:hover": {
          color: PRIMARY_COLOR,
        },
      },
      "& span": {
        paddingLeft: theme.spacing(1),
      },
    },
  }
})

export const Breadcrumb = ({
  type,
  categoryName,
  productName,
}: {
  type: string
  categoryName?: string | null
  productName?: string | null
}) => {
  const classes = useStyles()
  const parsedCategory = categoryName?.toLowerCase().replaceAll(" ", "-")
  const parsedProduct = productName?.toLowerCase()

  return (
    <div>
      <ol className={clsx(classes.breadcrumbList)}>
        <li>
          <Link href="/">Home</Link>
          <span>{">"}</span>
        </li>
        <li>
          <Link href="/product">Products</Link>
          <span>{">"}</span>
        </li>
        {(type === "product" || type === "category") && categoryName && (
          <li>
            <Link href={`/${parsedCategory}`}>{categoryName}</Link>
            {type !== "category" && <span>{">"}</span>}
          </li>
        )}
        {type === "product" && productName && (
          <li>
            <Link href={`${parsedProduct}`}>{productName}</Link>
          </li>
        )}
      </ol>
    </div>
  )
}
