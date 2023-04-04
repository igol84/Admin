import React, {useState} from 'react';
import {Box, Pagination, Stack} from "@mui/material";
import {useStyle} from "./style";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchProductsEditor} from "../../store/actions/products-editor";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {Module, ViewProduct} from "./types";
import SimpleProducts from "./modules/SimpleProductRow/SimpleProduct";
import SimpleProductSelected from "./modules/SimpleProductRow/SimpleProductSelected";
import Shoes from "./modules/ShoesRow/Shoes";
import ShoesForm from "./modules/ShoesRow/ShoesSelected";
import SearchInput from "../Form/SearchInput";

const ROWS_ON_PAGE = 12

const ProductsEditor = () => {
  const style: any = useStyle()
  const storeId = useStoreId()
  useLoaderAccess(fetchProductsEditor, {storeId})
  const {productsData, isLoading} = useAppSelector(state => state.productsEditorSlice)
  const showLoading = useIsLoadingDisplay(isLoading)

  const [search, setSearch] = useState<string>('')
  const searchRowsByName = (row: ViewProduct) => row.name.toUpperCase().includes(search.toUpperCase())
  const onSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const searchedProductsData = productsData.slice().filter(searchRowsByName)
  const countOfRows = searchedProductsData.length
  const countOfPages = Math.ceil(countOfRows / ROWS_ON_PAGE)

  const [page, setPage] = useState(1)
  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }
  const emptyRows = page > 0 ? Math.max(0, (page) * ROWS_ON_PAGE - countOfRows) : 0
  const filteredProductsDataOfPage = searchedProductsData.slice((page - 1) * ROWS_ON_PAGE, page * ROWS_ON_PAGE)

  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const onSelect = (rowIdx: number) => () => {
    setSelectedRowId(rowIdx)
  }
  const isSelected = (rowIdx: number) => rowIdx === selectedRowId
  const resetFormData = () => {
    setSelectedRowId(null)
  }


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
      {countOfPages > 1 && <Pagination sx={{pt: 1}} count={countOfPages} page={page} onChange={onChangePage}/>}
      <LoadingCircular show={showLoading}/>
    </>
  )
}

export default ProductsEditor;