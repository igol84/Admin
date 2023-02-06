import {Box, Button, TextField} from "@mui/material";
import {Formik, useField} from "formik";
import * as Yup from "yup";
import React from "react";
import {initialValuesType, OnSubmitType} from "./index";

const MyTextInput = (props: { label: string, name: string, type?: string }) => {
  const {label, type = 'text'} = props;
  const [field, meta] = useField(props)
  return (
    <TextField
      color="secondary"
      type={type}
      sx={{width: "100%"}}
      error={meta.touched && !!meta.error}
      size="small"
      label={label}
      helperText={meta.touched && meta.error}
      {...field}
    />
  )
}

interface PropsTypes{
  onSubmit: OnSubmitType
}

export const FormAuth = (props: PropsTypes) => {


  const initialValues: initialValuesType = {
    login: '',
    password: ''
  }

  return (
    <Box sx={{
      p: 1,
      display: "flex",
      justifyContent: 'center',
    }}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          login: Yup.string()
            .required('Required'),
          password: Yup.string()
            .required('Required'),
        })}
        onSubmit={props.onSubmit}
      >
        {({values, handleSubmit, isSubmitting, submitCount}) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{
              width: '400px',
              p: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em 0.5em",
              flexWrap: "wrap"
            }}>

              <MyTextInput label="Login" name='login'/>
              <MyTextInput label="Password" name='password' type='password'/>
              <Button
                color='info'
                type="submit"
                variant={"contained"}
                disabled={isSubmitting}
              >
                Submit {submitCount}
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

