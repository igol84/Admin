import {ViewSize} from "../../types"
import {Box, Paper} from "@mui/material"
import React from "react"
import {GridActionsCellItem} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import {SimpleField} from "../../../Form";
import SaveButton from "../../../Form/SaveButton";
import {useSizeForm} from "./SizeRowSelected.hooks";

interface SizeRowSelectedProps {
  sizeData: ViewSize
  onSelectedSize: (idSize: number | null) => void
}

const SizeRowSelected = (props: SizeRowSelectedProps) => {
  const {sizeData, onSelectedSize} = props

  const [formSizeData, useError, onSizeFieldChange, onLengthFieldChange, onPriceFieldChange, disabledButtonSave,
    onConfirm, onClickClose] = useSizeForm(sizeData, onSelectedSize)


  const sizeField =
    <SimpleField
      type='number' name='size' value={formSizeData.size.value.toString()} setValue={onSizeFieldChange}
      error={useError('size')} fullWidth={false} variant={'standard'}
    />
  const lengthField =
    <SimpleField
      type='number' name='length' value={formSizeData.length.value.toString()} setValue={onLengthFieldChange}
      error={useError('length')} fullWidth={false} variant={'standard'} inputProps={{step: 0.5}}
    />
  const priceField =
    <SimpleField
      type='number' name='price' value={formSizeData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}
    />
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <SaveButton disabled={disabledButtonSave()} onConfirm={onConfirm}/>
      <GridActionsCellItem icon={<CloseIcon/>} label={'close'} onClick={onClickClose} color="inherit"/>
    </Box>
  return (
    <Paper className='size selected'>
      <Box sx={{width: "80px"}}>{sizeField}</Box>
      <Box sx={{width: "80px"}}>{lengthField}</Box>
      <Box sx={{width: "100px"}}>{sizeData.qty}</Box>
      <Box sx={{width: "100px"}}>{priceField}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "100px"}}>{buttonsCell}</Box>
    </Paper>
  )
}

export default SizeRowSelected