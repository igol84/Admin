import {Showcase} from "./base";

export interface CreateShowcase{
  showcaseItem: Showcase
  files: File[] | undefined
}

export interface UpdateShowcase{
  showcaseItem: Showcase
  files: File[] | undefined
}

export interface NameAndColors {
  name: string
  shoes: null | Shoes
}

export interface Shoes {
  colors: string[]
}


export interface BrandsNames{
  id: number
  name: string
}