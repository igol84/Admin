import React from 'react';
import {Box, Paper} from "@mui/material";
import {ViewNewSaleLineItem} from "../types";

interface NewSaleLineItemRow {
  viewNewSaleLineItem: ViewNewSaleLineItem
  omSelectedRow: () => void
}

const NewSaleLineItemRow = (props: NewSaleLineItemRow) => {
  const {viewNewSaleLineItem, omSelectedRow} = props

  return (
    <Paper className='product' onClick={omSelectedRow}>
      <Box sx={{width: '250px'}}>{viewNewSaleLineItem.name}</Box>
      <Box sx={{width: '80px'}}>{viewNewSaleLineItem.qty}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{viewNewSaleLineItem.price}</Box>
      <Box sx={{width: '150px'}}></Box>
    </Paper>
  );
};

export default NewSaleLineItemRow;