import React, {useEffect} from 'react';
import Header from "../../components/Header";
import {Box, Button} from "@mui/material";
import {useAppDispatch, useAppSelector, useStoreId} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {fetchSellers} from "../../store/actions/sellers";
import {invokeIf} from "../../utilite";
import {useDictionary} from "../../hooks/pages";


const Dashboard = () => {
  const d = useDictionary('dash')
  const storeId = useStoreId()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  const access_token = useAppSelector(state => state.authReducer.access_token)
  const {sellers} = useAppSelector(state => state.sellersReducer)
  const fetchF = () => dispatch(fetchSellers(access_token, {storeId}))
  useEffect(() => {
    invokeIf(isAuthenticated, () => fetchF(), () => navigate('/auth'))
  }, [])
  const onClick = () => {
    fetchF()
  }
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title={d['title']} subTitle={d['subTitle']}/>
      </Box>
      <Button color='secondary' variant="contained" onClick={onClick}>
        ok
      </Button>
    </Box>
  );
};

export default Dashboard;