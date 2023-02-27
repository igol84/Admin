import {useDictionary} from "../../hooks/pages";
import _ from "lodash";
import {Box} from "@mui/material";
import React from "react";

interface ExpenseDetailType {
  role: string | null
  sales: number
}

const ExpenseDetail = (props: ExpenseDetailType) => {
  const d = useDictionary('expenses')
  const {role, sales} = props
  const textDetails = _.compact([role, sales ? `${d['orders']}: ${sales}` : null]).join(', ')
  return (
    <Box>
      {textDetails}
    </Box>
  )
}

export default ExpenseDetail