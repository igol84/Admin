import React from 'react';
import {Box, Divider, Paper} from "@mui/material";

interface SizeProps {
  size: number
  qty: number
  onResetSize: () => void
}

const SizeSelected = (props: SizeProps) => {
  const {qty, size, onResetSize} = props
  const onClick = () => {
    onResetSize()
  }

  return (
    <Paper className='size selected' onClick={onClick}>
      <Box>{size}</Box>
      <Divider orientation="horizontal" flexItem/>
      <Box>{qty}</Box>
    </Paper>
  );
};

export default SizeSelected;