import {ViewSize} from "../../types"
import {Box, Paper} from "@mui/material"
import React, {useState} from "react"
import {GridActionsCellItem} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";

import {SizeFieldNames, SizeFormFields} from "./SizeRowSelected.types";
import produce from "immer";
import {SimpleField} from "../../../Form";
import SaveButton from "../../../Form/SaveButton";
import {EditSize} from "../../../../schemas/products-editor";
import {updateSize} from "../../../../store/actions/products-editor";
import {useFetchAccess} from "../../../../hooks/pages";

interface SizeRowSelectedProps {
  sizeData: ViewSize
  onSelectedSize: (idSize: number | null) => void
}

const SizeRowSelected = (props: SizeRowSelectedProps) => {
  const {sizeData, onSelectedSize} = props

  const initialFormFields: SizeFormFields = {
    size: {value: sizeData.size.toString(), error: ''},
    length: {value: sizeData.length.toString(), error: ''},
    price: {value: sizeData.price.toString(), error: ''},
  }
  const [formSizeData, setFormSizeData] = useState<SizeFormFields>(initialFormFields)
  const onSizeFieldChange = (size: string) => {
    if (Number(size) >= 0)
      setFormSizeData(produce(prevFormData => {
        prevFormData.size.value = size
      }))
  }
  const onLengthFieldChange = (length: string) => {
    if (Number(length) >= 0)
      setFormSizeData(produce(prevFormData => {
        prevFormData.length.value = length
      }))
  }
  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormSizeData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const formWasEdited = () => {
    return formSizeData.size.value !== sizeData.size.toString()
      || formSizeData.length.value !== sizeData.length.toString()
      || formSizeData.price.value !== sizeData.price.toString()
  }
  const formHasNotErrors = () => {
    return !formSizeData.price.error && !formSizeData.length.error && !formSizeData.price.error
  }

  const disabledButtonSave = () => !(formWasEdited() && formHasNotErrors())
  const useError = (fieldName: SizeFieldNames) => formSizeData[fieldName].error

  const editSize = useFetchAccess(updateSize)
  const onConfirm = async () => {
    if (formWasEdited() && formHasNotErrors()) {
      const updateData: EditSize = {
        id: sizeData.prod_id,
        size: Number(formSizeData.size.value),
        length: Number(formSizeData.length.value),
        price_for_sale: Number(formSizeData.price.value)
      }
      await editSize(updateData)
      onSelectedSize(null)
    } else {
      onSelectedSize(null)
    }
  }

  const onClickClose = () => {
    onSelectedSize(null)
  }

  const sizeField =
    <SimpleField
      type='number' name='size' value={formSizeData.size.value.toString()} setValue={onSizeFieldChange}
      error={useError('size')} fullWidth={false} variant={'standard'}/>

  const lengthField =
    <SimpleField
      type='number' name='length' value={formSizeData.length.value.toString()} setValue={onLengthFieldChange}
      error={useError('length')} fullWidth={false} variant={'standard'} inputProps={{step: 0.5}}/>

  const priceField =
    <SimpleField
      type='number' name='price' value={formSizeData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>

  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <SaveButton disabled={disabledButtonSave()} onConfirm={onConfirm}/>
      <GridActionsCellItem icon={<CloseIcon/>} label={'close'} onClick={onClickClose} color="inherit"/>
    </Box>
  return (
    <Paper className='size selected'>
      <Box sx={{width: "250px"}}>{sizeField}</Box>
      <Box sx={{width: "250px"}}>{lengthField}</Box>
      <Box sx={{width: "250px"}}>{sizeData.qty}</Box>
      <Box sx={{width: "250px"}}>{priceField}</Box>
      <Box sx={{width: "250px"}}>{buttonsCell}</Box>
    </Paper>
  )
}

export default SizeRowSelected