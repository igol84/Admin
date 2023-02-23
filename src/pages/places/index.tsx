import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useDictionary} from "../../hooks/pages";
import TablePlaces from "../../components/places/TablePlaces";


const Places = () => {
  const d = useDictionary('places')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <TablePlaces/>
    </Box>
  );
};

export default Places;