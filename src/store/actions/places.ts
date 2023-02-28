import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {placesSlice} from "../slices/placesSlice";
import {authSlice} from "../slices/authSlice";
import _ from "lodash";
import {CreatePlace, Place, PlaceWithDetails} from "../../schemas/place";

export const fetchPlaces = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(placesSlice.actions.placesFetching())
      const places: PlaceWithDetails[] = await secureApi.get(`place/deletable?store_id=${storeId}`).json()
      dispatch(placesSlice.actions.placesFetchingSuccess({places}))
    } catch (err) {
      dispatch(placesSlice.actions.placesFetchingError(err as Error))
    }
  }
}

export const addNewPlace = (access_token: string, place: CreatePlace) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(placesSlice.actions.placesFetching())
      const newPlace: Place = await secureApi.post('place', {json: place}).json()
      const newPlaceWithDetails: PlaceWithDetails = {...newPlace, sales: 0, expenses: 0}
      dispatch(placesSlice.actions.addNewPlace({newPlace: newPlaceWithDetails}))
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

export const updatePlace = (access_token: string, place: PlaceWithDetails) => {
  const updatePlace = _.pick(place, ['id', 'store_id', 'name', 'active'])
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(placesSlice.actions.placesFetching())
      const updatedPlace: Place = await secureApi.put('place', {json: updatePlace}).json()
      dispatch(placesSlice.actions.updatePlace({changedPlace: {...place, ...updatedPlace}}))
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