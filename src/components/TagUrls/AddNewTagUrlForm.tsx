import React from 'react';
import {Box, Button, MenuItem} from "@mui/material";
import {Formik, FormikHelpers} from "formik";
import {FormSelect, FormTextInput} from "../Form";
import {useDictionaryTranslate, useFetchAccess} from "../../hooks/pages";
import {addNewTagUrl} from "../../store/actions/tag_url";
import {tagUrlSchema} from "./schemas";
import {useAppSelector} from "../../hooks/redux";
import {CreateTagUrl, getParents} from "../../schemas/tagUrl";

const AddNewTagUrlForm = () => {
  const d = useDictionaryTranslate('tagUrl')
  const df = useDictionaryTranslate('form')
  const addExpenseAccess = useFetchAccess(addNewTagUrl)
  const {tagUrls} = useAppSelector(state => state.tagUrlsReducer)
  const parents = getParents(tagUrls)

  interface initialValuesType {
    url: string
    parent: string
    order_number: number
    search: string
    search_ua: string
    desc: string
    desc_ua: string
    text: string
    text_ua: string
  }

  const initialValues: initialValuesType = {
    url: '',
    parent: '-1',
    order_number: 0,
    search: '',
    search_ua: '',
    desc: '',
    desc_ua: '',
    text: '',
    text_ua: '',
  }

  const onSubmit = async (data: initialValuesType, actions: FormikHelpers<initialValuesType>) => {
    const fixedData: CreateTagUrl = {...data, parent: data.parent === '-1' ? '' : data.parent}
    await addExpenseAccess(fixedData)
    actions.setSubmitting(false)
    actions.resetForm()
  }
  return (
    <Box sx={{my: 1}}>
      <Formik
        initialValues={initialValues}
        validationSchema={tagUrlSchema}
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
              <FormSelect
                name='parent'
                label={d('parent')}
              >
                <MenuItem value='-1'>&nbsp;</MenuItem>
                {parents.map(parent => (
                  <MenuItem key={parent} value={parent}>{parent}</MenuItem>
                ))}
              </FormSelect>

              <FormTextInput
                type='number'
                name='order_number'
                label={d('order_number')}
                textLabel=''
                withOutBlur
                focusText
              />
              <FormTextInput
                name='search'
                label={d('search')}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='search_ua'
                label={d('searchUa')}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='desc'
                label={d('desc')}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='desc_ua'
                label={d('descUa')}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='text'
                label={d('text')}
                textLabel=''
                withOutBlur
              />
              <FormTextInput
                name='text_ua'
                label={d('textUa')}
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
                {df('add_button')}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddNewTagUrlForm