import React, {useState} from 'react';
import {Box, ImageList} from "@mui/material";
import AddNew from "./AddNew";
import {useAppSelector} from "../../../hooks/redux";
import {useIsLoadingDisplay} from "../../../hooks/pages";
import LoadingCircular from "../../LoadingCircular";
import DialogForm from "./DialogForm";
import ShowcaseItem from "./ShowcaseItem";
import {ShowcaseFilters} from "../index";


interface ContentProps {
  showcaseFilters: ShowcaseFilters
}

const Content = ({showcaseFilters}: ContentProps) => {
  const {isLoading, showcase} = useAppSelector(state => state.showcaseSlice)
  const filteredByBrandShowcase = showcaseFilters.brandId !== null
    ? showcase.filter(item => item.brand_id === showcaseFilters.brandId)
    : showcase
  const filteredByNameShowcase = showcaseFilters.name !== null
    ? showcase.filter(item => item.name === showcaseFilters.name)
    : filteredByBrandShowcase
  const showLoading = useIsLoadingDisplay(isLoading)
  const [open, setOpen] = useState(false)
  const [selectedShowcaseKey, setSelectedShowcaseKey] = useState<string | null>(null)
  const onCloseDialog = () => {
    setOpen(false)
    setSelectedShowcaseKey(null)
  }
  const onClickAddShowcase = () => {
    setOpen(true)
    setSelectedShowcaseKey(null)
  }
  const onClickShowcase = (key: string) => {
    setOpen(true)
    setSelectedShowcaseKey(key)
  }
  const selectedShowcase = filteredByNameShowcase.find(item =>
    item.key === selectedShowcaseKey
  )
  return (
    <Box>
      <AddNew onOpenDialog={onClickAddShowcase}/>
      <ImageList cols={6} gap={8}>
        {filteredByNameShowcase.map((showcaseItem) => {
          const key = showcaseItem.key
          return <ShowcaseItem key={key} showcaseItem={showcaseItem} onClickShowcaseName={onClickShowcase}/>
        })}
      </ImageList>

      <DialogForm open={open} onCloseDialog={onCloseDialog}
                  selectedShowcaseItem={selectedShowcase ? selectedShowcase : null}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Content;