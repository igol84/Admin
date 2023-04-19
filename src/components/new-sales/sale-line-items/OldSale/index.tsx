import React from 'react';
import {ViewSale} from "../types";
import {Paper} from "@mui/material";
import Header from "./Header";
import SaleLineItemRow from "./SaleLineItemRow";

interface OldSaleProps {
  viewSale: ViewSale
}

const OldSale = ({viewSale}: OldSaleProps) => {
  return (
    <Paper className='sale'>
      <Header id={viewSale.id} seller={viewSale.seller} place={viewSale.place}/>
      {viewSale.salLineItems.map((sli, rowId) => {
        return <SaleLineItemRow key={rowId} name={sli.name} qty={sli.qty} salePrice={sli.salePrice}/>
      })}
    </Paper>
  )
};

export default OldSale;