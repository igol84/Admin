import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Formik, FormikHelpers} from "formik";
import {login} from "../store/actions/auth";
import {authSlice} from "../store/slices/authSlice";
import {Alert, Box, Button, colors, Snackbar} from "@mui/material";
import * as Yup from "yup";
import {FormTextInput} from "./Form";


const AuthForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const errorText = useAppSelector(state => state.authReducer.errorText)
  const errorDate = useAppSelector(state => state.authReducer.errorDate)
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)

  const [errorTextNetwork, setErrorTextNetwork] = useState('')
  const [errorTextUserName, setErrorTextUserName] = useState('')
  const [errorTextPassword, setErrorTextPassword] = useState('')

  useEffect(() => {
    setErrorTextUserName('')
    setErrorTextPassword('')
    if (errorText.startsWith('User with the email')) {
      setErrorTextUserName(errorText)
    } else if (errorText === 'Incorrect password') {
      setErrorTextPassword(errorText)
    } else if (errorText === 'Network Error') {
      setErrorTextNetwork(errorText)
      setOpenAlertSnackbar(true)
    }
  }, [errorText, errorDate])

  useEffect(() => {
    if (isAuthenticated) {
      setOpenSuccessSnackbar(true)
    }
  }, [isAuthenticated])

  // Snackbars
  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const handleCloseAlertSnackbarCreator = (setOpenState: (value: boolean) => void) =>
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenState(false)
    }
  const handleCloseAlertSnackbar = handleCloseAlertSnackbarCreator(setOpenAlertSnackbar)
  const handleSuccessSnackbar = handleCloseAlertSnackbarCreator(setOpenSuccessSnackbar)

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
    navigate('/')
  }
  const onLogout = () => {
    dispatch(authSlice.actions.logout())
  }

  return (
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
            <Snackbar open={openAlertSnackbar} autoHideDuration={6000} onClose={handleCloseAlertSnackbar}>
              <Alert variant="filled" onClose={handleCloseAlertSnackbar} severity="error">
                {errorTextNetwork}
              </Alert>
            </Snackbar>
            <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleSuccessSnackbar}>
              <Alert variant="filled" onClose={handleSuccessSnackbar} severity="success" sx={{color: colors.grey[100]}}>
                Successful login
              </Alert>
            </Snackbar>
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

  );
};

export default AuthForm;