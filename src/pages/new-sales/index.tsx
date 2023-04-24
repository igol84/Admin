import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import NewSales from "../../components/new-sales";
import {useDictionaryTranslate} from "../../hooks/pages";

const NewSale = () => {
  const d = useDictionaryTranslate('NewSales')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d('title')}/>
      </Box>
      <NewSales/>
    </Box>
  );
};

export default NewSale;