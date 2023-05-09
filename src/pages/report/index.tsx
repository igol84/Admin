import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import Report from "../../components/Report";
import {useDictionaryTranslate} from "../../hooks/pages";


const ReportPage = () => {
  const d = useDictionaryTranslate('report')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d('title')}/>
      </Box>
      <Report/>
    </Box>
  );
};

export default ReportPage;