import React from 'react';
import {Box, MenuItem} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";
import {useDictionaryTranslate, useIsLoadingDisplay} from "../../hooks/pages";
import LoadingCircular from "../LoadingCircular";
import {SimpleAutocomplete, SimpleSelect} from "../Form";
import {ShowcaseFilters} from "./index";
import _ from "lodash";

interface FiltersProps {
  showcaseFilters: ShowcaseFilters
  setShowcaseFilters: React.Dispatch<React.SetStateAction<ShowcaseFilters>>
}

const Filters = ({showcaseFilters, setShowcaseFilters}: FiltersProps) => {
  const {brandNames, showcase, isLoading} = useAppSelector(state => state.showcaseSlice)

  const filteredShowcase = showcaseFilters.brandId !== null
    ? showcase.filter(item => item.brand_id === showcaseFilters.brandId)
    : showcase
  let filteredNames = _.uniq(filteredShowcase.map(item => item.name)).sort()
  const showLoading = useIsLoadingDisplay(isLoading)
  const d = useDictionaryTranslate('showcase')
  const brandValue = showcaseFilters.brandId ? showcaseFilters.brandId.toString() : '-1'
  const onBrandFieldChange = (brand: string) => {
    const brandId = brand === '-1' ? null : Number(brand)
    const filter: ShowcaseFilters = {name: null, brandId}
    setShowcaseFilters(filter)
  }
  const onNameFieldChange = (nameValue: string) => {
    const name = nameValue === '' ? null : nameValue
    const filter: ShowcaseFilters = {...showcaseFilters, name}
    setShowcaseFilters(filter)
  }
  const onNameChange = (nameValue: string) => {
    filteredNames = filteredNames.filter(name => name.includes(nameValue))
  }
  return (
    <Box width={400} mb={2} display='flex' gap={1} alignItems='center'>
      {d('filters')}:
      <SimpleSelect name='brand' label={d('brand')} value={brandValue} setValue={onBrandFieldChange}>
        <MenuItem value='-1'>{d('all')}</MenuItem>
        {brandNames.map((brand) => (
          <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
        ))}
      </SimpleSelect>

      <SimpleAutocomplete
        name='name'
        label={d('name')}
        value={showcaseFilters.name ? showcaseFilters.name : ''}
        setValue={onNameChange}
        items={filteredNames}
        setItem={onNameFieldChange}
        blurOnSelect
        focusText
        autoFocus={true}
      />
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default Filters;