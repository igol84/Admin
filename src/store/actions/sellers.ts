import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {sellersSlice} from "../slices/sellersSlice";


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
      const sellers = response.filter(seller => seller.store_id===storeId)
      dispatch(sellersSlice.actions.sellersFetchingSuccess({sellers}))
    } catch (err) {
      dispatch(sellersSlice.actions.sellersFetchingError(err as Error))
    }
  }
}