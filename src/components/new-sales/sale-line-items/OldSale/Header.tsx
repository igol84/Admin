import React from 'react';
import {Box} from "@mui/material";

interface HeaderProps{
  id: number
  seller: string
  place: string
}

const Header = ({id, seller, place}: HeaderProps) => {
  return (
    <Box className='header'>
      <Box>{id}</Box>
      <Box sx={{width: '80px'}}>{seller}</Box>
      <Box sx={{width: '100px'}}>{place}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '150px'}}></Box>
    </Box>
  );
};

export default Header;