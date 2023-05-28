import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import Brands from "../../components/Brands";


const BrandsPage = () => {
  // const d = useDictionaryTranslate('report')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={'brands'}/>
      </Box>
      <Brands/>
    </Box>
  );
};

export default BrandsPage;