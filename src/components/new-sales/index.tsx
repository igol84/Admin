import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import SaleLineItems from "./sale-line-items";
import Items from "./items";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchDataForNewSale} from "../../store/actions/new-sales";
import LoadingCircular from "../LoadingCircular";
import {convertItems, convertSaleLineItems, convertSellersAndPlaces} from "./items/utility";

const NewSales = () => {
  const storeId = useStoreId()
  useLoaderAccess(fetchDataForNewSale, {storeId})

  const {isLoading, items, newSaleLineItems, sellers, places} = useAppSelector(state => state.newSalesSliceSlice)
  const viewProducts = convertItems(items)
  const viewNewSaleLineItems = convertSaleLineItems(items, newSaleLineItems)
  const viewSellersAndPlaces = convertSellersAndPlaces(sellers, places)

  const showLoading = useIsLoadingDisplay(isLoading)

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <SaleLineItems viewNewSaleLineItems={viewNewSaleLineItems} viewSellersAndPlaces={viewSellersAndPlaces}/>
      <Items viewProducts={viewProducts}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default NewSales;