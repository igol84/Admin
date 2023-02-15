import React from 'react';
import Header from "../../components/Header";
import {Box, Button} from "@mui/material";
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
  const onClickUpdate = () => fetchAccessSellers()


  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <LoadingCircular show={showLoading}/>
      <Button color='secondary' variant="contained" onClick={onClickUpdate}>
        Update
      </Button>
      <TableSellers sellers={sellers}/>
    </Box>
  );
};

export default Sellers;