import React, {useCallback} from 'react';
import Header from "../../components/Header";
import {Box, Button} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";
import {fetchSellers} from "../../store/actions/sellers";
import LoadingCircular from "../../components/LoadingCircular";
import {useAccess, useIsLoadingDisplay} from "../../hooks/pages";

const Sellers = () => {
  const fetchAccessSellers = useAccess(fetchSellers)
  const {isLoading, sellers} = useAppSelector(state => state.sellersReducer)
  const showLoading = useIsLoadingDisplay(isLoading)
  const onClick = useCallback(fetchAccessSellers, [])
  console.log(sellers)
  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title='Sellers' subTitle='Sellers page'/>
      </Box>
      <LoadingCircular show={showLoading}/>
      <Button color='secondary' variant="contained" onClick={onClick}>
        Update
      </Button>
      <Box>
        {sellers.map(seller => (
          <Box key={seller.id}>{seller.name}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sellers;