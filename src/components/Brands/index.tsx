import React, {useState} from 'react'
import {Box, ImageList} from "@mui/material";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchBrands} from "../../store/actions/brands";
import {useAppSelector} from "../../hooks/redux";
import AddNew from "./AddNew";
import LoadingCircular from "../LoadingCircular";
import DialogForm from "./DialogForm";
import Brand from "./Brand";


const Brands = () => {
  useLoaderAccess(fetchBrands)
  const {isLoading, brands} = useAppSelector(state => state.brandSlice)
  const showLoading = useIsLoadingDisplay(isLoading)
  const [open, setOpen] = useState(false)
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null)
  const onCloseDialog = () => {
    setOpen(false)
    setSelectedBrandId(null)
  }
  const onClickAddBrand = () => {
    setOpen(true)
  }
  const onSelectBrand = (brandId: number) => {
    setOpen(true)
    setSelectedBrandId(brandId)
  }
  const selectedBrand = brands.find(brand => brand.id === selectedBrandId)
  return (
    <Box>
      <AddNew onOpenDialog={onClickAddBrand}/>
      <ImageList cols={6} gap={8}>
        {brands.map(brand => (
          <Brand key={brand.id} id={brand.id} name={brand.name} title={brand.title}
                 img={brand.image ? brand.image : 'def.jpg'} onSelectBrand={onSelectBrand}/>
        ))}
      </ImageList>
      <DialogForm open={open} onCloseDialog={onCloseDialog} selectedBrand={selectedBrand ? selectedBrand : null}/>
      <LoadingCircular show={showLoading}/>
    </Box>
  )
}

export default Brands