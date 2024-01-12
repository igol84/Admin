import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../schemas/base";


interface NewProductState {
  products: Product[]
  isLoading: boolean
  error: string
}

const initialState: NewProductState = {
  products: [],
  isLoading: false,
  error: ''
}

export interface ProductsPayload {
  products: Product[]
}

export interface NewProductPayload {
  products: Product[]
}

export const newProductsSlice = createSlice({
  name: 'NewProducts',
  initialState,
  reducers: {
    requestProducts(state) {
      state.isLoading = true
    },
    requestProductsSuccess(state, action: PayloadAction<ProductsPayload>) {
      state.products = action.payload.products
      state.isLoading = false
      state.error = ''
    },
    requestProductsError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    newProductsFetching(state) {
      state.isLoading = true
    },
    newProductsFetchingSuccess(state, action: PayloadAction<NewProductPayload>) {
      const newProducts: Product[] = action.payload.products
      state.products.unshift(...newProducts)
      state.isLoading = false
      state.error = ''
    },
    newProductsFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewNewProduct(state) {
      state.isLoading = false
      state.error = ''
    },
  }
})

export default newProductsSlice.reducer