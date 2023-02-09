import {useField} from "formik";
import _ from "lodash";
import {TextField} from "@mui/material";
import React from "react";

interface MyTextInputProps {
  label: string
  name: string
  type?: string
  disabled: boolean
  textLabel?: string
}

export const FormTextInput = (props: MyTextInputProps) => {
  const [field, meta] = useField(props)
  const {textLabel = ''} = props
  const filteredProps = _.omit(props, ['textLabel'])
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
      {...field}
      {...filteredProps}
    />
  )
}

