import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {fetchSellers} from "../../store/actions/sellers";
import LoadingCircular from "../../components/LoadingCircular";
import {useAccess, useDictionary, useIsLoadingDisplay} from "../../hooks/pages";
import TableSellers from "./TableSellers";


const Sellers = () => {
  const d = useDictionary('sellers')
  const storeId = useStoreId()
  const fetchAccessSellers = useAccess(fetchSellers, {storeId})

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