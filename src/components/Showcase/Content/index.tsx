import React, {useState} from 'react';
import {Box, ImageList} from "@mui/material";
import AddNew from "./AddNew";
import {useAppSelector} from "../../../hooks/redux";
import {useIsLoadingDisplay} from "../../../hooks/pages";
import LoadingCircular from "../../LoadingCircular";
import DialogForm from "./DialogForm";
import ShowcaseItem from "./ShowcaseItem";

const Content = () => {
  const {isLoading, showcase} = useAppSelector(state => state.showcaseSlice)
  const showLoading = useIsLoadingDisplay(isLoading)
  const [open, setOpen] = useState(false)
  const [selectedShowcaseName, setSelectedShowcaseName] = useState<string | null>(null)
  const onCloseDialog = () => {
    setOpen(false)
    setSelectedShowcaseName(null)
  }
  const onClickAddShowcase = () => {
    setOpen(true)
    setSelectedShowcaseName(null)
  }
  const onClickShowcase = (showcaseName: string) => {
    setOpen(true)
    setSelectedShowcaseName(showcaseName)
  }
  const selectedShowcase = showcase.find(item => item.name === selectedShowcaseName)
  return (
    <Box>
      <AddNew onOpenDialog={onClickAddShowcase}/>
      <ImageList cols={6} gap={8}>
        {showcase.map((showcaseItem) => (
          <ShowcaseItem key={showcaseItem.name} showcaseItem={showcaseItem} onClickShowcaseName={onClickShowcase}/>
        ))}
      </ImageList>

      <DialogForm open={open} onCloseDialog={onCloseDialog}
                  selectedShowcaseItem={selectedShowcase ? selectedShowcase : null}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Content;