import {ViewSize} from "../../types"
import {Box, Paper} from "@mui/material"
import React, {useContext} from "react"
import {formatter} from "../../../Form";
import {LanguageModeContext} from "../../../../language";
import {useDictionaryTranslate} from "../../../../hooks/pages";

interface SizeRowProps {
  sizeData: ViewSize
  onSelectedSize: (idSize: number | null) => void
}

const SizeRow = (props: SizeRowProps) => {
  const {sizeData, onSelectedSize} = props
  const {language} = useContext(LanguageModeContext)
  const dict = useDictionaryTranslate('ProductsEditor')
  const onClick = () => {
    onSelectedSize(sizeData.prod_id)
  }
  return (
    <Paper className='size' onClick={onClick}>
      <Box sx={{width: "80px"}}>{sizeData.size}</Box>
      <Box sx={{width: "80px"}}>{sizeData.length > 0 ? `${sizeData.length} ${dict('cm')}` : ''}</Box>
      <Box sx={{width: "100px"}}>{`${sizeData.qty} ${dict('pc')}`}</Box>
      <Box sx={{width: "100px"}}>{formatter(language).format(Number(sizeData.price))}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "100px"}}></Box>
    </Paper>
  )
}

export default SizeRow