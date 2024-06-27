import {Checkbox, FormControlLabel, FormGroup} from "@mui/material"
import {makeStyles} from "@mui/styles"

export const ProductFilter = ({products, filter, setFilter, setFilteredProducts}) => {
  const useStyles = makeStyles(() => ({
    productFilter: {
      width: "240px",
    },
  }))

  const updateFilters = ({isChecked, filterName, filterKey, selectedFilter}) => {
    if (isChecked) {
      selectedFilter[filterKey].push(filterName)
      return selectedFilter
    } else {
      const arrayWithRemovedFilter = selectedFilter[filterKey].filter(item => item !== filterName)
      return {...selectedFilter, [filterKey]: arrayWithRemovedFilter}
    }
  }

  const calculateFilteredProducts = newFilter => {
    const filteredProducts = [] as Array<any>

    newFilter.forEach(fil => {
      const key = Object.keys(fil).find(f => f.includes("filter")) || ""
      products.filter(product => {
        if (fil[key].length > 0) {
          let foundProduct
          fil[key].forEach(f => {
            if (product[key] === f) foundProduct = product
          })
          !filteredProducts.includes(foundProduct) && filteredProducts.push(foundProduct)
        }
      })
    })

    const flattenedFilteredProducts = filteredProducts.flat(1)

    flattenedFilteredProducts.length === 0
      ? setFilteredProducts(products)
      : setFilteredProducts(flattenedFilteredProducts)
  }

  const handleChange = (e, selectedFilter, filterKey, filterName) => {
    const isChecked = e.target.checked
    const updatedFilters = updateFilters({isChecked, filterName, filterKey, selectedFilter})

    const newFilter = filter.map(fil => {
      if (fil.name === updatedFilters.name) {
        return updatedFilters
      } else {
        return fil
      }
    })

    calculateFilteredProducts(newFilter)
    setFilter(newFilter)
  }

  const renderFilterFormGroup = fil => {
    const filterName = Object.keys(fil).find(f => f.includes("filter")) || ""
    const filters = Array.from(new Set(products.map(product => product[filterName]))) as string[]
    return (
      <FormGroup>
        {filters?.map(filter => (
          <FormControlLabel
            key={filter}
            control={<Checkbox />}
            label={filter}
            onChange={event => {
              handleChange(event, fil, filterName, filter)
            }}
          />
        ))}
      </FormGroup>
    )
  }

  const classes = useStyles()

  return (
    <div className={classes.productFilter}>
      <h3>Filters</h3>
      {filter.map(fil => (
        <section key={fil.name}>
          <p>{fil.name}</p>
          {renderFilterFormGroup(fil)}
        </section>
      ))}
    </div>
  )
}
