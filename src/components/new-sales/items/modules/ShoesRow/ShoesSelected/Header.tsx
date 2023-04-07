import React from 'react';
import {Box} from "@mui/material";


interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => {
  const {name} = props
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
      <Box sx={{width: '250px'}}>{name}</Box>
      <Box sx={{flex: '1'}}></Box>
    </Box>
  );
};

export default Header