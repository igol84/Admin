import {Box, useTheme} from "@mui/material"
import {motion} from "framer-motion";
import {ViewSize} from "../../types"
import React, {useContext} from "react"
import {formatter} from "../../../Form";
import {LanguageModeContext} from "../../../../language";
import {useDictionaryTranslate} from "../../../../hooks/pages";
import {tokens} from "../../../../theme";

interface SizeRowProps {
  sizeData: ViewSize
  onSelectedSize: (idSize: number | null) => void
}

const SizeRow = (props: SizeRowProps) => {
  const {sizeData, onSelectedSize} = props
  const {language} = useContext(LanguageModeContext)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dict = useDictionaryTranslate('ProductsEditor')
  const onClick = () => {
    onSelectedSize(sizeData.prod_id)
  }
  const variantsColors = {
    green: {backgroundColor: colors.greenAccent[600]},
    darkGreen: {backgroundColor: colors.greenAccent[800]},
  }
  return (
    <motion.div
      className='paper size' onClick={onClick}
      variants={variantsColors} initial='green' animate='darkGreen' whileHover='green'
    >
      <Box sx={{width: "80px"}}>{sizeData.size}</Box>
      <Box sx={{width: "80px"}}>{sizeData.length > 0 ? `${sizeData.length} ${dict('cm')}` : ''}</Box>
      <Box sx={{width: "100px"}}>{`${sizeData.qty} ${dict('pc')}`}</Box>
      <Box sx={{width: "100px"}}>{formatter(language).format(Number(sizeData.price))}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "100px"}}></Box>
    </motion.div>
  )
}

export default SizeRow