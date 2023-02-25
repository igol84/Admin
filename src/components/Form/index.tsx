import {FieldInputProps, useField} from "formik";
import _ from "lodash";
import {TextField} from "@mui/material";
import React from "react";

interface MyTextInputProps {
  label: string
  name: string
  type?: string
  disabled: boolean
  textLabel?: string
  withOutBlur?: boolean
}

export const FormTextInput = (props: MyTextInputProps) => {
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

