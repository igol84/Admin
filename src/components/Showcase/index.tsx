import React from 'react'
import {Box} from "@mui/material";
import Filters from "./Filters";
import Content from "./Content";
import {useLoaderAccess} from "../../hooks/pages";
import {fetchItems} from "../../store/actions/showcase";
import {useStyle} from "./style";

const Showcase = () => {
  const style = useStyle()
  useLoaderAccess(fetchItems)
  return (
    <Box sx={style}>
      <Filters/>
      <Content/>
    </Box>
  )
}

export default Showcase