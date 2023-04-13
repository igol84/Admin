import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {useStyle} from "./style";
import NewSaleLineItemRow from "./NewSaleLineItemRow/NewSaleLineItemRow";
import NewSaleLineItemRowSelected from "./NewSaleLineItemRow/NewSaleLineItemRowSelected";
import {ViewNewSaleLineItem} from "./types";


interface SaleLineItemsProps {
  viewNewSaleLineItems: ViewNewSaleLineItem[]
}

const SaleLineItems = (props: SaleLineItemsProps) => {
  const {viewNewSaleLineItems} = props
  const style = useStyle()
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