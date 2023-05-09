import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector, useStoreId} from "../../hooks/redux";
import {useDictionaryTranslate, useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchReport, getReport} from "../../store/actions/report";
import {Box, Tab, Tabs} from "@mui/material";
import TableRowsIcon from '@mui/icons-material/TableRows';
import BarChartIcon from '@mui/icons-material/BarChart';
import Form from "./Form";
import LoadingCircular from "../LoadingCircular";
import {Interval} from "../../schemas/report";
import {useTabStyle} from "./style";
import ReportTable from "./ReportTable";
import ReportChart from "./ReportChart";

const Report = () => {
  const d = useDictionaryTranslate('report')
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

  const showLoading = useIsLoadingDisplay(isLoading)
  const [page, setPage] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(newValue);
  };
  const tabStyle = useTabStyle()


  return (
    <Box>
      <Form
        places={placesView} interval={interval} setInterval={onSetInterval}
        filterPlaceId={filterPlaceId} setFilterPlaceId={onSetFilterPlaceId}
      />
      <Tabs value={page} onChange={handleChange} aria-label="icon tabs" sx={tabStyle}>
        <Tab icon={<TableRowsIcon/>} aria-label={d('table')}/>
        <Tab icon={<BarChartIcon/>} aria-label={d('chart')}/>
      </Tabs>
      {report.length &&
        (page === 0 ? <ReportTable data={report}/>
          : <ReportChart data={report}/>)
      }

      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Report;