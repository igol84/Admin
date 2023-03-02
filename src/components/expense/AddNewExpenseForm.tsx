import React from 'react';
import {Box, Button, MenuItem} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import {FormSelect, FormTextInput} from "../Form";
import {useAppSelector} from "../../hooks/redux";
import {addNewExpense} from "../../store/actions/expenses";
import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {formatISODate} from "../../hooks/form-data";

const AddNewExpenseForm = () => {
  const {places} = useAppSelector(state => state.expensesReducer)
  const d = useDictionary('expense')
  const df = useDictionary('form')
  const addExpenseAccess = useFetchAccess(addNewExpense)

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
      {({handleSubmit, isSubmitting}) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',
            gap: 1
          }}>
            <FormTextInput
              type='date'
              label={d['date_cost']}
              name='date_cost'
              textLabel=''
              withOutBlur
              focusText
            />

            <FormSelect
              name='place_id'
              label={d['place_id']}
            >
              <MenuItem value={-1}></MenuItem>
              {places.map(place => (
                <MenuItem key={place.id} value={place.id}>{place.name}</MenuItem>
              ))}
            </FormSelect>

            <FormTextInput
              name={'desc'}
              label={d['desc']}
              textLabel=''
              withOutBlur={true}
            />

            <FormTextInput
              type='number'
              label={d['cost']}
              name='cost'
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
              {df['add_button']}
            </Button>
          </Box>
        </form>
      )}
    </Formik>

  );
};

export default AddNewExpenseForm