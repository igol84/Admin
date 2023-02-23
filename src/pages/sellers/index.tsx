import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useDictionary} from "../../hooks/pages";
import TableSellers from "../../components/sellers/TableSellers";


const Sellers = () => {
  const d = useDictionary('sellers')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <TableSellers/>
    </Box>
  );
};

export default Sellers;