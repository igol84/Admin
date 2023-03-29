import {ViewSimpleProduct} from "../../types"
import {Box, Paper} from "@mui/material"
import {formatter, SimpleField} from "../../../Form"
import React, {useState} from "react"
import {FieldNames, FormFields} from "./types";
import produce from "immer";
import SaveButton from "./SaveButton";
import CloseIcon from "@mui/icons-material/Close";
import {GridActionsCellItem} from "@mui/x-data-grid";


interface Product {
  data: ViewSimpleProduct
  selected: boolean
  onSelected: () => void
  resetFormData: () => void
}

const formatQty = (qty: number) => `${qty} шт.`

const Index = (props: Product) => {
  const {data, selected, onSelected, resetFormData} = props
  let className = ''
  let onSelect = () => {
    onSelected()
  }
  let nameCell: string | JSX.Element = data.name
  let priceCell: string | JSX.Element = formatter.format(data.price)
  let buttonsCell: string | JSX.Element = ''


  if (selected) {
    className = 'selected'
    onSelect = () => undefined

    const useError = (fieldName: FieldNames) => formData[fieldName].error
    const initialFormFields: FormFields = {
      id: null,
      name: {value: data.name, error: ''},
      price: {value: data.price.toString(), error: ''},
    }
    const [formData, setFormData] = useState<FormFields>(initialFormFields)
    const onNameFieldChange = (name: string) => {
      setFormData(produce(prevFormData => {
        prevFormData.name.value = name
        prevFormData.name.error = ''
      }))
      if (name === '')
        setFormData(produce(prevFormData => {
          prevFormData.name.error = 'required'
        }))
    }
    const onPriceFieldChange = (price: string) => {
      if (Number(price) >= 0)
        setFormData(produce(prevFormData => {
          prevFormData.price.value = price
        }))
    }
    const formWasEdited = () => {
      return data.name !== formData.name.value || data.price !== Number(formData.price.value)
    }
    const formHasNotErrors = () => {
      return !formData.price.error && !formData.name.error
    }

    const disabledButtonSave = () => !(formWasEdited() && formHasNotErrors())

    nameCell = <SimpleField
      name='name'
      value={formData.name.value}
      setValue={onNameFieldChange}
      error={useError('name')}
      focusText
      fullWidth={false}
      variant={'standard'}
    />
    priceCell = <SimpleField
      type='number'
      name='price'
      value={formData.price.value.toString()}
      setValue={onPriceFieldChange}
      error={useError('price')}
      focusText
      fullWidth={false}
      variant={'standard'}
    />
    buttonsCell =
      <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
        <SaveButton
          disabled={disabledButtonSave()}
          id={data.id}
          name={formData.name.value}
          price={Number(formData.price.value)}
          resetFormData={resetFormData}
        />
        <GridActionsCellItem
          icon={<CloseIcon/>}
          label={'close'}
          onClick={resetFormData}
          color="inherit"
        />
      </Box>
  }
  return (
    <Paper className={className} sx={{p: 1}} onClick={onSelect}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: '250px'}}>{nameCell}</Box>
        <Box sx={{width: '80px'}}>{formatQty(data.qty)}</Box>
        <Box sx={{flex: '1'}}></Box>
        <Box sx={{width: '100px'}}>{priceCell}</Box>
        <Box sx={{width: '150px'}}>
          {buttonsCell}
        </Box>
      </Box>
    </Paper>
  )
}

export default Index