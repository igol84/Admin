import produce from "immer";
import {fieldRequired} from "../../Form";
import {FormData} from "./types";
import React from "react";
import {Showcase} from "../../../schemas/base";

interface UseFormValidation {
  (
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    isAddMode: boolean,
    showcase: Showcase[],
    showcaseItem: Showcase | null,
  ):
    [
      onNameFieldChange: (title: string) => void,
      onTitleFieldChange: (title: string) => void,
      onDescFieldChange: (desc: string) => void,
      onUrlFieldChange: (url: string) => void,
      checkForm: () => boolean
    ]
}


export const useFormValidation: UseFormValidation = (formData, setFormData, isAddMode, showcase, showcaseItem) => {
  const isShowcase = (showcaseItem: Showcase | null): showcaseItem is Showcase => !isAddMode
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

  const onDescFieldChange = (desc: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.desc = desc
    }))
  }

  const onUrlFieldChange = (url: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.url.value = url
      prevFormData.url.error = fieldRequired(url)
    }))
  }

  const showcaseWithoutSelf = isShowcase(showcaseItem)
    ? showcase.filter(item => item.name != showcaseItem.name)
    : showcase
  const urlExist = (url: string) => showcaseWithoutSelf.find(item => item.url === url.trim())

  const checkForm = () => {
    if (fieldRequired(formData.name.value) || fieldRequired(formData.title.value) || fieldRequired(formData.url.value)) {
      setFormData(produce(prevFormData => {
        prevFormData.name.error = fieldRequired(formData.name.value)
        prevFormData.title.error = fieldRequired(formData.title.value)
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


  return [onNameFieldChange, onTitleFieldChange, onDescFieldChange, onUrlFieldChange, checkForm]
}
