import React from 'react';
import {Box, Button} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {FormTextInput} from "../Form";
import {addNewSeller, NewSellerResponse} from "../../store/actions/sellers";
import {useAppDispatch, useAppSelector, useStoreId} from "../../hooks/redux";

const AddNewSellerForm = () => {
  const dispatch = useAppDispatch()
  const access_token = useAppSelector(state => state.authReducer.access_token)
  const storeId = useStoreId()

  interface initialValuesType {
    name: string
  }

  const initialValues: initialValuesType = {
    name: ''
  }
  const onSubmit = async (value: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    if (!storeId) return false
    const newSeller: NewSellerResponse = {name: value.name, active: true, store_id: storeId}
    await dispatch(addNewSeller(access_token, newSeller))
    actions.setSubmitting(false)
    actions.resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('required'),
      })}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting}) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',

          }}>
            <FormTextInput
              disabled={false}
              label='Name'
              name='name'
              textLabel=''
            />
            <Button
              type='submit'
              color='secondary'
              variant="contained"
              sx={{ml: 1, width: '200px', height: '43px'}}
              disabled={isSubmitting}
            >
              Add new seller
            </Button>
          </Box>
        </form>
      )}
    </Formik>

  );
};

export default AddNewSellerForm