import React from 'react';
import {Box} from "@mui/material";

interface SaleLineItemRowProps{
  name: string
  salePrice: number
  qty: number
}

const SaleLineItemRow = ({name, salePrice, qty}: SaleLineItemRowProps) => {
  return (
    <Box className='item'>
      <Box width='300px'>{name}</Box>
      <Box width='50px'>{salePrice}</Box>
      <Box width='50px'>{qty}</Box>
    </Box>
  );
};

export default SaleLineItemRow;