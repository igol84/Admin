import {ViewSimpleProduct} from "./types";
import {useForm} from "./SimpleProductSelected.hooks";
import {SimpleField} from "../../../../Form";
import {Box, IconButton} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseButton from "../../../../Form/CloseButton";
import React from "react";
import {useDictionaryTranslate} from "../../../../../hooks/pages";

interface Product {
  viewSimpleProduct: ViewSimpleProduct
  resetSelectedRow: () => void
}

const SimpleProductSelected = (props: Product) => {
  const {viewSimpleProduct, resetSelectedRow} = props

  const [
    formData, useError, onQtyFieldChange, onPriceFieldChange, onKeyDown, onConfirm
  ] = useForm(viewSimpleProduct, resetSelectedRow)
  const d = useDictionaryTranslate('NewSales')

  const qtyCell =
    <SimpleField
      type='number' name='qty' value={formData.qty.value} setValue={onQtyFieldChange} error={useError('qty')}
      fullWidth={false} variant={'standard'}/>
  const priceCell =
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'} autoFocus focusText onKeyDown={onKeyDown}/>
  const buttonsCell =
    <>
      <IconButton aria-label='Check' onClick={onConfirm}>
        <CheckIcon/>
      </IconButton>
      <CloseButton onClick={resetSelectedRow}/>
    </>

  return (
    <>
      <Box sx={{width: '250px'}}>{viewSimpleProduct.name}</Box>
      <Box sx={{width: '80px', whiteSpace: 'nowrap'}}>{qtyCell} {d('of')} {viewSimpleProduct.qty}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{priceCell}</Box>
      <Box sx={{width: '150px'}} className='buttons'>{buttonsCell}</Box>
    </>
  )
}

export default SimpleProductSelected