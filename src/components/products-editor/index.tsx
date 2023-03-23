import React from 'react';
import {Box, Paper, Stack} from "@mui/material";
import {useStyle} from "./style";
import {useLoaderAccess} from "../../hooks/pages";
import {fetchProductsEditor} from "../../store/actions/products-editor";
import {useStoreId} from "../../hooks/redux";

interface Product {
  name: string
  open?: boolean
}

const Product = (props: Product) => {
  const {name, open = false} = props

  const onClick = !open ? ()  => {
    console.log(name)
  } : () => undefined

  const className = open ? 'selected' : ''
  return (
    <Paper className={className} sx={{p: 1}} onClick={onClick}>
      <Box>{name}</Box>

      <Paper hidden={!open} sx={{p: 1}} onClick={onClick}>
        Color
      </Paper>
    </Paper>
  )
}

const ProductsEditor = () => {
  const style = useStyle()
  const storeId = useStoreId()
  useLoaderAccess(fetchProductsEditor, {storeId})
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      sx={style}
    >
      <Product name={'Item 1'}/>
      <Product name={'Item 2'} open/>
      <Product name={'Item 3'}/>
    </Stack>
  )
}

export default ProductsEditor;