import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import Showcase from "../../components/Showcase";
import {useDictionaryTranslate} from "../../hooks/pages";


const ShowcasePage = () => {
  const d = useDictionaryTranslate('showcase')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d('products')}/>
      </Box>
      <Showcase/>
    </Box>
  );
};

export default ShowcasePage;