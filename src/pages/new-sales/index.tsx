import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import NewSales from "../../components/new-sales";

const NewSale = () => {
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={'New Sale'}/>
      </Box>
      <NewSales/>
    </Box>
  );
};

export default NewSale;