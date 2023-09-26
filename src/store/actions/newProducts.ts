import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {newProductsSlice} from "../slices/newProductsSlice";
import {NewProduct} from "../../components/new-products/newProduct";
import {authSlice} from "../slices/authSlice";
import {OutputItems} from "../../schemas/new-product";
import {Product} from "../../schemas/base";


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

export const addNewProducts = (access_token: string, newProducts: NewProduct) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(newProductsSlice.actions.NewProductsFetching())
      const outputItems: OutputItems = await secureApi.put('handler_receiving_the_item/receiving_the_items',
        {json: newProducts}).json()
      const products = outputItems.products ? outputItems.products : []
      dispatch(newProductsSlice.actions.NewProductsFetchingSuccess({products}))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}
