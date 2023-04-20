import React from 'react';
import {Box} from "@mui/material";
import {viewSaleLineItem} from "../types";

interface SaleLineItemRowProps {
  viewSaleLineItem: viewSaleLineItem
  omSelectedRow: () => void
}

const SaleLineItemRow = ({viewSaleLineItem, omSelectedRow}: SaleLineItemRowProps) => {
  return (
    <Box className='item' onClick={omSelectedRow}>
      <Box width='300px'>{viewSaleLineItem.name}</Box>
      <Box width='100px'>{viewSaleLineItem.salePrice}</Box>
      <Box width='50px'>{viewSaleLineItem.qty}</Box>
      <Box flex={1}></Box>
      <Box width='150px'></Box>
    </Box>
  );
};

export default SaleLineItemRow;