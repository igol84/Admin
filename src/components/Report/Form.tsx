import React from 'react';
import {MenuItem, Stack} from "@mui/material";

import {Interval, PlaceView} from "../../schemas/report";
import {SimpleSelect} from "../Form";


interface Props {
  places: PlaceView[]
  interval: Interval
  setInterval: (value: Interval) => void
  filterPlaceId: number
  setFilterPlaceId: (value: number) => void
}

const Form = (props: Props) => {
  const {
    places,
    interval,
    setInterval,
    filterPlaceId,
    setFilterPlaceId,
  } = props
  return (
    <Stack spacing={1} className='saleForm' direction={{xs: 'column', sm: 'row'}} sx={{width: 400}}>
      <SimpleSelect
        name='place'
        label={'Place'}
        value={filterPlaceId}
        setValue={setFilterPlaceId}
      >
        <MenuItem value='-1'></MenuItem>
        {places.map((place) => (
          <MenuItem key={place.id} value={place.id}>{place.name}</MenuItem>
        ))}
      </SimpleSelect>

      <SimpleSelect
        name='interval'
        label={'Interval'}
        value={interval}
        setValue={setInterval}
      >
        <MenuItem key={'month'} value={'month'}>{'month'}</MenuItem>
        <MenuItem key={'year'} value={'year'}>{'year'}</MenuItem>
      </SimpleSelect>
    </Stack>
  );
};

export default Form;