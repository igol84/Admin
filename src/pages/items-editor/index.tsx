import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useDictionary, useDictionaryTranslate} from "../../hooks/pages";
import ItemsEdit from "../../components/items-editor/ItemsEditor";



const Items = () => {
  const dict = useDictionaryTranslate('itemsEditor')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={dict('title')}/>
      </Box>
      <ItemsEdit/>
    </Box>
  );
};

export default Items;