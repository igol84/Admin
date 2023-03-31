import React, {Dispatch, SetStateAction} from 'react';
import {Box} from "@mui/material";
import {SimpleField} from "../../../Form";
import SaveButton from "../../../Form/SaveButton";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import {ViewWidth} from "../../types";
import {useForm} from "./ColorRowSelected.hooks";


interface ColorRowProps {
  name: string
  color: string
  data: ViewWidth
  setSelectedColor: Dispatch<SetStateAction<string | null>>
  priceWidth: string
}

const ColorRowSelected = (props: ColorRowProps) => {
  const {name, color, data, setSelectedColor, priceWidth} = props

  const [
    formData, useError, onColorFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm, onClickClose
  ] = useForm(name, color, priceWidth, setSelectedColor)

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
      <GridActionsCellItem icon={<CloseIcon/>} label={'close'} onClick={onClickClose} color="inherit"/>
    </Box>

  return (
    <Box className='color-field selected'>
      <Box sx={{width: "150px"}}>{colorField}</Box>
      <Box sx={{width: "150px"}}>{data.width}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "150px"}}>{priceField}</Box>
      <Box sx={{width: "150px"}}>{buttonsCell}</Box>
    </Box>
  );
};

export default ColorRowSelected;