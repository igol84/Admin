import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, TextField} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import {FormSelect, FormTextInput} from "../Form";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {addNewExpense} from "../../store/actions/expenses";
import {useDictionary, useFetchAccess} from "../../hooks/pages";
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import {formatISODate} from "../../hooks/form-data";

const AddNewExpenseForm = () => {
  const {places} = useAppSelector(state => state.expensesReducer)
  const d = useDictionary('expenses')
  const addExpenseAccess = useFetchAccess(addNewExpense)
  const storeId = useStoreId()

  interface initialValuesType {
    place_id: number,
    desc: string
    date_cost: string | Date
    cost: number
  }

  const initialValues: initialValuesType = {
    place_id: -1,
    desc: '',
    date_cost: formatISODate(new Date()),
    cost: 0
  }

  const onSubmit = async (value: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    if (!storeId) return false
    console.log(value)
    await addExpenseAccess(value)
    actions.setSubmitting(false)
    actions.resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object({
        place_id: yup.number().positive(),
        desc: yup.string(),
        cost: yup.number().required(),
      })}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, values, setFieldValue}) => (
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
              label={'desc'}
              name='desc'
              textLabel=''
              withOutBlur={true}
            />

            <FormControl sx={{minWidth: '180px'}}>
              <InputLabel color='secondary'></InputLabel>
              <TextField
                color='secondary'
                size='small'
                type='date'
                label="Date"
                value={values.date_cost}
                onChange={event => setFieldValue('date_cost', event.target.value)}
              />
            </FormControl>

            <FormTextInput
              label={'cost'}
              name='cost'
              textLabel=''
              withOutBlur
              focusText
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