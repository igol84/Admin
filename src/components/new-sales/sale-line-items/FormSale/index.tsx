import React from 'react';
import {Button, MenuItem, Stack} from "@mui/material";
import {SimpleField, SimpleSelect} from "../../../Form";
import {ViewSellersAndPlaces} from "../types";
import {useAppSelector} from "../../../../hooks/redux";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {CreateSale, CreateSaleLineItemForSale, EndSale} from "../../../../schemas/new-sale";
import {useFetchAccess} from "../../../../hooks/pages";
import {saveNewSale} from "../../../../store/actions/new-sales";
import {formatISO} from "date-fns";

interface FormSaleProps {
  viewSellersAndPlaces: ViewSellersAndPlaces
  resetSelectedRow: () => void
  selectedDate: string
  onSetSelectedDate: (date: string) => void
  selectedSeller: string
  onSetSelectedSeller: (seller: string) => void
  selectedPlace: string
  onSetSelectedPlace: (place: string) => void
}

const FormSale = (props: FormSaleProps) => {
  const {
    viewSellersAndPlaces,
    resetSelectedRow,
    selectedDate,
    onSetSelectedDate,
    selectedSeller,
    onSetSelectedSeller,
    selectedPlace,
    onSetSelectedPlace
  } = props
  const {newSaleLineItems} = useAppSelector(state => state.newSalesSliceSlice)

  const isDisableButton = () => {
    return !(newSaleLineItems.length > 0 && Number(selectedSeller) > 0 && Number(selectedPlace) > 0)
  }
  const saveNewSaleFetch = useFetchAccess(saveNewSale)
  const onSave = async () => {
    if (newSaleLineItems.length > 0 && Number(selectedPlace) > 0 && Number(selectedSeller) > 0) {
      const sale_line_items: CreateSaleLineItemForSale[] = newSaleLineItems.map(newSaleLineItem => {
        const saleLineItemForSale: CreateSaleLineItemForSale = {
          item_id: newSaleLineItem.itemId,
          sale_price: newSaleLineItem.salePrice,
          qty: newSaleLineItem.qty
        }
        return saleLineItemForSale
      })
      const time = formatISO(new Date(), {representation: 'time'})
      const sale: CreateSale = {
        date_time: `${selectedDate}T${time}`,
        place_id: Number(selectedPlace),
        seller_id: Number(selectedSeller),
        sale_line_items
      }
      const endSale: EndSale = {sale}
      await saveNewSaleFetch(endSale)
    }
  }

  return (
    <Stack spacing={1} className='saleForm' direction={{xs: 'column', sm: 'row'}}>
      <SimpleField
        name="date"
        label="Date of sale"
        type="date"
        value={selectedDate}
        setValue={onSetSelectedDate}
        onClick={resetSelectedRow}
      />
      <SimpleSelect
        name='place'
        label='place'
        value={selectedPlace}
        setValue={onSetSelectedPlace}
        onOpen={resetSelectedRow}
      >
        <MenuItem value='-1'></MenuItem>
        {viewSellersAndPlaces.places.map((place) => (
          <MenuItem key={place.id} value={place.id}>{place.name}</MenuItem>
        ))}
      </SimpleSelect>
      <SimpleSelect
        name='seller'
        label='seller'
        value={selectedSeller}
        setValue={onSetSelectedSeller}
        onOpen={resetSelectedRow}
      >
        <MenuItem value='-1'></MenuItem>
        {viewSellersAndPlaces.sellers.map((seller) => (
          <MenuItem key={seller.id} value={seller.id}>{seller.name}</MenuItem>
        ))}
      </SimpleSelect>
      <Button className='buttonConfirm' variant="contained" color='secondary' endIcon={<SaveRoundedIcon/>}
              disabled={isDisableButton()} onClick={onSave}>
        Save
      </Button>

    </Stack>
  );
};

export default FormSale