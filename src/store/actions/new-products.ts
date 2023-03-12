import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {newProductsSlice} from "../slices/newProductsSlice";
import {NewProducts} from "../../schemas/items";
import {authSlice} from "../slices/authSlice";
import {Product} from "../../schemas/product";




export const requestProducts = (access_token: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(newProductsSlice.actions.RequestProducts())
      const products: Product[] = await secureApi.get(`prod/`).json()
      dispatch(newProductsSlice.actions.RequestProductsSuccess({products}))
    } catch (err) {
      dispatch(newProductsSlice.actions.RequestProductsError(err as Error))
    }
  }
}

export const addNewProducts = (access_token: string, newProducts: NewProducts) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      console.log(newProducts)
      dispatch(newProductsSlice.actions.NewProductsFetching())
      const result = await secureApi.put('handler_receiving_the_item/receiving_the_items', {json: newProducts}).json()
      console.log(result)
      dispatch(newProductsSlice.actions.NewProductsFetchingSuccess())
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        console.log(errorText)
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}
