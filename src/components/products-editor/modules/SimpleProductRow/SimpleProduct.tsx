import {ViewSimpleProduct} from "../../types"
import {Box, Paper} from "@mui/material"
import {formatter} from "../../../Form"
import React, {useContext} from "react"
import {useDictionaryTranslate} from "../../../../hooks/pages";
import {LanguageModeContext} from "../../../../language";


interface Product {
  data: ViewSimpleProduct
  onSelect: () => void
}

export const SimpleProduct = (props: Product) => {
  const {data, onSelect} = props
  const {language} = useContext(LanguageModeContext)
  const dict = useDictionaryTranslate('ProductsEditor')
  return (
    <Paper className='product' onClick={onSelect}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: '250px'}}>{data.name}</Box>
        <Box sx={{width: '80px'}}>{`${data.qty} ${dict('pc')}`}</Box>
        <Box sx={{flex: '1'}}></Box>
        <Box sx={{width: '100px'}}>{formatter(language).format(data.price)}</Box>
        <Box sx={{width: '150px'}}></Box>
      </Box>
    </Paper>
  )
}

export default SimpleProduct