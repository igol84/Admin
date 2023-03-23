import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import sellersReducer from "./slices/sellersSlice"
import placesReducer from "./slices/placesSlice"
import expensesReducer from "./slices/expensesSlice"
import newProductsSlice from "./slices/newProductsSlice"
import itemsEditorSlice from "./slices/itemsEditorSlice"
import productsEditorSlice from "./slices/productsEditorSlice"

const rootReducer = combineReducers({
  authReducer, sellersReducer, placesReducer, expensesReducer, newProductsSlice, itemsEditorSlice, productsEditorSlice
})

export const setupStore = () => configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']