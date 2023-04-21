import React from 'react'
import {Box} from "@mui/material";
import {ViewTotal} from "./types";

interface TotalProps{
  viewTotal: ViewTotal
}

const Total = ({viewTotal}: TotalProps) => {
  const {proceeds, income} = viewTotal
  return (
    <Box>
      <Box>
        Proceeds: {proceeds}
      </Box>
      <Box>
        Income: {income}
      </Box>
    </Box>
  )
}

export default Total