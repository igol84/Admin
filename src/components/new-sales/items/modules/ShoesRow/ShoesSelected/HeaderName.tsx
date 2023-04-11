import React from 'react';
import {Box} from "@mui/material";
import CloseButton from "../../../../../Form/CloseButton";


interface HeaderProps {
  name: string
  onClose: () => void
}

const HeaderName = (props: HeaderProps) => {
  const {name, onClose} = props

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
      <Box sx={{width: '250px'}}>{name}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box><CloseButton onClick={onClose}/></Box>
    </Box>
  );
};

export default HeaderName