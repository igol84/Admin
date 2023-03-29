import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {useStyle} from "./style";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchProductsEditor} from "../../store/actions/products-editor";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {Module} from "./types";
import SimpleProducts from "./modules/SimpleProductRow/SimpleProduct";
import SimpleProductFormRow from "./modules/SimpleProductRow/SimpleProductFormRow";


const ProductsEditor = () => {
  const style = useStyle()
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
                return <SimpleProductFormRow key={rowId} data={product} resetFormData={resetFormData}/>
              }
          }
        })}

      </Stack>
      <LoadingCircular show={showLoading}/>
    </Box>
  )
}

export default ProductsEditor;