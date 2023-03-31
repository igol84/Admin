import {ViewShoes} from "../../types"
import {Box, Paper} from "@mui/material"
import React, {useState} from "react"
import Color from "./Color";
import {SimpleField} from "../../../Form";
import SaveButton from "../../../Form/SaveButton";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import {useForm} from "./ShoesSelected.hooks";

interface ShoesSelected {
  data: ViewShoes
  resetFormData: () => void
}

const ShoesForm = (props: ShoesSelected) => {
  const {data, resetFormData} = props
  const [
    formShoesData, useError, onNameFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm
  ] = useForm(data, resetFormData)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const isSelected = (idRow: string) => idRow === selectedColor

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
      <GridActionsCellItem icon={<CloseIcon/>} label={'close'} onClick={resetFormData} color="inherit"/>
    </Box>

  return (
    <Paper className='selected' sx={{p: 1}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: '250px'}}>{nameField}</Box>
        <Box sx={{flex: '1'}}></Box>
        <Box sx={{width: '100px'}}>{priceField}</Box>
        <Box sx={{width: '100px'}}>{buttonsCell}</Box>
      </Box>
      {data.colors.map((color, idRow) => {
        return <Color key={idRow} name={data.name} data={color} selected={isSelected(color.color)}
                      setSelectedColor={setSelectedColor}/>
      })}
    </Paper>
  )
}

export default ShoesForm