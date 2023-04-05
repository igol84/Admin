import {ViewSimpleProduct} from "../../types"
import {Box, Paper} from "@mui/material"
import {SimpleField} from "../../../Form"
import React from "react"
import SaveButton from "../../../Form/SaveButton";
import {useForm} from "./hooks";
import CloseButton from "../../../Form/CloseButton";
import {useDictionaryTranslate} from "../../../../hooks/pages";

interface Product {
  data: ViewSimpleProduct
  resetFormData: () => void
}

const SimpleProductSelected = (props: Product) => {
  const {data, resetFormData} = props
  const dict = useDictionaryTranslate('ProductsEditor')
  const [
    formData, useError, onNameFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm
  ] = useForm(data, resetFormData)
  const nameCell =
    <SimpleField
      name='name' value={formData.name.value} setValue={onNameFieldChange} error={useError('name')} fullWidth={false}
      variant={'standard'}/>
  const priceCell =
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <SaveButton disabled={disabledButtonSave()} onConfirm={onConfirm}/>
      <CloseButton onClick={resetFormData}/>
    </Box>

  return (
    <Paper className='product selected' onClick={() => undefined}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: '250px'}}>{nameCell}</Box>
        <Box sx={{width: '80px'}}>{`${data.qty} ${dict('pc')}`}</Box>
        <Box sx={{flex: '1'}}></Box>
        <Box sx={{width: '100px'}}>{priceCell}</Box>
        <Box sx={{width: '150px'}}>{buttonsCell}</Box>
      </Box>
    </Paper>
  )
}

export default SimpleProductSelected