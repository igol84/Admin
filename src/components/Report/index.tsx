import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector, useStoreId} from "../../hooks/redux";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchReport, getReport} from "../../store/actions/report";
import {Box} from "@mui/material";
import Form from "./Form";
import LoadingCircular from "../LoadingCircular";
import {Interval} from "../../schemas/report";
import ReportTable from "./ReportTable";


const Report = () => {
  const storeId = useStoreId()
  const dispatch = useAppDispatch()
  useLoaderAccess(fetchReport, {storeId})
  const {isLoading, placesView, sales, report} = useAppSelector(state => state.reportSlice)
  const [interval, setInterval] = useState<Interval>('month')
  const onSetInterval = (value: Interval) => {
    setInterval(value)

  }
  const [filterPlaceId, setFilterPlaceId] = useState<number>(-1)
  const onSetFilterPlaceId = (value: number) => {
    setFilterPlaceId(value)

  }

  useEffect(() => {
    dispatch(getReport({filterPlaceId, interval}))
  }, [sales, interval, filterPlaceId])
  useEffect(() => {
    console.log(report)
  }, [report])

  const showLoading = useIsLoadingDisplay(isLoading)

  return (
    <Box>

      <Form
        places={placesView} interval={interval} setInterval={onSetInterval}
        filterPlaceId={filterPlaceId} setFilterPlaceId={onSetFilterPlaceId}
      />

      <ReportTable report={report}/>

      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Report;