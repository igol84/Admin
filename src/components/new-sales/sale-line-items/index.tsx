import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {useStyle} from "./style";
import NewSaleLineItemRow from "./NewSaleLineItemRow/NewSaleLineItemRow";
import NewSaleLineItemRowSelected from "./NewSaleLineItemRow/NewSaleLineItemRowSelected";
import {ViewNewSaleLineItem, ViewSellersAndPlaces} from "./types";
import FormSale from "./FormSale";
import {formatISODate} from "../../../hooks/form-data";


interface SaleLineItemsProps {
  viewNewSaleLineItems: ViewNewSaleLineItem[]
  viewSellersAndPlaces: ViewSellersAndPlaces
}

const SaleLineItems = (props: SaleLineItemsProps) => {
  const {viewNewSaleLineItems, viewSellersAndPlaces} = props
  const style = useStyle()
  const [selectedDate, setSelectedDate] = useState(formatISODate(new Date()).toString())
  const onSetSelectedDate = (date: string) => {
    setSelectedDate(date)
  }
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const omSelectedRow = (rowId: number) => () => {
    setSelectedRowId(rowId)
  }
  const isSelected = (rowId: number) => rowId === selectedRowId
  const resetSelectedRow = () => {
    setSelectedRowId(null)
  }

  return (
    <Box sx={style}>
      <FormSale viewSellersAndPlaces={viewSellersAndPlaces} selectedDate={selectedDate}
                onSetSelectedDate={onSetSelectedDate}/>
      <Stack className='items'>
        {viewNewSaleLineItems.map((viewNewSaleLineItem, rowId) => {
          return isSelected(rowId)
            ? <NewSaleLineItemRowSelected key={rowId} viewNewSaleLineItem={viewNewSaleLineItem}
                                          resetSelectedRow={resetSelectedRow}/>
            : <NewSaleLineItemRow key={rowId} viewNewSaleLineItem={viewNewSaleLineItem}
                                  omSelectedRow={omSelectedRow(rowId)}/>
        })}
      </Stack>
    </Box>
  );
};

export default SaleLineItems;