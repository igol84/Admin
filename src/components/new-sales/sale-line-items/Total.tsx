import React from 'react'
import {Box} from "@mui/material";
import {ViewTotal} from "./types";
import {useDictionaryTranslate} from "../../../hooks/pages";

interface TotalProps {
  viewTotal: ViewTotal
}

const Total = ({viewTotal}: TotalProps) => {
  const {proceeds, income} = viewTotal
  const d = useDictionaryTranslate('NewSales')
  return (
    <Box>
      <Box>
        {d('Proceeds')}: {proceeds}
      </Box>
      <Box>
        {d('Income')}: {income}
      </Box>
    </Box>
  )
}

export default Total