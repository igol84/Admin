import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import Report from "../../components/Report";


const ReportPage = () => {
  // const d = useDictionary('sellers')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title='Report'/>
      </Box>
      <Report/>
    </Box>
  );
};

export default ReportPage;