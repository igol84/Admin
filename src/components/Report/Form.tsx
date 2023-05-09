import React from 'react';
import {MenuItem, Stack} from "@mui/material";

import {Interval, PlaceView} from "../../schemas/report";
import {SimpleSelect} from "../Form";
import {useDictionaryTranslate} from "../../hooks/pages";


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
  const d = useDictionaryTranslate('report')
  return (
    <Stack spacing={1} className='saleForm' direction={{xs: 'column', sm: 'row'}} sx={{width: 400}}>
      <SimpleSelect
        name='place'
        label={d('place')}
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
        label={d('interval')}
        value={interval}
        setValue={setInterval}
      >
        <MenuItem key={'month'} value={'month'}>{d('month')}</MenuItem>
        <MenuItem key={'year'} value={'year'}>{d('year')}</MenuItem>
      </SimpleSelect>
    </Stack>
  );
};

export default Form;