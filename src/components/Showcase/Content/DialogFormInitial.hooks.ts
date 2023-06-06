import {FormData} from "./types";
import React, {useLayoutEffect, useState} from "react";
import {Showcase} from "../../../schemas/base";
import {NameAndColors} from "../../../schemas/showcase";
import produce from "immer";



interface UseFormInitial {
  (
    showcase: Showcase[],
    namesAndColors: NameAndColors[],
    selectedShowcaseItem: Showcase | null,
  ):
    [
      formData: FormData,
      setFormData: React.Dispatch<React.SetStateAction<FormData>>,
      resetFormData: () => void,
      itemsNames: string[],
      itemsColors: string[]
    ]
}

export const useFormInitial: UseFormInitial = (showcase, namesAndColors, selectedShowcaseItem) => {
  const isAddMode = selectedShowcaseItem === null
  const isShowcase = (showcaseItem: Showcase | null): showcaseItem is Showcase => !isAddMode
  const initialFormData: FormData = {
    name: {value: '', error: ''}, color: {value: '', error: ''}, brand_id: null, title: {value: '', error: ''},
    titleUa: {value: '', error: ''}, desc: '', descUa: '', active: true, url: {value: '', error: ''},
    youtube: {value: '', error: ''}, files: undefined
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const resetFormData = () => {
    setFormData(initialFormData)
  }
  useLayoutEffect(() => {
    const changedFormData: FormData = !isShowcase(selectedShowcaseItem) ? initialFormData : {
      name: {value: selectedShowcaseItem.name, error: ''},
      color: {value: selectedShowcaseItem.color, error: ''},
      brand_id: selectedShowcaseItem.brand_id,
      title: {value: selectedShowcaseItem.title, error: ''},
      titleUa: {value: selectedShowcaseItem.title_ua, error: ''},
      desc: selectedShowcaseItem.desc,
      descUa: selectedShowcaseItem.desc_ua,
      url: {value: selectedShowcaseItem.url, error: ''},
      youtube: {value: selectedShowcaseItem.youtube, error: ''},
      active: selectedShowcaseItem.active,
      files: undefined,
    }
    setFormData(changedFormData)
  }, [selectedShowcaseItem])



  const itemsColors: string[] = []
  const itemsNames: string[] = ['']
  if (isAddMode) {
    namesAndColors.forEach(nameAndColors => {
      if (nameAndColors.shoes) {
        let colors = [...nameAndColors.shoes.colors]
        showcase.forEach(item => {
          if (item.name === nameAndColors.name && colors.includes(item.color)) {
            colors = colors.filter(color => color !== item.color)
          }
        })
        if (colors.length > 0) {
          itemsNames.push(nameAndColors.name)
          if (formData.name.value === nameAndColors.name) {
            itemsColors.unshift(...colors)

          }
        }
      } else {
        if (!showcase.find(item => item.name === nameAndColors.name)) {
          itemsNames.push(nameAndColors.name)
        }
      }
    })
  } else {
    const foundNameAndColors = namesAndColors.find(nameAndColors => nameAndColors.name === selectedShowcaseItem.name)
    if (foundNameAndColors && foundNameAndColors.shoes) {
      itemsColors.unshift(...foundNameAndColors.shoes.colors)
    }
    itemsNames.push(selectedShowcaseItem.name)
    itemsColors.push(selectedShowcaseItem.color)

  }
  useLayoutEffect(() => {
    if(isAddMode && itemsColors.length)
      setFormData(produce(formData, draftData => {
        draftData.color.value = itemsColors[0]
        }))
  }, [formData.name.value])
  return [formData, setFormData, resetFormData, itemsNames, itemsColors]
}