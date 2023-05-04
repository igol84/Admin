import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {useStyle} from "./style";
import NewSaleLineItemRow from "./NewSaleLineItemRow/NewSaleLineItemRow";
import {ViewFormData, ViewNewSaleLineItem, ViewSale, ViewTotal} from "./types";
import FormSale from "./FormSale";
import OldSale from "./OldSale";
import Total from "./Total";
import {AnimatePresence} from "framer-motion";


interface SaleLineItemsProps {
  viewNewSaleLineItems: ViewNewSaleLineItem[]
  viewFormData: ViewFormData
  viewOldSales: ViewSale[]
  viewTotal: ViewTotal
}

const SaleLineItems = (props: SaleLineItemsProps) => {
  const {viewNewSaleLineItems, viewFormData, viewOldSales, viewTotal} = props
  const style = useStyle()

  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const onSelectedRow = (rowId: number) => () => {
    setSelectedRowId(rowId)
  }
  const isSelected = (rowId: number) => rowId === selectedRowId
  const resetSelectedRow = () => {
    setSelectedRowId(null)
  }

  let nextRowId = viewNewSaleLineItems.length
  return (
    <Box sx={style}>
      <FormSale
        viewSellersAndPlaces={viewFormData} resetSelectedRow={resetSelectedRow}
        selectedDate={viewFormData.selectedDate} onSetSelectedDate={viewFormData.onSetSelectedDate}
      />

      <Stack className='items'>
        <AnimatePresence>
          {viewNewSaleLineItems.map((viewNewSaleLineItem, rowId) => {
            return <NewSaleLineItemRow
              key={rowId} selected={isSelected(rowId)} viewNewSaleLineItem={viewNewSaleLineItem}
              resetSelectedRow={resetSelectedRow} onSelectedRow={onSelectedRow(rowId)}/>

          })}
        </AnimatePresence>
        <Stack className='sales'>
          {viewOldSales.map((viewSale, rowKey) => {
            const startRowId = nextRowId
            nextRowId += viewSale.salLineItems.length
            return <OldSale key={rowKey} viewSale={viewSale} startRowId={startRowId} omSelectedRow={onSelectedRow}
                            isSelected={isSelected} resetSelectedRow={resetSelectedRow}/>
          })}
        </Stack>
      </Stack>
      {(viewTotal.proceeds || viewTotal.income) ? <Total viewTotal={viewTotal}/> : null}
    </Box>
  );
};

export default SaleLineItems;