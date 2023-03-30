import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {useStyle} from "./style";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchProductsEditor} from "../../store/actions/products-editor";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {Module} from "./types";
import SimpleProducts from "./modules/SimpleProductRow/SimpleProduct";
import SimpleProductSelected from "./modules/SimpleProductRow/SimpleProductSelected";
import Shoes from "./modules/ShoesRow/Shoes";
import ShoesForm from "./modules/ShoesRow/ShoesSelected";


const ProductsEditor = () => {
  const style: any = useStyle()
  const storeId = useStoreId()
  useLoaderAccess(fetchProductsEditor, {storeId})
  const {productsData, isLoading} = useAppSelector(state => state.productsEditorSlice)
  const showLoading = useIsLoadingDisplay(isLoading)

  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const onSelect = (rowIdx: number) => () => {
    setSelectedRowId(rowIdx)
  }
  const isSelected = (rowIdx: number) => rowIdx === selectedRowId
  const resetFormData = () => {
    setSelectedRowId(null)
  }

  return (
    <Box sx={style}>
      <Stack>
        {productsData.map((product, rowId) => {
          switch (product.module) {
            case Module.product:
              if (!isSelected(rowId)) {
                return <SimpleProducts key={rowId} data={product} onSelect={onSelect(rowId)}/>
              } else {
                return <SimpleProductSelected key={rowId} data={product} resetFormData={resetFormData}/>
              }
            case Module.shoes:
              if (!isSelected(rowId)) {
                return <Shoes key={rowId} data={product} onSelect={onSelect(rowId)}/>
              } else {
                return <ShoesForm key={rowId} data={product} resetFormData={resetFormData}/>
              }

          }
        })}

      </Stack>
      <LoadingCircular show={showLoading}/>
    </Box>
  )
}

export default ProductsEditor;