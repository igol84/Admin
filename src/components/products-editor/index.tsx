import React from 'react';
import {Box, Pagination, Stack} from "@mui/material";
import LoadingCircular from "../LoadingCircular";
import {Module} from "./types";
import SimpleProducts from "./modules/SimpleProductRow/SimpleProduct";
import SimpleProductSelected from "./modules/SimpleProductRow/SimpleProductSelected";
import Shoes from "./modules/ShoesRow/Shoes";
import ShoesForm from "./modules/ShoesRow/ShoesSelected";
import SearchInput from "../Form/SearchInput";
import {useProductEditor} from "./hooks";


const ProductsEditor = () => {
  const [
    style, filteredProductsDataOfPage, isSelected, onSelect, resetFormData, search, onSearch, countOfPages, selectedPage,
    onChangePage, emptyRows, showLoading
  ] = useProductEditor()


  return (
    <>
      <SearchInput value={search} setValue={onSearch}/>
      <Box sx={style}>
        <Stack>
          {filteredProductsDataOfPage.map((product, rowId) => {
            switch (product.module) {
              case Module.product:
                return isSelected(rowId)
                  ? <SimpleProductSelected key={rowId} data={product} resetFormData={resetFormData}/>
                  : <SimpleProducts key={rowId} data={product} onSelect={onSelect(rowId)}/>
              case Module.shoes:
                return isSelected(rowId)
                  ? <ShoesForm key={rowId} viewShoes={product} resetFormData={resetFormData}/>
                  : <Shoes key={rowId} viewShoes={product} onSelect={onSelect(rowId)}/>
            }
          })}
          {emptyRows > 0 && (
            <Box sx={{height: 50 * emptyRows - 4,}}> </Box>
          )}
        </Stack>
      </Box>
      {countOfPages > 1 && <Pagination sx={{pt: 1}} count={countOfPages} page={selectedPage} onChange={onChangePage}/>}
      <LoadingCircular show={showLoading}/>
    </>
  )
}

export default ProductsEditor