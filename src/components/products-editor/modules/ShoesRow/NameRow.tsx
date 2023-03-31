import React from 'react';
import {Box} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import {formatter} from "../../../Form";

interface NameRowProps {
  name: string
  shoesPrice: string
  onSelectedNameForm: (flag: boolean) => void
  resetFormData: () => void
}

const NameRow = (props: NameRowProps) => {
  const {name, shoesPrice, onSelectedNameForm, resetFormData} = props
  const onClick = () => {
    onSelectedNameForm(true)
  }
  const formatShoesPrice = shoesPrice !== '' ? formatter.format(Number(shoesPrice)) : ''
  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <GridActionsCellItem icon={<CloseIcon/>} label={'close'} onClick={resetFormData} color="inherit"/>
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