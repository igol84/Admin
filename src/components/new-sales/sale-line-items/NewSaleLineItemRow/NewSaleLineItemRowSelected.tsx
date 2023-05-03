import React from 'react';
import {Box, Paper} from "@mui/material";
import {ViewNewSaleLineItem} from "../types";
import {useForm} from "./NewSaleLineItemRowSelected.hooks";
import {SimpleField} from "../../../Form";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";

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
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Box>
        <GridActionsCellItem icon={<CheckIcon/>} label={'Check'} onClick={onConfirm}/>
        <GridActionsCellItem icon={<DeleteIcon/>} label={'Remove'} onClick={onRemove}/>
      </Box>
      <GridActionsCellItem icon={<CloseIcon/>} label={'Remove'} onClick={resetSelectedRow}/>
    </Box>
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