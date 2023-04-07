import {ViewSimpleProduct} from "./types";
import {useForm} from "./SimpleProductSelected.hooks";
import {SimpleField} from "../../../../Form";
import {Box, Paper} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseButton from "../../../../Form/CloseButton";
import {GridActionsCellItem} from "@mui/x-data-grid";
import React from "react";

interface Product {
  viewSimpleProduct: ViewSimpleProduct
  resetFormData: () => void
}

const SimpleProductSelected = (props: Product) => {
  const {viewSimpleProduct, resetFormData} = props

  const [
    formData, useError, onQtyFieldChange, onPriceFieldChange, onConfirm
  ] = useForm(viewSimpleProduct, resetFormData)
  const qtyCell =
    <SimpleField
      type='number' name='qty' value={formData.qty.value} setValue={onQtyFieldChange} error={useError('qty')}
      fullWidth={false} variant={'standard'}/>
  const priceCell =
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
  const buttonsCell =
    <>
      <GridActionsCellItem icon={<CheckIcon/>} label={'Check'} onClick={onConfirm}/>
      <CloseButton onClick={resetFormData}/>
    </>

  return (
    <Paper className='product selected' onClick={() => undefined}>
      <Box sx={{width: '250px'}}>{viewSimpleProduct.name}</Box>
      <Box sx={{width: '80px'}}>{qtyCell}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{priceCell}</Box>
      <Box sx={{width: '150px'}} className='buttons'>{buttonsCell}</Box>

    </Paper>
  )
}

export default SimpleProductSelected