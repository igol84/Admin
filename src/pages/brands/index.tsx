import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import Brands from "../../components/Brands";
import {useDictionaryTranslate} from "../../hooks/pages";


const BrandsPage = () => {
  const d = useDictionaryTranslate('brand')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d('brands')}/>
      </Box>
      <Brands/>
    </Box>
  );
};

export default BrandsPage;