import React from 'react';
import {ViewSale} from "../types";
import {Paper} from "@mui/material";
import Header from "./Header";
import SaleLineItemRow from "./SaleLineItemRow";

interface OldSaleProps {
  viewSale: ViewSale
  startRowId: number
  omSelectedRow: (rowId: number) => () => void
  isSelected: (rowId: number) => boolean
  resetSelectedRow: () => void
}

const OldSale = ({viewSale, startRowId, omSelectedRow, isSelected, resetSelectedRow}: OldSaleProps) => {
  return (
    <Paper className='sale'>
      <Header id={viewSale.id} seller={viewSale.seller} place={viewSale.place}/>
      {viewSale.salLineItems.map((sli, index) => {
        const rowId: number = index + startRowId
        return <SaleLineItemRow key={rowId} selected={isSelected(rowId)} omSelectedRow={omSelectedRow(rowId)}
                                viewSaleLineItem={sli} resetSelectedRow={resetSelectedRow}/>
      })}
    </Paper>
  )
};

export default OldSale;