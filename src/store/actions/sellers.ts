import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {sellersSlice} from "../slices/sellersSlice";
import {authSlice} from "../slices/authSlice";
import _ from "lodash";
import {Seller, SellerWithDetails, UpdateSeller} from "../../schemas/seller";


export const fetchSellers = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sellersSlice.actions.sellersFetching())
      const sellers: SellerWithDetails[] = await secureApi.get(`seller/deletable?store_id=${storeId}`).json()
      dispatch(sellersSlice.actions.sellersFetchingSuccess({sellers}))
    } catch (err) {
      dispatch(sellersSlice.actions.sellersFetchingError(err as Error))
    }
  }
}

export const addNewSeller = (access_token: string, seller: UpdateSeller) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sellersSlice.actions.sellersFetching())
      const newSeller: Seller = await secureApi.post('seller', {json: seller}).json()

      const newSellerWithDetails: SellerWithDetails = {...newSeller, role: '', sales: 0}

      dispatch(sellersSlice.actions.addNewSeller({newSeller: newSellerWithDetails}))
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

export const updateSeller = (access_token: string, seller: SellerWithDetails) => {
  const updateSeller = _.pick(seller, ['id', 'store_id', 'name', 'active'])
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sellersSlice.actions.sellersFetching())
      const updatedSeller: Seller = await secureApi.put('seller', {json: updateSeller}).json()
      dispatch(sellersSlice.actions.updateSeller({changedSeller: {...seller, ...updatedSeller}}))
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