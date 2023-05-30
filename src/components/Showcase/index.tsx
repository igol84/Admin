import React, {useState} from 'react'
import {Box} from "@mui/material";
import Filters from "./Filters";
import Content from "./Content";
import {useLoaderAccess} from "../../hooks/pages";
import {fetchItems} from "../../store/actions/showcase";
import {useStyle} from "./style";


export interface ShowcaseFilters{
  brandId: number | null
  name: string | null
}

const Showcase = () => {
  const style = useStyle()
  useLoaderAccess(fetchItems)
  const [showcaseFilters, setShowcaseFilters] = useState<ShowcaseFilters>({brandId: null, name: null})
  return (
    <Box sx={style}>
      <Filters showcaseFilters={showcaseFilters} setShowcaseFilters={setShowcaseFilters}/>
      <Content showcaseFilters={showcaseFilters}/>
    </Box>
  )
}

export default Showcase