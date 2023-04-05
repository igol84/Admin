import React, {useContext} from 'react';
import {Box} from "@mui/material";
import {formatter} from "../../../Form";
import CloseButton from "../../../Form/CloseButton";
import {LanguageModeContext} from "../../../../language";

interface NameRowProps {
  name: string
  shoesPrice: string
  onSelectedNameForm: (flag: boolean) => void
  resetFormData: () => void
}

const NameRow = (props: NameRowProps) => {
  const {name, shoesPrice, onSelectedNameForm, resetFormData} = props
  const {language} = useContext(LanguageModeContext)
  const onClick = () => {
    onSelectedNameForm(true)
  }
  const formatShoesPrice = shoesPrice !== '' ? formatter(language).format(Number(shoesPrice)) : ''
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <CloseButton onClick={resetFormData}/>
    </Box>
  return (
    <Box className='color-field' onClick={onClick}>
      <Box sx={{width: "150px"}}>{name}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "150px"}}>{formatShoesPrice}</Box>
      <Box>{buttonsCell}</Box>
    </Box>
  );
};

export default NameRow;