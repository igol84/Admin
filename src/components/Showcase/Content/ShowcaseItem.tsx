import React from 'react'
import {IconButton, ImageListItem, ImageListItemBar} from "@mui/material";
import {Showcase} from "../../../schemas/base";
import {makeId} from "../../../utilite";
import EditIcon from '@mui/icons-material/Edit';

interface ShowcaseItemProps {
  showcaseItem: Showcase
  onClickShowcaseName: (key: string) => void
}

const ShowcaseItem = ({showcaseItem, onClickShowcaseName}: ShowcaseItemProps) => {
  const hostPictures = import.meta.env.VITE_PICTURES_URL
  const dirName = showcaseItem.key
  const imageUrlSmall = `${hostPictures}/${dirName}/01.jpg`
  const imageUrlBig = `${hostPictures}/${dirName}/02.jpg?t=${makeId(5)}`
  const imageUrlDef = `${hostPictures}/def.jpg`

  const imgUrl = showcaseItem.images.find(dir => dir.image === '02.jpg') ? imageUrlBig : imageUrlDef
  const imgUrlSmall = showcaseItem.images.find(dir => dir.image === '01.jpg') ? imageUrlSmall : imageUrlDef
  const onClick = () => {
    onClickShowcaseName(showcaseItem.key)
  }
  return (
    <ImageListItem>
      <img
        title={showcaseItem.title}
        src={imgUrlSmall}
        srcSet={imgUrl}
        alt={showcaseItem.title}
        loading="lazy"
      />
      <ImageListItemBar
        title={showcaseItem.title}
        actionIcon={
          <IconButton
            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
            aria-label={`info about ${showcaseItem.title}`}
            onClick={onClick}
          >
            <EditIcon/>
          </IconButton>
        }
      />
    </ImageListItem>
  )
}

export default ShowcaseItem