import {Showcase} from "./base";

export interface CreateShowcase{
  showcaseItem: Showcase
  files: File[] | undefined
}

export interface UpdateShowcase{
  showcaseItem: Showcase
  files: File[] | undefined
}

export interface DelImgShowcase{
  nameItem: string
  dirName: string
  imgName: string
}