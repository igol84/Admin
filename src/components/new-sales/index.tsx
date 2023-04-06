import React from 'react';
import {Box} from "@mui/material";
import SaleLineItems from "./sale-line-items";
import Items from "./items";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchExpenses} from "../../store/actions/expenses";

const NewSales = () => {
  const storeId = useStoreId()
  useLoaderAccess(fetchExpenses, {storeId})

  const {isLoading, expenses} = useAppSelector(state => state.expensesReducer)
  const showLoading = useIsLoadingDisplay(isLoading)

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <SaleLineItems/>
      <Items/>
    </Box>
  );
};

export default NewSales;