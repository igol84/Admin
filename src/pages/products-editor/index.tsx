import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import ProductEditor from "../../components/products-editor";
import {useDictionaryTranslate} from "../../hooks/pages";


const ProductsEditor = () => {
  const dict = useDictionaryTranslate('ProductsEditor')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={dict('title')}/>
      </Box>
      <ProductEditor/>
    </Box>
  );
};

export default ProductsEditor;