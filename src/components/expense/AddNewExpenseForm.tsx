import React from 'react';
import {Box, Button} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {FormTextInput} from "../Form";
import {useStoreId} from "../../hooks/redux";
import {addNewExpense} from "../../store/actions/expenses";
import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {CreateExpense} from "../../achemas/expense";

const AddNewExpenseForm = () => {
  const d = useDictionary('expenses')
  const addExpenseAccess = useFetchAccess(addNewExpense)
  const storeId = useStoreId()

  interface initialValuesType {
    name: string
  }

  const initialValues: initialValuesType = {
    name: ''
  }
  const onSubmit = async (value: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    if (!storeId) return false
    const newExpense: CreateExpense = {place_id: '0', desc: '', date_cost: new Date(), cost: 0}
    await addExpenseAccess(newExpense)
    actions.setSubmitting(false)
    actions.resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required(d['required']),
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
              label={d['name']}
              name='name'
              textLabel=''
              withOutBlur={true}
            />
            <Button
              type='submit'
              color='secondary'
              variant="contained"
              sx={{ml: 1, width: '230px', height: '43px'}}
              disabled={isSubmitting}
            >
              {d['add_button']}
            </Button>
          </Box>
        </form>
      )}
    </Formik>

  );
};

export default AddNewExpenseForm