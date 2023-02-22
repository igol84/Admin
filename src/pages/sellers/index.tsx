import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {fetchSellers} from "../../store/actions/sellers";
import LoadingCircular from "../../components/LoadingCircular";
import {useDictionary, useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import TableSellers from "../../components/sellers/TableSellers";


const Sellers = () => {
  const d = useDictionary('sellers')
  const storeId = useStoreId()
  useLoaderAccess(fetchSellers, {storeId})

  const {isLoading, sellers} = useAppSelector(state => state.sellersReducer)
  const showLoading = useIsLoadingDisplay(isLoading)


  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <TableSellers sellers={sellers}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Sellers;