import {FormData} from "./types";
import React, {useLayoutEffect, useState} from "react";
import {Showcase} from "../../../schemas/base";
import _ from "lodash";


interface UseFormInitial {
  (
    showcase: Showcase[],
    showcaseItem: Showcase | null,
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

export const useFormInitial: UseFormInitial = (showcase, showcaseItem, isAddMode, productsNames) => {

  const isShowcase = (showcaseItem: Showcase | null): showcaseItem is Showcase => !isAddMode
  const initialFormData: FormData = {
    name: {value: '', error: ''}, title: {value: '', error: ''}, desc: '', url: {value: '', error: ''}, files: undefined
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const resetFormData = () => {
    setFormData(initialFormData)
  }
  useLayoutEffect(() => {
    const changedFormData: FormData = !isShowcase(showcaseItem) ? initialFormData : {
      name: {value: showcaseItem.name, error: ''},
      title: {value: showcaseItem.title, error: ''},
      desc: showcaseItem.desc,
      url: {value: showcaseItem.url, error: ''},
      files: undefined
    }
    setFormData(changedFormData)
  }, [showcaseItem])
  const itemsNames = isShowcase(showcaseItem)
    ? ["", showcaseItem.name, ...productsNames]
    : _.orderBy(_.uniq([formData.name.value, ...productsNames]), value => value.toLowerCase())
  return [formData, setFormData, resetFormData, itemsNames]
}