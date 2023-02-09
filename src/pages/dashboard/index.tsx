import React, {useContext} from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {LanguageModeContext} from "../../language";


const Dashboard = () => {
  const {dictionary} = useContext(LanguageModeContext)
  const d = dictionary['dash']

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title={d['title']} subTitle={d['subTitle']}/>
      </Box>
    </Box>
  );
};

export default Dashboard;