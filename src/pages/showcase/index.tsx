import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import Showcase from "../../components/Showcase";


const ShowcasePage = () => {
  // const d = useDictionaryTranslate('report')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={'site products'}/>
      </Box>
      <Showcase/>
    </Box>
  );
};

export default ShowcasePage;