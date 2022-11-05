import React, { useCallback, useState, memo } from 'react'
import styled from 'styled-components'
import { Box, Button, SelectChangeEvent, Typography } from '@/lib/material-ui'
import { Product, SortBy, Category } from '@/types'
import { ProductCard } from './ProductCard'
import { useToggleDrawer } from '@/hooks/useToggleDrawer'
import { FilterByDrawer } from './FilterByDrawer'

type ProductsFilterableProps = {
  products: Product[]
  categories: Category[]
}

const GridStyled = styled.div`
  padding-bottom: 16px;
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  justify-content: center;
  grid-gap: 16px;
`

const GridHeaderStyled = styled.div`
  height: 42px;
  margin: 8px 0;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 1 / -1;
  z-index: 100;

  position: sticky;
  top: calc(64px + 16px);
`

const MemoizedProductCard = memo(ProductCard)

export const ProductsFilterable: React.FC<ProductsFilterableProps> = ({
  products,
  categories
}) => {
  const { isOpen, onToggleDrawer } = useToggleDrawer()
  const [filterSortBy, setFilteredSortBy] = useState<string>('')
  const [isFilteredCategories, setIsFilteredCategories] = useState(
    categories.map(() => false)
  )

  const onHandleChangeSortBy = useCallback(
    (e: SelectChangeEvent) => setFilteredSortBy(e.target.value),
    []
  )

  const onHandleChangeCategories: (index: number, checked: boolean) => void =
    useCallback(
      (id) =>
        setIsFilteredCategories((prev) =>
          prev.map((cate, index) => (index !== id ? cate : !cate))
        ),
      []
    )

  const filteredCategories = categories.filter(
    (cate, index) => isFilteredCategories[index] && cate
  )

  const filteredProducts = products.filter(
    (product) =>
      (filteredCategories.find((cate) => product.category === cate) ||
        filteredCategories.length === 0) &&
      product
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}
    >
      <FilterByDrawer
        categories={categories}
        filterSortBy={filterSortBy}
        isFilteredCategories={isFilteredCategories}
        onHandleChangeCategories={onHandleChangeCategories}
        onHandleChangeSortBy={onHandleChangeSortBy}
        isOpen={isOpen}
        onToggleDrawer={onToggleDrawer}
      />
      <GridStyled>
        <Box
          component={GridHeaderStyled}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
          }}
        >
          <Typography>
            <span style={{ fontWeight: 700 }}>{filteredProducts.length}</span>{' '}
            {filteredProducts.length <= 1 ? 'product' : 'products'}
          </Typography>
          <Button
            onClick={onToggleDrawer}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            Filter By
          </Button>
        </Box>
        {filteredProducts
          .sort((a, b) => {
            switch (filterSortBy) {
              case SortBy.ASCENDING_PRICE:
                return a.price - b.price
              case SortBy.DECREASING_PRICE:
                return b.price - a.price
              default:
                return a.title < b.title ? -1 : 0
            }
          })
          .map((sortedProduct) => (
            <MemoizedProductCard key={sortedProduct.id} {...sortedProduct} />
          ))}
      </GridStyled>
    </Box>
  )
}
