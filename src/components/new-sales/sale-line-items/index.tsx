import React from 'react';
import {Box, Paper, Stack} from "@mui/material";
import {ViewSaleLineItem} from "../items/types";
import {useStyle} from "./style";


interface SaleLineItemsProps {
  viewSaleLineItems: ViewSaleLineItem[]
}

const SaleLineItems = (props: SaleLineItemsProps) => {
  const {viewSaleLineItems} = props
  const style = useStyle()
  return (
    <Box sx={style}>
      <Stack className='items'>
        {viewSaleLineItems.map((viewProduct, rowId) => (
            <Paper key={rowId} className='product'>
              <Box sx={{width: '250px'}}>{viewProduct.name}</Box>
              <Box sx={{width: '80px'}}>{`${viewProduct.qty} `}</Box>
              <Box sx={{flex: '1'}}></Box>
              <Box sx={{width: '100px'}}>{viewProduct.price}</Box>
              <Box sx={{width: '150px'}}></Box>
            </Paper>
          )
        )}
      </Stack>
    </Box>
  );
};

export default SaleLineItems;