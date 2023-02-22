import {useDictionary} from "../../hooks/pages";
import _ from "lodash";
import {Box} from "@mui/material";
import React from "react";

interface SellerDetailType {
  role: string | null
  sales: number
}

const SellerDetail = (props: SellerDetailType) => {
  const d = useDictionary('sellers')
  const {role, sales} = props
  const textDetails = _.compact([role, sales ? `${d['orders']}: ${sales}` : null]).join(', ')
  return (
    <Box>
      {textDetails}
    </Box>
  )
}

export default SellerDetail