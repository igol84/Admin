import React from 'react';
import {ShowcaseWithImages} from "../../../schemas/base";
import {generate_url, makeId} from "../../../utilite";
import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import DeleteButton from "../../Form/DeleteButton";
import {DelImgShowcase} from "../../../schemas/showcase";

interface DialogFormImagesProps {
  selectedShowcaseItem: ShowcaseWithImages
  onClickDelImg: (delImgShowcase: DelImgShowcase) => Promise<void>
}

const DialogFormImages = ({selectedShowcaseItem, onClickDelImg}: DialogFormImagesProps) => {
  return (
    <ImageList cols={9} gap={8}>
      {selectedShowcaseItem.images.map(imgName => {
        const hostPictures = import.meta.env.VITE_PICTURES_URL
        const dirNameProps = [selectedShowcaseItem.name]
        if (selectedShowcaseItem.color) {
          dirNameProps.push(selectedShowcaseItem.color)
        }
        const dirName = generate_url(dirNameProps.join('-'))
        const fullImgUrl = `${hostPictures}/${dirName}/${imgName}?${makeId(5)}`
        const delImgShowcase: DelImgShowcase = {
          nameItem: selectedShowcaseItem.name, colorItem: selectedShowcaseItem.color, dirName, imgName
        }
        return (
          <ImageListItem key={imgName}>
            <img src={fullImgUrl} alt={selectedShowcaseItem.title}/>
            <ImageListItemBar title={imgName} actionIcon={
              <DeleteButton deletable={true} onRemove={() => onClickDelImg(delImgShowcase)}/>
            }
            />
          </ImageListItem>
        )
      })}
    </ImageList>
  );
};

export default DialogFormImages;