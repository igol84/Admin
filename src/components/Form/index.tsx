import {FieldInputProps, useField} from "formik";
import _ from "lodash";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import React from "react";

interface TextInputProps {
  label: string
  name: string
  type?: string
  disabled: boolean
  textLabel?: string
  withOutBlur?: boolean
}

export const FormTextInput = (props: TextInputProps) => {
  const {textLabel = '', withOutBlur=false} = props
  const [field, meta] = useField(props)
  const filteredProps = _.omit(props, ['textLabel', 'withOutBlur'])

  const filteredField = withOutBlur ? _.omit(field, ['onBlur']) : field
  const isError =
    (meta.touched && !!meta.error)
    ||
    (meta.touched && !!textLabel)
  const helperText =
    (meta.touched && meta.error)
    ||
    (meta.touched && textLabel)

  return (
    <TextField
      color="secondary"
      sx={{width: "100%"}}
      error={isError}
      size="small"
      helperText={helperText}
      {...filteredField}
      {...filteredProps}
    />
  )
}

interface FormSelectProps {
  label: string
  name: string
  disabled?: boolean
  textLabel?: string
  withOutBlur?: boolean
  children: any[]

}

export const FormSelect = (props: FormSelectProps) => {
  const {label} = props;
  const [field, meta] = useField(props);
  return (
    <FormControl fullWidth>
      <InputLabel color='secondary'>{label}</InputLabel>
      <Select
        color='secondary'
        size='small'
        error={meta.touched && !!meta.error}
        sx={{width: "100%"}}
        {...field} {...props}
      />
    </FormControl>
  )
}
