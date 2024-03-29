import {Field} from "../../Form/types";
import {CreateShowcase} from "../../../schemas/showcase";
import {generate_url} from "../../../utilite";
import {formatISO} from "date-fns";


export interface FormData {
  name: Field<string>
  color: Field<string>
  brand_id: number | null
  title: Field<string>
  titleUa: Field<string>
  desc: string
  descUa: string
  url: Field<string>
  youtube: Field<string>
  active: boolean
  promActive: boolean
  files: File[] | undefined
  date: string
  isNew: boolean
  tags: string
}

export const convertFromFormDataToShowcase = (formData: FormData, key: string | null = null): CreateShowcase => {
  const dirNameProps = [formData.name.value]
  if (formData.color.value) {
    dirNameProps.push(formData.color.value)
  }
  const dirName = generate_url(dirNameProps.join('-'))
  const dir = key ? key : dirName
  const today = formatISO(new Date(), {representation: 'date'})
  return {
    showcaseItem: {
      key: dir,
      name: formData.name.value,
      color: formData.color.value,
      brand_id: formData.brand_id,
      title: formData.title.value,
      title_ua: formData.titleUa.value,
      desc: formData.desc,
      desc_ua: formData.descUa,
      url: formData.url.value,
      active: formData.active,
      prom_active: formData.promActive,
      youtube: formData.youtube.value,
      images: [],
      date: formData.isNew ? today : formData.date,
      tags: formData.tags
    },
    files: formData.files
  }
}
