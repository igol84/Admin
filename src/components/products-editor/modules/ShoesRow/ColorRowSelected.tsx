import React from 'react';
import {Box} from "@mui/material";
import {SimpleField} from "../../../Form";
import SaveButton from "../../../Form/SaveButton";
import CloseButton from "../../../Form/CloseButton";
import {ViewWidth} from "../../types";
import {useForm} from "./ColorRowSelected.hooks";
import {useDictionaryTranslate} from "../../../../hooks/pages";


interface ColorRowSelectedProps {
  name: string
  color: string
  viewWidth: ViewWidth
  onSelectedColor: (value: string | null) => void
  colorPrice: string
}


const ColorRowSelected = (props: ColorRowSelectedProps) => {
  const {name, color, viewWidth, onSelectedColor, colorPrice} = props
  const dict = useDictionaryTranslate('newProducts')
  const [
    formData, useError, onColorFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm, onClickClose
  ] = useForm(name, color, colorPrice, onSelectedColor)

  const colorField =
    <SimpleField
      name='color' value={formData.color.value} setValue={onColorFieldChange} error={useError('color')}
      fullWidth={false} variant={'standard'}/>
  const priceField =
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <SaveButton disabled={disabledButtonSave()} onConfirm={onConfirm}/>
      <CloseButton onClick={onClickClose}/>
    </Box>

  return (
    <Box className='color-field selected'>
      <Box sx={{width: "150px"}}>{colorField}</Box>
      <Box sx={{width: "150px"}}>{dict(viewWidth.width)}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "150px"}}>{priceField}</Box>
      <Box sx={{width: "150px"}}>{buttonsCell}</Box>
    </Box>
  );
};

export default ColorRowSelected;