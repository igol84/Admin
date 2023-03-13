import _ from "lodash";
import {Autocomplete, FormControl, InputLabel, Select, SelectChangeEvent, TextField} from "@mui/material";
import React from "react";
import {useField} from "formik";


interface TextInputProps {
  label: string
  name: string
  type?: string
  disabled?: boolean
  textLabel?: string
  withOutBlur?: boolean
  focusText?: boolean
}

export const FormTextInput = (props: TextInputProps) => {
  const {textLabel = '', withOutBlur = false, disabled = false, focusText = false} = props
  const [field, meta] = useField(props)
  const filteredProps = _.omit(props, ['textLabel', 'withOutBlur', 'focusText'])

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
      onFocus={focusText ? (event) => event.target.select() : () => null}
      disabled={disabled}
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

interface FieldType {
  type?: string
  name: string
  value: string
  setValue: (value: any) => void
  label?: string
  focusText?: boolean
  error?: string
  inputProps?: any
  disabled?: boolean
}

export const SimpleField = (props: FieldType) => {
  const {
    type = 'text',
    name,
    value,
    setValue,
    label = '',
    focusText = false,
    error = '',
    inputProps = {},
    disabled = false
  } = props
  return (
    <TextField
      type={type}
      name={name}
      label={label}
      onFocus={focusText ? (event) => event.target.select() : () => null}
      color="secondary"
      sx={{width: "100%"}}
      size="small"
      error={!!error}
      helperText={error}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      inputProps={inputProps}
      disabled={disabled}
    />
  );
};

interface FormSelectType {
  name: string
  value: any
  setValue: (value: any) => void
  label: string
  children: any[]
}

export const SimpleSelect = (props: FormSelectType) => {
  const {label, setValue} = props;
  const filteredProps = _.omit(props, ['setValue'])
  return (
    <FormControl fullWidth>
      <InputLabel color='secondary'>{label}</InputLabel>
      <Select
        color='secondary'
        size='small'
        sx={{width: "100%"}}
        onChange={(event: SelectChangeEvent) => {
          setValue(event.target.value);
        }}
        {...filteredProps}
      />
    </FormControl>
  )
}

interface AutocompleteType {
  name: string
  value: string
  setValue: (value: any) => void
  label?: string
  focusText?: boolean
  error?: string
  inputProps?: any
  items: string[]
  setItem: (value: any) => void
}

export const SimpleAutocomplete = (props: AutocompleteType) => {
  const {
    name,
    value,
    setValue,
    label = '',
    focusText = false,
    error = '',
    items = [],
    setItem
  } = props
  return (
    <Autocomplete
      value={value}
      freeSolo
      color="secondary"
      sx={{width: "100%"}}
      size="small"
      onChange={(event, value) => {
        setItem(value ? value : '')
        setValue(value ? value : '')
      }}

      options={items}
      renderInput={(params) => (
        <TextField
          name={name}
          label={label}
          value={value}
          onFocus={focusText ? (event) => event.target.select() : () => null}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (value !== event.target.value.trim()) {
              setValue(event.target.value.trim())
            }
            if (items.includes(event.target.value.trim())) {
              setItem(event.target.value.trim())
            } else
              setItem('')
          }}
          error={!!error}
          helperText={error}
          color="secondary"
          {...params}
        />
      )
      }
    />
  )
}

export const fieldRequired = (value: string) => {
  if (value === '') {
    return 'required'
  }
  return ''
}

export const fieldPositive = (value: number) => {
  if (value < 0) {
    return 'positive'
  }
  return ''
}

export const fieldPositiveNotNull = (value: number) => {
  if (value <= 0) {
    return 'positive, more than zero'
  }
  return ''
}