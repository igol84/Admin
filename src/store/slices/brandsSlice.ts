import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Brand, BrandWithImage} from "../../schemas/base";


interface brandState {
  brands: BrandWithImage[]
  isLoading: boolean
  error: string
}

const initialState: brandState = {
  brands: [],
  isLoading: false,
  error: ''
}

export interface ItemsPayload {
  brands: BrandWithImage[]
}

interface NewItemPayload {
  newBrand: BrandWithImage
}

interface ChangedItemPayload {
  changedBrand: Brand
  fileName: string | undefined
}

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    brandFetching(state) {
      state.isLoading = true
    },
    brandFetchingSuccess(state, action: PayloadAction<ItemsPayload>) {
      state.brands = action.payload.brands
      state.isLoading = false
      state.error = ''
    },
    brandFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewBrand(state, {payload: {newBrand}}: PayloadAction<NewItemPayload>) {
      state.isLoading = false
      state.brands.unshift(newBrand)
      state.error = ''
    },
    updateBrand(state, {payload: {changedBrand, fileName}}: PayloadAction<ChangedItemPayload>) {
      state.isLoading = false
      state.brands = state.brands.map(brand => {
        return brand.id == changedBrand.id ?  {...changedBrand, image: fileName ? fileName : brand.image} : brand
      })
      state.error = ''
    },
    delBrand(state, {payload: idBrand}: PayloadAction<number>) {
      state.isLoading = false
      state.brands = state.brands.filter(brand => {
        return brand.id !== idBrand
      })
      state.error = ''
    },

  }
})

export default brandSlice.reducer