import React from 'react';
import {motion} from "framer-motion";
import {Box, Pagination, Skeleton, Stack, useTheme} from "@mui/material";
import LoadingCircular from "../LoadingCircular";
import {Module} from "./types";
import SimpleProducts from "./modules/SimpleProductRow/SimpleProduct";
import Shoes from "./modules/ShoesRow/Shoes";
import SearchInput from "../Form/SearchInput";
import {useProductEditor} from "./hooks";
import _ from "lodash";
import {tokens} from "../../theme";


const ProductsEditor = () => {
  const rowsOnPage = 12
  const [
    style, filteredProductsDataOfPage, isSelected, onSelect, resetSelectedRow, search, onSearch, countOfPages, selectedPage,
    onChangePage, emptyRows, showLoading, isLoading
  ] = useProductEditor(rowsOnPage)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const variantsColors = {
    green: {backgroundColor: colors.greenAccent[700]},
    blue: {backgroundColor: colors.blueAccent[700]},
  }

  return (
    <>
      <SearchInput value={search} setValue={onSearch}/>
      <Box sx={style}>
        <Stack>

          {!isLoading ? filteredProductsDataOfPage.map((product, rowId) => {
              switch (product.module) {
                case Module.product:
                  return <SimpleProducts key={rowId} selected={isSelected(rowId)} data={product}
                                         resetSelectedRow={resetSelectedRow}/>
                case Module.shoes:
                  return <Shoes key={rowId} selected={isSelected(rowId)} viewShoes={product}
                                resetSelectedRow={resetSelectedRow}/>
              }
            }).map((component, rowId) => {
              const className = `paper product${isSelected(rowId) ? ' selected' : ''}`
              return (<motion.div key={rowId}
                className={className} onClick={isSelected(rowId) ? () => undefined : onSelect(rowId)}
                variants={variantsColors} animate={isSelected(rowId) ? 'green' : 'blue'}
                whileHover={isSelected(rowId) ? {} : {x: 5, backgroundColor: colors.greenAccent[700]}}
              >
                {component}
              </motion.div>)
            })
            : isLoading ? _.times(rowsOnPage).map((index) => (
              <Skeleton key={index} variant='rounded' height='43px' animation='wave'/>
            )) : null
          }
          {emptyRows > 0 && (
            <Box sx={{height: 50 * emptyRows - 4,}}> </Box>
          )}
        </Stack>
      </Box>
      {(countOfPages > 1 && !isLoading) &&
        <Pagination sx={{pt: 1}} count={countOfPages} page={selectedPage} onChange={onChangePage}/>}
      <LoadingCircular show={showLoading}/>
    </>
  )
}

export default ProductsEditor