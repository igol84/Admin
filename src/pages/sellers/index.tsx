import React, {useEffect} from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {fetchSellers} from "../../store/actions/sellers";


const Sellers = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  const access_token = useAppSelector(state => state.authReducer.access_token)
  const {loading, sellers} = useAppSelector(state => state.sellersReducer)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSellers(access_token))
    } else {
      navigate('/auth')
    }
  }, [dispatch])
  if (!isAuthenticated) {
    return null
  }

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title='Sellers' subTitle='Sellers page'/>
        <Box hidden={!loading}>
          Loading...
        </Box>
      </Box>

      <Box>
        {sellers.map(seller => (
          <Box>{seller.name}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sellers;