import React from 'react';
import {Box} from "@mui/material";
import {SimpleField} from "../../../Form";
import SaveButton from "../../../Form/SaveButton";
import {useForm} from "./NameRowSelected.hooks";
import {ViewShoes} from "../../types";
import CloseButton from "../../../Form/CloseButton";

interface NameRowSelectedProps {
  viewShoes: ViewShoes
  onSelectedNameForm: (flag: boolean) => void
}

const NameRowSelected = (props: NameRowSelectedProps) => {
  const {viewShoes, onSelectedNameForm} = props
  const [
    formShoesData, useError, onNameFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm
  ] = useForm(viewShoes, onSelectedNameForm)
  const nameField =
    <SimpleField
      name='name' value={formShoesData.name.value} setValue={onNameFieldChange} error={useError('name')}
      fullWidth={false} variant={'standard'}/>
  const priceField =
    <SimpleField
      type='number' name='price' value={formShoesData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <SaveButton disabled={disabledButtonSave()} onConfirm={onConfirm}/>
      <CloseButton onClick={() => onSelectedNameForm(false)}/>
    </Box>

  return (
    <Box className='name-field selected' sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
      <Box sx={{width: '250px'}}>{nameField}</Box>
      <Box sx={{width: '100px'}} className='push'>{priceField}</Box>
      <Box sx={{width: '100px'}}>{buttonsCell}</Box>
    </Box>
  );
};

export default NameRowSelected;