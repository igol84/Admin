import React from 'react';
import {Box} from "@mui/material";
import {useForm} from "./SaleLineItemRowSelected.hooks";
import {SimpleField} from "../../../Form";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseButton from "../../../Form/CloseButton";
import {ViewSaleLineItem} from "../types";
import DeleteButton from "../../../Form/DeleteButton";
import {useDictionaryTranslate} from "../../../../hooks/pages";


interface SaleLineItemRowSelectedProps {
  viewSaleLineItem: ViewSaleLineItem
  resetSelectedRow: () => void
}

const SaleLineItemRowSelected = (props: SaleLineItemRowSelectedProps) => {
  const {viewSaleLineItem, resetSelectedRow} = props
  const [formData, useError, onPriceFieldChange, onConfirm, onRemove] = useForm(viewSaleLineItem, resetSelectedRow)
  const d = useDictionaryTranslate('NewSales')
  const priceCell =
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Box>
        <GridActionsCellItem icon={<CheckIcon/>} label={'Check'} onClick={onConfirm}/>
        <DeleteButton deletable={true} onRemove={onRemove}/>
      </Box>
      <CloseButton onClick={resetSelectedRow}/>
    </Box>
  return (
    <Box className='item selected'>
      <Box width='300px'>{viewSaleLineItem.name}</Box>
      <Box width='100px'>{priceCell}</Box>
      <Box width='50px'>{viewSaleLineItem.qty} {d('pc')}</Box>
      <Box flex={1}></Box>
      <Box width='150px'>{buttonsCell}</Box>
    </Box>
  );
};

export default SaleLineItemRowSelected;