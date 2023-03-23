import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ViewProduct, ViewShoes} from "../../components/products-editor/types";


interface ProductsEditor {
  formData: (ViewProduct | ViewShoes)[]
  isLoading: boolean
  error: string
}

const initialState: ProductsEditor = {
  formData: [],
  isLoading: false,
  error: ''
}

export interface ProductsEditorPayload {
  productsEditor:  (ViewProduct | ViewShoes)[]
}


export const productsEditorSlice = createSlice({
  name: 'ProductsEditor',
  initialState,
  reducers: {
    ProductsEditorFetching(state) {
      state.isLoading = true
    },
    ProductsEditorFetchingSuccess(state, action: PayloadAction<ProductsEditorPayload>) {
      state.formData = action.payload.productsEditor
      state.isLoading = false
      state.error = ''
    },
    ProductsEditorFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },


  }
})

export default productsEditorSlice.reducer