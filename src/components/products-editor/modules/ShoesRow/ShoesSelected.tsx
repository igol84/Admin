import {ViewShoes} from "../../types"
import {Box, Paper} from "@mui/material"
import React, {useState} from "react"
import ColorSelected from "./ColorSelected";
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
  const [selectedColorRow] = useState(null)
  const isSelected = (idRow: number) => idRow === selectedColorRow

  const [
    formShoesData, useError, onNameFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm
  ] = useForm(data, resetFormData)

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
        <Box sx={{width: '150px'}}>{buttonsCell}</Box>
      </Box>
      {data.colors.map((color, idRow) => {
        if (!isSelected(idRow))
          return <Color key={idRow} data={color}/>
        else
          return <ColorSelected key={idRow} data={color}/>
      })}
    </Paper>
  )
}

export default ShoesForm