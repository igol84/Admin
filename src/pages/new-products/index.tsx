import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import Header from "../../components/Header";
import AddNewProductForm from "../../components/new-products/AddNewProductForm";
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {useDictionary} from "../../hooks/pages";


const NewProducts = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  const d = useDictionary('newProducts')
  useEffect(() => {
    if (!isAuthenticated)
      navigate('/auth')
  }, [isAuthenticated])
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <AddNewProductForm/>
    </Box>
  );
};

export default NewProducts;