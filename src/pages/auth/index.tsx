import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {FormikHelpers} from "formik";
import {FormAuth} from "./Form";



export interface initialValuesType{
  login: string
  password: string
}


const onSubmit=(values: initialValuesType, actions:  FormikHelpers<initialValuesType>) => {
  setTimeout(() => {
    console.log(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
  }, 400)
}
export type OnSubmitType = typeof onSubmit

const Auth = () => {

  return (
    <Box m='20px'>
      <Box>
        <Header title='Auth' subTitle='Auth'/>
        <FormAuth onSubmit={onSubmit}/>
      </Box>
    </Box>
  );
};

export default Auth;