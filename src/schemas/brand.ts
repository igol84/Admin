import {Brand} from "./base";

export interface CreateBrand{
  brand: Brand
  file: File | null
}

export interface UpdateBrand{
  brand: Brand
  file: File | null
}
