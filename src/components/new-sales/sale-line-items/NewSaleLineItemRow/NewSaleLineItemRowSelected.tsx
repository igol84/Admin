import React from 'react';
import {Box, Paper} from "@mui/material";
import {ViewNewSaleLineItem} from "../types";
import {useForm} from "./NewSaleLineItemRowSelected.hooks";
import {SimpleField} from "../../../Form";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseButton from "../../../Form/CloseButton";

interface NewSaleLineItemRowSelected {
  viewNewSaleLineItem: ViewNewSaleLineItem
  resetSelectedRow: () => void
}

const NewSaleLineItemRowSelected = (props: NewSaleLineItemRowSelected) => {
  const {viewNewSaleLineItem, resetSelectedRow} = props
  const [formData, useError, onPriceFieldChange, onConfirm, onRemove] = useForm(viewNewSaleLineItem, resetSelectedRow)
  const priceCell =
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
  const buttonsCell =
    <>
      <GridActionsCellItem icon={<CheckIcon/>} label={'Check'} onClick={onConfirm}/>
      <GridActionsCellItem icon={<RemoveIcon/>} label={'Remove'} onClick={onRemove}/>
      <CloseButton onClick={resetSelectedRow}/>
    </>
  return (
    <Paper className='product selected'>
      <Box sx={{width: '250px'}}>{viewNewSaleLineItem.name}</Box>
      <Box sx={{width: '80px'}}>{viewNewSaleLineItem.qty}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{priceCell}</Box>
      <Box sx={{width: '150px'}}>{buttonsCell}</Box>
    </Paper>
  );
};

export default NewSaleLineItemRowSelected;