import React, {useState} from 'react';
import {Box} from "@mui/material";
import SaleLineItems from "./sale-line-items";
import Items from "./items";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {useFetchAccess, useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchDataForNewSale, fetchSales} from "../../store/actions/new-sales";
import LoadingCircular from "../LoadingCircular";
import {convertFormData, convertItems, convertSaleLineItems, convertSales, getTotal} from "./utility";
import {formatISODate} from "../../hooks/form-data";

const NewSales = () => {

  const [selectedDate, setSelectedDate] = useState(formatISODate(new Date()).toString())
  const getSales = useFetchAccess(fetchSales)
  const storeId = useStoreId()
  useLoaderAccess(fetchDataForNewSale, {storeId, selectedDate})
  useLoaderAccess(fetchSales, {storeId, selectedDate})
  const onSetSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate)
    getSales({storeId, selectedDate})
  }
  const {isLoading, items, newSaleLineItems, sellers, places, sales} = useAppSelector(state => state.newSalesSliceSlice)
  const viewProducts = convertItems(items)
  const viewNewSaleLineItems = convertSaleLineItems(items, newSaleLineItems)
  const viewFormData = convertFormData(sellers, places, selectedDate, onSetSelectedDate)
  const viewOldSales = convertSales(sales)
  const showLoading = useIsLoadingDisplay(isLoading)
  const viewTotal = getTotal(sales, newSaleLineItems, items)

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <SaleLineItems viewNewSaleLineItems={viewNewSaleLineItems} viewFormData={viewFormData}
                     viewOldSales={viewOldSales} viewTotal={viewTotal}/>
      <Items viewProducts={viewProducts}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default NewSales;