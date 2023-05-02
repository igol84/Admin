import {ViewSimpleProduct} from "../../types"
import {Box, useTheme} from "@mui/material"
import {motion} from "framer-motion";
import {formatter, SimpleField} from "../../../Form"
import React, {useContext} from "react"
import {useDictionaryTranslate} from "../../../../hooks/pages";
import {LanguageModeContext} from "../../../../language";
import {tokens} from "../../../../theme";
import {useForm} from "./hooks";
import SaveButton from "../../../Form/SaveButton";
import CloseButton from "../../../Form/CloseButton";


interface Product {
  selected: boolean
  data: ViewSimpleProduct
  onSelect: () => void
  resetSelectedRow: () => void
}

export const SimpleProduct = (props: Product) => {
  const {selected, data, onSelect, resetSelectedRow} = props
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
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const variantsColors = {
    green: {backgroundColor: colors.greenAccent[700]},
    blue: {backgroundColor: colors.blueAccent[700]},
  }
  const className = `paper product${selected ? ' selected' : ''}`
  return (
    <motion.div className={className} onClick={selected ? () => undefined : onSelect}
                variants={variantsColors} animate={selected ? 'green' : 'blue'}
                whileHover={selected ? {} : {x: 5, backgroundColor: colors.greenAccent[700]}}
    >
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: '250px'}}>{nameCell}</Box>
        <Box sx={{width: '80px'}}>{`${data.qty} ${dict('pc')}`}</Box>
        <Box sx={{width: '100px'}} className='push'>{priceCell}</Box>
        <Box sx={{width: '150px'}}>{buttonsCell}</Box>
      </Box>
    </motion.div>
  )
}

export default SimpleProduct