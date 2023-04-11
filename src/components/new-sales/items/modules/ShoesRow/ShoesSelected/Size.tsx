import React from 'react';
import {Box, Divider, Paper} from "@mui/material";

interface SizeProps {
  id: number
  size: number
  qty: number
  onSizeClick: (id: number) => void
}

const Size = (props: SizeProps) => {
  const {id, qty, size, onSizeClick} = props

  const onClick = () => {
    onSizeClick(id)
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