import React from 'react';
import {Box, Button} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import {FormTextInput} from "../Form";
import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {addNewTagUrl} from "../../store/actions/tag_url";

const AddNewTagUrlForm = () => {
  const d = useDictionary('tagUrl')
  const df = useDictionary('form')
  const addExpenseAccess = useFetchAccess(addNewTagUrl)

  interface initialValuesType {
    url: string
    search: string
    search_ua: string
    desc: string
    desc_ua: string
    text: string
    text_ua: string
  }

  const initialValues: initialValuesType = {
    url: '',
    search: '',
    search_ua: '',
    desc: '',
    desc_ua: '',
    text: '',
    text_ua: '',
  }

  const onSubmit = async (data: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    await addExpenseAccess(data)
    actions.setSubmitting(false)
    actions.resetForm()
  }
  return (
    <Box sx={{my: 1}}>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          url: yup.string().required(),
          search: yup.string(),
          search_ua: yup.string(),
          desc: yup.string(),
          desc_ua: yup.string(),
          text: yup.string(),
          text_ua: yup.string(),
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
                name='url'
                label='url'
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='search'
                label={d['search']}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='search_ua'
                label={d['searchUa']}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='desc'
                label={d['desc']}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='desc_ua'
                label={d['descUa']}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='text'
                label={d['text']}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='text_ua'
                label={d['textUa']}
                textLabel=''
                withOutBlur
              />

              <Button
                type='submit'
                color='secondary'
                variant="contained"
                sx={{ml: 1, px: 5, height: '43px'}}
                disabled={isSubmitting}
              >
                {df['add_button']}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddNewTagUrlForm