import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {useStyle} from "./style";
import NewSaleLineItemRow from "./NewSaleLineItemRow/NewSaleLineItemRow";
import NewSaleLineItemRowSelected from "./NewSaleLineItemRow/NewSaleLineItemRowSelected";
import {ViewFormData, ViewNewSaleLineItem, ViewSale, ViewTotal} from "./types";
import FormSale from "./FormSale";
import OldSale from "./OldSale";
import Total from "./Total";


interface SaleLineItemsProps {
  viewNewSaleLineItems: ViewNewSaleLineItem[]
  viewFormData: ViewFormData
  viewOldSales: ViewSale[]
  viewTotal: ViewTotal
}

const SaleLineItems = (props: SaleLineItemsProps) => {
  const {viewNewSaleLineItems, viewFormData, viewOldSales, viewTotal} = props
  const style = useStyle()

  const [selectedSeller, setSelectedSeller] = useState(viewFormData.selectedSellerId)
  const onSetSelectedSeller = (seller: string) => {
    setSelectedSeller(seller)
  }
  const [selectedPlace, setSelectedPlace] = useState(viewFormData.selectedPlaceId)
  const onSetSelectedPlace = (place: string) => {
    setSelectedPlace(place)
  }
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const omSelectedRow = (rowId: number) => () => {
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
        selectedSeller={selectedSeller} onSetSelectedSeller={onSetSelectedSeller}
        selectedPlace={selectedPlace} onSetSelectedPlace={onSetSelectedPlace}
      />
      <Stack className='items'>
        {viewNewSaleLineItems.map((viewNewSaleLineItem, rowId) => {
          return isSelected(rowId)
            ? <NewSaleLineItemRowSelected key={rowId} viewNewSaleLineItem={viewNewSaleLineItem}
                                          resetSelectedRow={resetSelectedRow}/>
            : <NewSaleLineItemRow key={rowId} viewNewSaleLineItem={viewNewSaleLineItem}
                                  omSelectedRow={omSelectedRow(rowId)}/>
        })}
        <Stack className='sales'>
          {viewOldSales.map((viewSale, rowKey) => {
            const startRowId = nextRowId
            nextRowId += viewSale.salLineItems.length
            return <OldSale key={rowKey} viewSale={viewSale} startRowId={startRowId} omSelectedRow={omSelectedRow}
                            isSelected={isSelected} resetSelectedRow={resetSelectedRow}/>
          })}
        </Stack>
      </Stack>
      {viewTotal.proceeds ? <Total viewTotal={viewTotal}/> : null}
    </Box>
  );
};

export default SaleLineItems;