import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {placesSlice} from "../slices/placesSlice";
import {authSlice} from "../slices/authSlice";
import _ from "lodash";

export interface PlaceResponse {
  id: number
  store_id: number
  name: string
  active: boolean
  sales: number
  expenses: number
}

export type NewPlaceResponse = Pick<PlaceResponse, "store_id" | "name" | "active">

export const fetchPlaces = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(placesSlice.actions.placesFetching())
      const response: PlaceResponse[] = await secureApi.get(`place/deletable?store_id=${storeId}`).json()
      const places = response.filter(place => place.store_id === storeId)
      dispatch(placesSlice.actions.placesFetchingSuccess({places}))
    } catch (err) {
      dispatch(placesSlice.actions.placesFetchingError(err as Error))
    }
  }
}

export const addNewPlace = (access_token: string, place: PlaceResponse) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(placesSlice.actions.placesFetching())
      const newPlace: PlaceResponse = await secureApi.post('place', {json: place}).json()
      dispatch(placesSlice.actions.addNewPlace({newPlace}))
      return newPlace
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const updatePlace = (access_token: string, place: PlaceResponse) => {
  const updatePlace = _.pick(place, ['id', 'store_id', 'name', 'active'])
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(placesSlice.actions.placesFetching())
      await secureApi.put('place', {json: updatePlace})
      dispatch(placesSlice.actions.updatePlace({changedPlace: place}))
      return place
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const delPlace = (access_token: string, id: number) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(placesSlice.actions.placesFetching())
      await secureApi.delete(`place/${id}`)
      dispatch(placesSlice.actions.delPlace(id))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}