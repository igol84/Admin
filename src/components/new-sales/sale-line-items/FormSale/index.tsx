import React, {useState} from 'react';
import {MenuItem, Stack} from "@mui/material";
import {SimpleField, SimpleSelect} from "../../../Form";
import {ViewSellersAndPlaces} from "../types";
import {useAppSelector} from "../../../../hooks/redux";

interface FormSaleProps {
  viewSellersAndPlaces: ViewSellersAndPlaces
  selectedDate: string
  onSetSelectedDate: (date:string)=> void
}

const FormSale = (props: FormSaleProps) => {
  const {viewSellersAndPlaces, selectedDate, onSetSelectedDate} = props
  const {newSaleLineItems, sellers, places} = useAppSelector(state => state.newSalesSliceSlice)
  const [selectedSeller, setSelectedSeller] = useState(viewSellersAndPlaces.selectedSellerId)
  const [selectedPlace, setSelectedPlace] = useState(viewSellersAndPlaces.selectedPlaceId)
  return (
    <Stack spacing={1} className='saleForm' direction={{xs: 'column', sm: 'row'}}>
      <SimpleField
        name="date"
        label="Date of sale"
        type="date"
        value={selectedDate}
        setValue={onSetSelectedDate}
      />
      <SimpleSelect
        name='seller'
        label='seller'
        value={selectedSeller}
        setValue={setSelectedSeller}
      >
        <MenuItem value='-1'></MenuItem>
        {viewSellersAndPlaces.sellers.map((seller) => (
          <MenuItem key={seller.id} value={seller.id}>{seller.name}</MenuItem>
        ))}
      </SimpleSelect>
      <SimpleSelect
        name='place'
        label='place'
        value={selectedPlace}
        setValue={setSelectedPlace}
      >
        <MenuItem value='-1'></MenuItem>
        {viewSellersAndPlaces.places.map((place) => (
          <MenuItem key={place.id} value={place.id}>{place.name}</MenuItem>
        ))}
      </SimpleSelect>
    </Stack>
  );
};

export default FormSale