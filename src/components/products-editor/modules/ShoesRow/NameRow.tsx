import React, {useContext} from 'react';
import {Box} from "@mui/material";
import {formatter} from "../../../Form";
import CloseButton from "../../../Form/CloseButton";
import {LanguageModeContext} from "../../../../language";

interface NameRowProps {
  name: string
  shoesPrice: string
  onSelectedNameForm: (flag: boolean) => void
  resetSelectedRow: () => void
}

const NameRow = (props: NameRowProps) => {
  const {name, shoesPrice, onSelectedNameForm, resetSelectedRow} = props
  const {language} = useContext(LanguageModeContext)
  const onClick = () => {
    onSelectedNameForm(true)
  }
  const formatShoesPrice = shoesPrice !== '' ? formatter(language).format(Number(shoesPrice)) : ''
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <CloseButton onClick={resetSelectedRow}/>
    </Box>
  return (
    <Box className='name-field' onClick={onClick}>
      <Box sx={{width: "150px"}}>{name}</Box>
      <Box sx={{width: "150px"}} className='push'>{formatShoesPrice}</Box>
      <Box>{buttonsCell}</Box>
    </Box>
  );
};

export default NameRow;