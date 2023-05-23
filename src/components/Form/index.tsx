import _ from "lodash";
import {
  Alert,
  Autocomplete,
  colors,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField
} from "@mui/material";
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
  onKeyDown?: (value: any, event: React.KeyboardEvent<HTMLDivElement>) => void
  autoFocus?: boolean
  multiline?: boolean
  maxRows?: number
  tabIndex?: number
  fullWidth?: boolean
  variant?: "outlined" | "standard" | "filled" | undefined,
  onClick?: () => void
  onBlur?: () => void
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
    disabled = false,
    onKeyDown = (name, event) => [name, event],
    autoFocus = false,
    tabIndex = undefined,
    fullWidth = true,
    multiline = false,
    maxRows = 1,
    variant = 'outlined',
    onClick = () => undefined,
    onBlur = () => undefined
  } = props
  return (
    <TextField
      type={type}
      name={name}
      label={label}
      multiline={multiline}
      maxRows={maxRows}
      onFocus={focusText ? (event) => event.target.select() : () => null}
      color="secondary"
      sx={fullWidth ? {width: "100%"} : null}
      size="small"
      error={!!error}
      helperText={error}
      value={value}
      variant={variant}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      inputProps={inputProps}
      disabled={disabled}
      onKeyDown={(event) => {
        onKeyDown(name, event)
      }}
      autoFocus={autoFocus}
      tabIndex={tabIndex}
      onClick={onClick}
      onBlur={onBlur}
    />
  );
};

interface FormSelectType {
  name: string
  value: any
  setValue: (value: any) => void
  label: string
  children: any[]
  onOpen?: () => void
  error?: string
  defaultValue?: string
  disabled?: boolean
}

export const SimpleSelect = (props: FormSelectType) => {
  const {label, setValue, onOpen = () => undefined, error = '', defaultValue = '-1', disabled = false} = props;
  const filteredProps = _.omit(props, ['setValue', 'onOpen', 'error', 'defaultValue', 'disabled'])
  return (
    <FormControl fullWidth sx={{'.input-label[data-shrink="false"]': {top: '-8px'}}} error={!!error}>
      <InputLabel className='input-label' color='secondary'>{label}</InputLabel>
      <Select
        disabled={disabled}
        defaultValue={defaultValue}
        color='secondary'
        size='small'
        sx={{width: "100%"}}
        onChange={(event: SelectChangeEvent) => {
          setValue(event.target.value);
        }}
        onOpen={onOpen}
        {...filteredProps}
      />
      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

interface AutocompleteType {
  freeSolo?: boolean
  name: string
  value: string
  setValue: (value: any) => void
  label?: string
  focusText?: boolean
  error?: string
  inputProps?: any
  items: string[]
  setItem: (value: any) => void
  blurOnSelect?: boolean
  autoFocus?: boolean
  disabled?: boolean
}

export const SimpleAutocomplete = (props: AutocompleteType) => {
  const {
    freeSolo = true,
    name,
    value,
    setValue,
    label = '',
    focusText = false,
    error = '',
    items = [],
    setItem,
    blurOnSelect = false,
    autoFocus = false,
    disabled = false
  } = props
  return (
    <Autocomplete
      disabled={disabled}
      value={value}
      freeSolo={freeSolo}
      color="secondary"
      sx={{width: "100%"}}
      size="small"
      onChange={(event, value) => {
        setItem(value ? value : '')
        setValue(value ? value : '')
      }}
      blurOnSelect={blurOnSelect}
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
          autoFocus={autoFocus}
          {...params}
        />
      )
      }
    />
  )
}

export const fieldRequired = (value: string) => {
  if (value.trim() === '') {
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

interface SnackBarSuccessProps {
  label: string
  openSuccessSnackbar: boolean
  handleSuccessSnackbar: (event?: (React.SyntheticEvent | Event), reason?: string) => void
}

export const SnackBarSuccess = (props: SnackBarSuccessProps) => {
  const {label, openSuccessSnackbar, handleSuccessSnackbar} = props
  return (
    <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleSuccessSnackbar}>
      <Alert variant="filled" onClose={handleSuccessSnackbar} severity="success" sx={{color: colors.grey[100]}}>
        {label}
      </Alert>
    </Snackbar>
  )
}
export const formatter = (language: string) => new Intl.NumberFormat(language == 'en' ? 'es' : 'us', { //
  style: 'currency',
  currency: 'UAH',
  minimumFractionDigits: 0
});