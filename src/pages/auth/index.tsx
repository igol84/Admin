import React from 'react';
import {Box} from "@mui/material";

import Header from "../../components/Header";
import AuthForm from "../../components/authForm";


const Auth = () => {
  return (
    <Box m='20px'>
      <Box>
        <Header title='Auth' subTitle='Auth'/>
        <Box sx={{
          p: 1,
          display: "flex",
          justifyContent: 'center',
        }}>
          <AuthForm/>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;