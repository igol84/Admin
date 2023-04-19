import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {useStyle} from "./style";
import NewSaleLineItemRow from "./NewSaleLineItemRow/NewSaleLineItemRow";
import NewSaleLineItemRowSelected from "./NewSaleLineItemRow/NewSaleLineItemRowSelected";
import {ViewFormData, ViewNewSaleLineItem, ViewSale} from "./types";
import FormSale from "./FormSale";
import OldSale from "./OldSale";


interface SaleLineItemsProps {
  viewNewSaleLineItems: ViewNewSaleLineItem[]
  viewFormData: ViewFormData
  viewOldSales: ViewSale[]
}

const SaleLineItems = (props: SaleLineItemsProps) => {
  const {viewNewSaleLineItems, viewFormData, viewOldSales} = props
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
          {viewOldSales.map((viewSale) => {
            return (
              <OldSale key={viewSale.id} viewSale={viewSale}/>
            )
          })}
        </Stack>
      </Stack>

    </Box>
  );
};

export default SaleLineItems;