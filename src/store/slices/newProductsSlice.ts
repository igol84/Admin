import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface NewProductState {
  isLoading: boolean
  error: string
}

const initialState: NewProductState = {
  isLoading: false,
  error: ''
}


export const newProductsSlice = createSlice({
  name: 'NewProducts',
  initialState,
  reducers: {
    NewProductsFetching(state) {
      state.isLoading = true
    },
    NewProductsFetchingSuccess(state) {
      state.isLoading = false
      state.error = ''
    },
    NewProductsFetchingError(state, action: PayloadAction<Error>) {
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