import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
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

const ProductsEditor = () => {
  const style: any = useStyle()
  const storeId = useStoreId()
  useLoaderAccess(fetchProductsEditor, {storeId})
  const {productsData, isLoading} = useAppSelector(state => state.productsEditorSlice)
  const showLoading = useIsLoadingDisplay(isLoading)

  const [search, setSearch] = useState<string>('')
  const searchRowsByName = (row: ViewProduct) => row.name.toUpperCase().includes(search.toUpperCase())


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
      <SearchInput value={search} setValue={setSearch}/>
      <Box sx={style}>
        <Stack>
          {productsData.slice().filter(searchRowsByName).map((product, rowId) => {
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
        </Stack>
        <LoadingCircular show={showLoading}/>
      </Box>
    </>
  )
}

export default ProductsEditor;