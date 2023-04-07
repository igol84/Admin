import React from 'react';
import {Box} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {useForm} from "./HeaderSelected.hooks";
import {SimpleField} from "../../../../../Form";
import CloseButton from "../../../../../Form/CloseButton";
import {SelectedSize} from "./index";


interface NameRowSelectedProps {
  name: string
  selectedSize: SelectedSize
  onClose: () => void
}

const HeaderSelected = (props: NameRowSelectedProps) => {
  const {name, selectedSize, onClose} = props
  const [
    formShoesData, useError, onPriceFieldChange, onConfirm
  ] = useForm(selectedSize, onClose)

  const priceField =
    <SimpleField
      type='number' name='price' value={formShoesData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <GridActionsCellItem icon={<CheckIcon/>} label={'Check'} onClick={onConfirm}/>
      <CloseButton onClick={onClose}/>
    </Box>

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
      <Box sx={{width: '250px'}}>{name}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{priceField}</Box>
      <Box sx={{width: '100px'}}>{buttonsCell}</Box>
    </Box>
  );
};

export default HeaderSelected