import React from 'react';
import {Showcase, ShowcaseImage} from "../../../schemas/base";
import {makeId} from "../../../utilite";
import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import DeleteButton from "../../Form/DeleteButton";

interface DialogFormImagesProps {
  selectedShowcaseItem: Showcase
  onClickDelImg: (delImgShowcase: ShowcaseImage) => Promise<void>
}

const DialogFormImages = ({selectedShowcaseItem, onClickDelImg}: DialogFormImagesProps) => {
  return (
    <ImageList cols={9} gap={8}>
      {selectedShowcaseItem.images.map(dirRow => {
        const hostPictures = import.meta.env.VITE_PICTURES_URL
        const dirName = dirRow.dir
        const fullImgUrl = `${hostPictures}/${dirName}/${dirRow.image}?${makeId(5)}`
        return (
          <ImageListItem key={dirRow.image}>
            <img src={fullImgUrl} alt={selectedShowcaseItem.title}/>
            <ImageListItemBar title={dirRow.image} actionIcon={
              <DeleteButton deletable={true} onRemove={() => onClickDelImg(dirRow)}/>
            }
            />
          </ImageListItem>
        )
      })}
    </ImageList>
  );
};

export default DialogFormImages;