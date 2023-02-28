import React from 'react';
import {Box, Button, Select, MenuItem} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {FormSelect, FormTextInput} from "../Form";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {addNewExpense} from "../../store/actions/expenses";
import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {CreateExpense} from "../../schemas/expense";
import * as yup from "yup";

const AddNewExpenseForm = () => {
  const {places} = useAppSelector(state => state.expensesReducer)
  const d = useDictionary('expenses')
  const addExpenseAccess = useFetchAccess(addNewExpense)
  const storeId = useStoreId()

  interface initialValuesType {
    place_id: number,
    desc: string
    date_cost: Date
    cost: number
  }

  const initialValues: initialValuesType = {
    place_id:-1,
    desc: '',
    date_cost: new Date,
    cost: 0
  }

  const onSubmit = async (value: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    if (!storeId) return false
    const newExpense: CreateExpense = {place_id: '0', desc: '', date_cost: new Date(), cost: 0}
    console.log(newExpense)
    // await addExpenseAccess(newExpense)
    actions.setSubmitting(false)
    actions.resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        place_id: yup.number().positive(),
        desc: yup.string(),
        cost: yup.number().required(),
      })}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting}) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',

          }}>
            <FormSelect
              name='place_id'
              label='place_id'
            >
              <MenuItem value={-1}></MenuItem>
              {places.map(place => (
                <MenuItem key={place.id} value={place.id}>{place.name}</MenuItem>
              ))}
            </FormSelect>
            <FormTextInput
              disabled={false}
              label={'desc'}
              name='desc'
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
              {'add_button'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>

  );
};

export default AddNewExpenseForm