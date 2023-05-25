import React from 'react'
import {IconButton, ImageListItem, ImageListItemBar} from "@mui/material";
import {Showcase, ShowcaseWithImages} from "../../../schemas/base";
import {generate_url, makeId} from "../../../utilite";
import EditIcon from '@mui/icons-material/Edit';

interface ShowcaseItemProps {
  showcaseItem: ShowcaseWithImages
  onClickShowcase: (showcase: Showcase) => void
}

const ShowcaseItem = ({showcaseItem, onClickShowcase}: ShowcaseItemProps) => {
  const hostPictures = import.meta.env.VITE_PICTURES_URL
  const dirName = generate_url(showcaseItem.name)

  const imageUrlSmall = `${hostPictures}/${dirName}/01.jpg}`
  const imageUrlBig = `${hostPictures}/${dirName}/02.jpg?${makeId(5)}`
  const imageUrlDef = `${hostPictures}/def.jpg?${makeId(5)}`

  const imgUrl = showcaseItem.images.includes('02.jpg') ? imageUrlBig : imageUrlDef
  console.log(imgUrl)
  const imgUrlSmall = showcaseItem.images.includes('01.jpg') ? imageUrlSmall : imageUrlDef
  const onClick = () => onClickShowcase(showcaseItem)
  return (
    <ImageListItem>
      <img
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