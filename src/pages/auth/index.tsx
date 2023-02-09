import React from 'react';
import {Box} from "@mui/material";

import Header from "../../components/Header";
import AuthForm from "../../components/authForm";
import {useAppSelector} from "../../hooks/redux";
import _ from "lodash";


const Auth = () => {
  const userName: string = useAppSelector(state => state.authReducer.username)
  const welcomeText = userName ? `Welcome ${_.capitalize(userName)}` : ''
  return (
    <Box m='20px'>
      <Box>
        <Header title='Authorization' subTitle={welcomeText}/>
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