import React from 'react';
import {Box, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import {SimpleField} from "../../../../../Form";
import CloseButton from "../../../../../Form/CloseButton";
import {SelectedSize} from "./index";
import {useForm} from "./HeaderColorSelected.hooks";


interface ColorRowSelectedProps {
  color: string
  width: string
  selectedSize: SelectedSize
  onClose: () => void
}

const HeaderColorSelected = (props: ColorRowSelectedProps) => {
  const {color, width, selectedSize, onClose} = props
  const [formShoesData, useError, onPriceFieldChange, onKeyDown, onConfirm] = useForm(selectedSize, onClose)

  const priceField =
    <SimpleField
      type='number' name='price' value={formShoesData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'} autoFocus focusText onKeyDown={onKeyDown}/>
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <IconButton aria-label='Check' onClick={onConfirm} size={'small'}>
        <CheckIcon/>
      </IconButton>
      <CloseButton onClick={onClose}/>
    </Box>

  return (
    <Box className='color-row selected'>
      <Box>{color}</Box>
      <Box>{width}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{priceField}</Box>
      <Box sx={{width: '100px'}}>{buttonsCell}</Box>
    </Box>
  );
};

export default HeaderColorSelected