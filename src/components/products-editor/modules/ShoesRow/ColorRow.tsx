import React, {useContext} from 'react';
import {Box} from "@mui/material";
import {formatter} from "../../../Form";
import {useDictionaryTranslate} from "../../../../hooks/pages";
import {LanguageModeContext} from "../../../../language";

interface ColorRowProps {
  color: string
  width: string
  colorPrice: string
  onSelectedColor: (value: string | null) => void
}

const ColorRow = (props: ColorRowProps) => {
  const {color, width, colorPrice, onSelectedColor} = props
  const {language} = useContext(LanguageModeContext)
  const dict = useDictionaryTranslate('newProducts')
  const onClick = () => {
    onSelectedColor(color)
  }
  const formatColorPrice = colorPrice !== '' ? formatter(language).format(Number(colorPrice)) : ''
  return (
    <Box className='color-field' onClick={onClick}>
      <Box sx={{width: "150px"}}>{color}</Box>
      <Box sx={{width: "150px"}}>{dict(width)}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "150px"}}>{formatColorPrice}</Box>
    </Box>
  );
};

export default ColorRow;