import React from 'react'
import {Box} from "@mui/material";
import {Showcase} from "../../../schemas/base";

interface ShowcaseItemProps {
  showcaseItem: Showcase
  onClickShowcase: (showcase: Showcase)=>void
}

const ShowcaseItem = ({showcaseItem, onClickShowcase}: ShowcaseItemProps) => {
  const onClick = () => onClickShowcase(showcaseItem)
  return (
    <Box onClick={onClick}>
      {showcaseItem.name}
    </Box>
  )
}

export default ShowcaseItem