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