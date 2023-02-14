import React from 'react';
import _ from "lodash";
import {Box} from "@mui/material";

import Header from "../../components/Header";
import AuthForm from "../../components/authForm";
import {useAppSelector} from "../../hooks/redux";
import {useDictionary} from "../../hooks/pages";

const Auth = () => {
  const d = useDictionary('auth')
  const userName: string = useAppSelector(state => state.authReducer.username)
  const welcomeText = userName ? `${d['subTitle']} ${_.capitalize(userName)}` : ''
  return (
    <Box m='20px'>
      <Box>
        <Header title={d['title']} subTitle={welcomeText}/>
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