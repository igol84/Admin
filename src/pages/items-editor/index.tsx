import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useDictionary} from "../../hooks/pages";
import TableItems from "../../components/items-editor/TableItems";


const Items = () => {
  // const d = useDictionary('places')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={'Items Editor'}/>
      </Box>
      <TableItems/>
    </Box>
  );
};

export default Items;