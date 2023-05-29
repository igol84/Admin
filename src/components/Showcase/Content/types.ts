import {Field} from "../../Form/types";
import {CreateShowcase} from "../../../schemas/showcase";


export interface FormData{
  name: Field<string>
  brand_id: number | null
  title: Field<string>
  titleUa: Field<string>
  desc: string
  descUa: string
  url: Field<string>
  active: boolean
  files: File[] | undefined
}

export const convertFromFormDataToShowcase = (formData: FormData) : CreateShowcase => {
  return {
    showcaseItem: {
      name: formData.name.value,
      brand_id: formData.brand_id,
      title: formData.title.value,
      title_ua: formData.titleUa.value,
      desc: formData.desc,
      desc_ua: formData.descUa,
      url: formData.url.value,
      active: formData.active,
      youtube: '',
    },
    files: formData.files
  }
}