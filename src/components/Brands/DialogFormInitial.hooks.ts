import {FormData} from "./types";
import React, {useLayoutEffect, useState} from "react";
import {Brand} from "../../schemas/base";


interface UseFormInitial {
  (
    selectedBrand: Brand | null,
    isAddMode: boolean,
  ):
    [
      formData: FormData,
      setFormData: React.Dispatch<React.SetStateAction<FormData>>,
      resetFormData: () => void,
    ]
}

export const useFormInitial: UseFormInitial = (selectedBrand, isAddMode) => {

  const isBrand = (brand: Brand | null): brand is Brand => !isAddMode
  const initialFormData: FormData = {
    id: 0, name: {value: '', error: ''}, title: {value: '', error: ''}, titleUa: {value: '', error: ''}, desc: '',
    descUa: '', active: true, url: {value: '', error: ''}, file: null
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const resetFormData = () => {
    setFormData(initialFormData)
  }
  useLayoutEffect(() => {
    const changedFormData: FormData = !isBrand(selectedBrand) ? initialFormData : {
      id: selectedBrand.id,
      name: {value: selectedBrand.name, error: ''},
      title: {value: selectedBrand.title, error: ''},
      titleUa: {value: selectedBrand.title_ua, error: ''},
      desc: selectedBrand.desc,
      descUa: selectedBrand.desc_ua,
      url: {value: selectedBrand.url, error: ''},
      active: selectedBrand.active,
      file: null
    }
    setFormData(changedFormData)
  }, [selectedBrand])
  return [formData, setFormData, resetFormData]
}