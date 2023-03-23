import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import ProductEditor from "../../components/products-editor";


const ProductsEditor = () => {
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={'Product Editor'}/>
      </Box>
      <ProductEditor/>
    </Box>
  );
};

export default ProductsEditor;