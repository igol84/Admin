import React from 'react';
import {Box, Button} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";

import Header from "../../components/Header";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {login} from "../../store/actions/auth";
import {authSlice} from "../../store/slices/authSlice";
import {FormTextInput} from "../../components/Form";


const Auth = () => {
  const dispatch = useAppDispatch()
  let errorTextUserName = ''
  let errorTextPassword = ''
  const errorText = useAppSelector(state => state.authReducer.errorText)
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  if (errorText.startsWith('User with the email')) {
    errorTextUserName = errorText
  } else if (errorText == 'Incorrect password') {
    errorTextPassword = errorText
  }

  interface initialValuesType {
    username: string
    password: string
  }

  const initialValues: initialValuesType = {
    username: '',
    password: ''
  }
  const onSubmit = async (values: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    await dispatch(login(values))
    actions.setSubmitting(false)
  }
  const onLogout = () => {

    dispatch(authSlice.actions.logout())
  }

  return (
    <Box m='20px'>
      <Box>
        <Header title='Auth' subTitle='Auth'/>
        <Box sx={{
          p: 1,
          display: "flex",
          justifyContent: 'center',
        }}>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              username: Yup.string()
                .required('Required'),
              password: Yup.string()
                .required('Required'),
            })}
            onSubmit={onSubmit}
          >
            {({handleSubmit, isSubmitting}) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{
                  width: "400px",
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1em 0.5em",
                  flexWrap: "wrap"
                }}>

                  <FormTextInput
                    label="Login"
                    disabled={isAuthenticated}
                    name='username'
                    textLabel={errorTextUserName}
                  />
                  <FormTextInput
                    label="Password"
                    disabled={isAuthenticated}
                    name='password'
                    type='password'
                    textLabel={errorTextPassword}
                  />
                  <Box
                    display='flex'
                    justifyContent='center'
                    gap='5px'
                  >
                    <Button
                      color='info'
                      type='submit'
                      variant={'contained'}
                      disabled={
                        isSubmitting || isAuthenticated
                      }
                    >
                      Submit
                    </Button>

                    <Button
                      type='button'
                      color='info'
                      variant={'contained'}
                      onClick={onLogout}
                      disabled={
                        isSubmitting || !isAuthenticated
                      }
                    >
                      Logout
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;