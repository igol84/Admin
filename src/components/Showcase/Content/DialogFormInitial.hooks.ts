import {FormData} from "./types";
import React, {useLayoutEffect, useState} from "react";
import {Showcase} from "../../../schemas/base";
import _ from "lodash";
import {useFetchAccess} from "../../../hooks/pages";
import {fetchColors} from "../../../store/actions/showcase";


interface UseFormInitial {
  (
    selectedShowcaseItem: Showcase | null,
    isAddMode: boolean,
    productsNames: string[]
  ):
    [
      formData: FormData,
      setFormData: React.Dispatch<React.SetStateAction<FormData>>,
      resetFormData: () => void,
      itemsNames: string[]
    ]
}

export const useFormInitial: UseFormInitial = (selectedShowcaseItem, isAddMode, productsNames) => {

  const isShowcase = (showcaseItem: Showcase | null): showcaseItem is Showcase => !isAddMode
  const initialFormData: FormData = {
    name: {value: '', error: ''}, color: '', brand_id: null, title: {value: '', error: ''}, titleUa: {value: '', error: ''},
    desc: '', descUa: '', active: true, url: {value: '', error: ''},  files: undefined
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const resetFormData = () => {
    setFormData(initialFormData)
  }
  const fetchColorsAccess = useFetchAccess(fetchColors)
  useLayoutEffect(() => {
    fetchColorsAccess(formData.name.value)
  }, [formData.name.value])
  useLayoutEffect(() => {
    const changedFormData: FormData = !isShowcase(selectedShowcaseItem) ? initialFormData : {
      name: {value: selectedShowcaseItem.name, error: ''},
      color: selectedShowcaseItem.color,
      brand_id: selectedShowcaseItem.brand_id,
      title: {value: selectedShowcaseItem.title, error: ''},
      titleUa: {value: selectedShowcaseItem.title_ua, error: ''},
      desc: selectedShowcaseItem.desc,
      descUa: selectedShowcaseItem.desc_ua,
      url: {value: selectedShowcaseItem.url, error: ''},
      active: selectedShowcaseItem.active,
      files: undefined,
    }
    setFormData(changedFormData)
  }, [selectedShowcaseItem])
  const itemsNames = isShowcase(selectedShowcaseItem)
    ? ["", selectedShowcaseItem.name, ...productsNames]
    : _.orderBy(_.uniq([formData.name.value, ...productsNames]), value => value.toLowerCase())
  return [formData, setFormData, resetFormData, itemsNames]
}