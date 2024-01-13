import React from 'react';
import {Box, Button} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {FormTextInput} from "../Form";
import {useAppDispatch, useStoreId} from "../../hooks/redux";
import {useDictionary} from "../../hooks/pages";
import {CreatePlace} from "../../schemas/place";
import {createApi} from "../../ky";
import {addNewPlace} from "../../store/slices/placesSlice";

const AddNewPlaceForm = () => {
  const d = useDictionary('places')
  const dispatch = useAppDispatch()
  const api = createApi()
  const addPlaceAccess = (place: CreatePlace) => dispatch(addNewPlace({place, api}))
  const storeId = useStoreId()

  interface initialValuesType {
    name: string
  }

  const initialValues: initialValuesType = {
    name: ''
  }
  const onSubmit = async (value: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    if (!storeId) return false
    const newPlace: CreatePlace = {name: value.name, active: true, store_id: storeId}
    await addPlaceAccess(newPlace)
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
              label={d['name']}
              name='name'
              withOutBlur={true}
            />
            <Button
              type='submit'
              color='secondary'
              variant="contained"
              sx={{ml: 1, width: '230px', height: '43px', whiteSpace: 'nowrap'}}
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

export default AddNewPlaceForm