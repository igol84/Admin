import React from 'react';
import {Box} from "@mui/material";
import Header from "../../components/Header";
import AddNewProductForm from "../../components/new-products/AddNewProductForm";



const NewProducts = () => {
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={'New products'}/>
      </Box>
      <AddNewProductForm/>
    </Box>
  );
};

export default NewProducts;