import React from 'react'
import {IconButton, ImageListItem, ImageListItemBar} from "@mui/material";
import {ShowcaseIDs, ShowcaseWithImages} from "../../../schemas/base";
import {generate_url, makeId} from "../../../utilite";
import EditIcon from '@mui/icons-material/Edit';

interface ShowcaseItemProps {
  showcaseItem: ShowcaseWithImages
  onClickShowcaseName: (showcaseIDs: ShowcaseIDs) => void
}

const ShowcaseItem = ({showcaseItem, onClickShowcaseName}: ShowcaseItemProps) => {
  const hostPictures = import.meta.env.VITE_PICTURES_URL
  const dirName = generate_url(showcaseItem.name)

  const imageUrlSmall = `${hostPictures}/${dirName}/01.jpg`
  const imageUrlBig = `${hostPictures}/${dirName}/02.jpg?t=${makeId(5)}`
  const imageUrlDef = `${hostPictures}/def.jpg`

  const imgUrl = showcaseItem.images.includes('02.jpg') ? imageUrlBig : imageUrlDef
  const imgUrlSmall = showcaseItem.images.includes('01.jpg') ? imageUrlSmall : imageUrlDef
  const onClick = () => {
    const showcaseIDs: ShowcaseIDs = {name: showcaseItem.name, color: showcaseItem.color}
    onClickShowcaseName(showcaseIDs)
  }
  return (
    <ImageListItem>
      <img
        title='asddas'
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