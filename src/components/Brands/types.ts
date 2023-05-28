import {Field} from "../Form/types";
import {CreateBrand} from "../../schemas/brand";


export interface FormData{
  id: number
  name: Field<string>
  title: Field<string>
  titleUa: Field<string>
  desc: string
  descUa: string
  url: Field<string>
  active: boolean
  file: File | null
}

export const convertFromFormDataToBrand = (formData: FormData) : CreateBrand => {
  return {
    brand: {
      id: formData.id,
      name: formData.name.value,
      title: formData.title.value,
      title_ua: formData.titleUa.value,
      desc: formData.desc,
      desc_ua: formData.descUa,
      url: formData.url.value,
      active: formData.active,
    },
    file: formData.file
  }
}