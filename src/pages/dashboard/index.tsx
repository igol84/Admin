import React, {useContext, useEffect} from 'react';
import Header from "../../components/Header";
import {Box, Button} from "@mui/material";
import {LanguageModeContext} from "../../language";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {fetchSellers} from "../../store/actions/sellers";
import {invokeIf} from "../../utilite";


const Dashboard = () => {
  const {dictionary} = useContext(LanguageModeContext)
  const d = dictionary['dash']
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  const access_token = useAppSelector(state => state.authReducer.access_token)
  const {sellers} = useAppSelector(state => state.sellersReducer)
  const fetchF = () => dispatch(fetchSellers(access_token))
  useEffect(() => {
    invokeIf(isAuthenticated, () => fetchF(), () => navigate('/auth'))
  }, [])
  const onClick = () => {
    fetchF()
  }
  return (
    <Box m='20px'>
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