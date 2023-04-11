import React from 'react';
import {Box} from "@mui/material";


interface HeaderProps {
  color: string
  width: string
}

const HeaderName = (props: HeaderProps) => {
  const {color, width} = props

  return (
    <Box className='color-row'>
      <Box>{color}</Box>
      <Box>{width}</Box>
    </Box>
  );
};

export default HeaderName