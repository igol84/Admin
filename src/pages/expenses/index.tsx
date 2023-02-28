import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import {useDictionary} from "../../hooks/pages";
import TableExpense from "../../components/expense/TableExpense";


const Expenses = () => {
  const d = useDictionary('expense')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <TableExpense/>
    </Box>
  );
};

export default Expenses;