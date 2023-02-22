import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {fetchPlaces} from "../../store/actions/places";
import LoadingCircular from "../../components/LoadingCircular";
import {useDictionary, useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import TablePlaces from "../../components/places/TablePlaces";


const Places = () => {
  const d = useDictionary('places')
  const storeId = useStoreId()
  useLoaderAccess(fetchPlaces, {storeId})

  const {isLoading, places} = useAppSelector(state => state.placesReducer)
  const showLoading = useIsLoadingDisplay(isLoading)


  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <TablePlaces places={places}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Places;