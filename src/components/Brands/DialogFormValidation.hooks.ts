import produce from "immer";
import {fieldRequired} from "../Form";
import {FormData} from "./types";
import React from "react";
import {Brand} from "../../schemas/base";
import {generate_url} from "../../utilite";

interface UseFormValidation {
  (
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    isAddMode: boolean,
    brands: Brand[],
    selectedBrand: Brand | null,
  ):
    [
      onNameFieldChange: (title: string) => void,
      onTitleFieldChange: (title: string) => void,
      onTitleUaFieldChange: (title: string) => void,
      onDescFieldChange: (desc: string) => void,
      onDescUaFieldChange: (desc: string) => void,
      onUrlFieldChange: (url: string) => void,
      onActiveChange: (active: boolean) => void,
      onFileChange: (file: File | null) => void,
      checkForm: () => boolean
    ]
}


export const useFormValidation: UseFormValidation = (formData, setFormData, isAddMode, brands, selectedBrand) => {
  const isBrand = (brand: Brand | null): brand is Brand => !isAddMode
  const onNameFieldChange = (name: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.name.value = name
      prevFormData.name.error = fieldRequired(name)
    }))
  }
  const onTitleFieldChange = (title: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.title.value = title
      prevFormData.title.error = fieldRequired(title)
    }))
  }

  const onTitleUaFieldChange = (title: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.titleUa.value = title
      prevFormData.titleUa.error = fieldRequired(title)
    }))
  }

  const onDescFieldChange = (desc: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.desc = desc
    }))
  }

  const onDescUaFieldChange = (desc: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.descUa = desc
    }))
  }
  const onUrlFieldChange = (url: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.url.value = generate_url(url)
      prevFormData.url.error = fieldRequired(url)
    }))
  }
  const onActiveChange = (active: boolean) => {
    setFormData(produce(prevFormData => {
      prevFormData.active = active
    }))
  }
  const onFileChange = (file: File | null) => {
    setFormData(produce(prevFormData => {
      prevFormData.file = file
    }))
  }
  const brandsWithoutSelf = isBrand(selectedBrand)
    ? brands.filter(brand => brand.id !== selectedBrand.id)
    : brands
  const urlExist = (url: string) => brandsWithoutSelf.find(brand => brand.url === url.trim())

  const checkForm = () => {
    if (fieldRequired(formData.name.value) || fieldRequired(formData.title.value) ||
      fieldRequired(formData.titleUa.value) || fieldRequired(formData.url.value)) {
      setFormData(produce(prevFormData => {
        prevFormData.name.error = fieldRequired(formData.name.value)
        prevFormData.title.error = fieldRequired(formData.title.value)
        prevFormData.titleUa.error = fieldRequired(formData.titleUa.value)
        prevFormData.url.error = fieldRequired(formData.url.value)
      }))
      return false
    } else if (urlExist(formData.url.value)) {
      setFormData(produce(prevFormData => {
        prevFormData.url.error = 'same url is exist'
      }))
      return false
    }
    return true
  }


  return [
    onNameFieldChange, onTitleFieldChange, onTitleUaFieldChange, onDescFieldChange, onDescUaFieldChange,
    onUrlFieldChange, onActiveChange, onFileChange, checkForm
  ]
}
