import {useDictionary} from "../../hooks/pages";
import _ from "lodash";
import {Box} from "@mui/material";
import React from "react";

interface PlaceDetailType {
  role: string | null
  sales: number
  expenses: number
}

const PlaceDetail = (props: PlaceDetailType) => {
  const d = useDictionary('places')
  const {role, sales, expenses} = props
  const salesText = sales ? `${d['orders']}: ${sales}` : null
  const expensesText = expenses ? `${d['expenses']}: ${expenses}` : null
  const textDetails = _.compact([role, salesText, expensesText]).join(', ')
  return (
    <Box>
      {textDetails}
    </Box>
  )
}

export default PlaceDetail