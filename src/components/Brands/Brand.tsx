import React from 'react';
import {IconButton, ImageListItem, ImageListItemBar} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {makeId} from "../../utilite";

interface BrandProps {
  id: number
  name: string
  title: string
  img: string
  onSelectBrand: (brandId: number) => void
}

const Brand = ({id, name, title, img, onSelectBrand}: BrandProps) => {
  const hostPictures = import.meta.env.VITE_BRANDS_URL
  const imageUrl = `${hostPictures}/${img}?t=${makeId(5)}`
  const onClick = () => onSelectBrand(id)
  return (
    <ImageListItem>
      <img
        title='asddas'
        src={imageUrl}
        alt={name}
      />
      <ImageListItemBar
        title={title}
        actionIcon={
          <IconButton
            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
            aria-label={`info about ${title}`}
            onClick={onClick}
          >
            <EditIcon/>
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

export default Brand;