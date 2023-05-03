import {ViewSimpleProduct} from "../../types"
import {Box} from "@mui/material"
import {formatter, SimpleField} from "../../../Form"
import React, {useContext} from "react"
import {useDictionaryTranslate} from "../../../../hooks/pages";
import {LanguageModeContext} from "../../../../language";
import {useForm} from "./hooks";
import SaveButton from "../../../Form/SaveButton";
import CloseButton from "../../../Form/CloseButton";


interface Product {
  selected: boolean
  data: ViewSimpleProduct
  resetSelectedRow: () => void
}

export const SimpleProduct = (props: Product) => {
  const {selected, data, resetSelectedRow} = props
  const {language} = useContext(LanguageModeContext)
  const dict = useDictionaryTranslate('ProductsEditor')
  const [
    formData, useError, onNameFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm
  ] = useForm(data, resetSelectedRow)
  const nameCell = selected ?
    <SimpleField
      name='name' value={formData.name.value} setValue={onNameFieldChange} error={useError('name')} fullWidth={false}
      variant={'standard'}/>
    : data.name
  const priceCell = selected ?
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
    : formatter(language).format(data.price)
  const buttonsCell = selected &&
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <SaveButton disabled={disabledButtonSave()} onConfirm={onConfirm}/>
      <CloseButton onClick={resetSelectedRow}/>
    </Box>

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
      <Box sx={{width: '250px'}}>{nameCell}</Box>
      <Box sx={{width: '80px'}}>{`${data.qty} ${dict('pc')}`}</Box>
      <Box sx={{width: '100px'}} className='push'>{priceCell}</Box>
      <Box sx={{width: '150px'}}>{buttonsCell}</Box>
    </Box>
  )
}

export default SimpleProduct