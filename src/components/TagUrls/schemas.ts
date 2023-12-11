import * as yup from "yup";

export const tagUrlSchema = yup.object({
  url: yup.string().required(),
  parent: yup.string(),
  order_number: yup.number(),
  search: yup.string(),
  search_ua: yup.string(),
  desc: yup.string(),
  desc_ua: yup.string(),
  text: yup.string(),
  text_ua: yup.string(),
})