import React from 'react';
import {Box} from "@mui/material";
import {useForm} from "./SaleLineItemRowSelected.hooks";
import {SimpleField} from "../../../Form";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseButton from "../../../Form/CloseButton";
import {viewSaleLineItem} from "../types";


interface SaleLineItemRowSelectedProps {
  viewSaleLineItem: viewSaleLineItem
  omSelectedRow: () => void
  resetSelectedRow: () => void
}

const SaleLineItemRowSelected = (props: SaleLineItemRowSelectedProps) => {
  const {viewSaleLineItem, omSelectedRow, resetSelectedRow} = props
  const [formData, useError, onPriceFieldChange, onConfirm, onRemove] = useForm(viewSaleLineItem, resetSelectedRow)
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
      <CloseButton onClick={resetSelectedRow}/>
    </Box>
  return (
    <Box className='item selected'>
      <Box width='300px'>{viewSaleLineItem.name}</Box>
      <Box width='100px'>{priceCell}</Box>
      <Box width='50px'>{viewSaleLineItem.qty}</Box>
      <Box flex={1}></Box>
      <Box width='150px'>{buttonsCell}</Box>
    </Box>
  );
};

export default SaleLineItemRowSelected;