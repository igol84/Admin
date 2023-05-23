import React, {useState} from 'react';
import {Box} from "@mui/material";
import AddNew from "./AddNew";
import {useAppSelector} from "../../../hooks/redux";
import {useIsLoadingDisplay} from "../../../hooks/pages";
import LoadingCircular from "../../LoadingCircular";
import DialogForm from "./DialogForm";
import {Showcase} from "../../../schemas/base";
import ShowcaseItem from "./ShowcaseItem";

const Content = () => {
  const {isLoading, showcase} = useAppSelector(state => state.showcaseSlice)
  const showLoading = useIsLoadingDisplay(isLoading)
  const [open, setOpen] = useState(false)
  const [selectedShowcase, setSelectedShowcase] = useState<Showcase | null>(null)
  const onCloseDialog = () => {
    setOpen(false)
  }
  const onClickAddShowcase = () =>{
    setOpen(true)
    setSelectedShowcase(null)
  }
  const onClickShowcase = (showcase: Showcase) =>{
    setOpen(true)
    setSelectedShowcase(showcase)
  }

  return (
    <Box>
      <AddNew onOpenDialog={onClickAddShowcase}/>
      {showcase.map(showcaseItem => {
        return (
          <ShowcaseItem key={showcaseItem.name} showcaseItem={showcaseItem} onClickShowcase={onClickShowcase}/>
        )
      })}
      <DialogForm open={open} onCloseDialog={onCloseDialog} showcaseItem={selectedShowcase}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Content;