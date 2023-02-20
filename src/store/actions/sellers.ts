import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {sellersSlice} from "../slices/sellersSlice";
import {authSlice} from "../slices/authSlice";


export interface SellerResponse {
  store_id: number
  name: string
  active: boolean
  id: number
}

export type NewSellerResponse = Omit<SellerResponse, 'id'>

export const fetchSellers = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sellersSlice.actions.sellersFetching())
      const response: SellerResponse[] = await secureApi.get('seller').json()
      const sellers = response.filter(seller => seller.store_id === storeId)
      dispatch(sellersSlice.actions.sellersFetchingSuccess({sellers}))
    } catch (err) {
      dispatch(sellersSlice.actions.sellersFetchingError(err as Error))
    }
  }
}

export const addNewSeller = (access_token: string, seller: NewSellerResponse) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sellersSlice.actions.sellersFetching())
      const newSeller: SellerResponse = await secureApi.post('seller', {json: seller}).json()
      dispatch(sellersSlice.actions.addNewSeller({newSeller}))
      return newSeller
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const updateSeller = (access_token: string, seller: SellerResponse) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sellersSlice.actions.sellersFetching())
      await secureApi.put('seller', {json: seller})
      dispatch(sellersSlice.actions.updateSeller({changedSeller: seller}))
      return seller
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const delSeller = (access_token: string, id: number) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sellersSlice.actions.sellersFetching())
      await secureApi.delete(`seller/${id}`)
      dispatch(sellersSlice.actions.delSeller(id))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}