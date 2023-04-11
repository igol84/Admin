import React from 'react';
import {Box, Divider, Paper} from "@mui/material";
import {SelectedSize} from "./index";

interface SizeProps {
  id: number
  size: number
  price: number
  qty: number
  onSizeClick: (selectedSize: SelectedSize) => void
}

const Size = (props: SizeProps) => {
  const {id, qty, size, price, onSizeClick} = props

  const onClick = () => {
    onSizeClick({id, price})
  }

  return (
    <Paper className='size' onClick={onClick}>
      <Box>{size}</Box>
      <Divider orientation="horizontal" flexItem/>
      <Box>{qty}</Box>
    </Paper>
  );
};

export default Size;