import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {CreatePlace, PlaceWithDetails} from "../../schemas/place";
import {KyInstance} from "ky/distribution/types/ky";
import {Place} from "../../schemas/base";
import _ from "lodash";


interface PlaceState {
  places: PlaceWithDetails[]
  isLoading: boolean
  error: string
}

const initialState: PlaceState = {
  places: [],
  isLoading: false,
  error: ''
}

const createThunkSlice = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator}
})

export const placesSlice = createThunkSlice({
  name: 'places',
  initialState,
  reducers: (create) => ({
    fetchPlaces: create.asyncThunk(
      async ({storeId, api}: { storeId: number, api: KyInstance }) => {
        return await api.get(`place/deletable?store_id=${storeId}`).json() as PlaceWithDetails[]
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          state.places = action.payload
        },
        rejected: (state, action) => {
          state.isLoading = false
          state.error = String(action.error.message)
        }
      }
    ),
    addNewPlace: create.asyncThunk(
      async ({place, api}: { place: CreatePlace, api: KyInstance }) => {
        const newPlace: Place = await api.post('place', {json: place}).json()
        const newPlaceWithDetails: PlaceWithDetails = {...newPlace, sales: 0, expenses: 0}
        return {newPlace: newPlaceWithDetails}
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, {payload: {newPlace}}) => {
          state.isLoading = false
          state.places.unshift(newPlace)
        },
        rejected: (state, action) => {
          state.isLoading = false
          state.error = String(action.error.message)
        }
      }
    ),
    updatePlace: create.asyncThunk(
      async ({place, api}: { place: PlaceWithDetails, api: KyInstance }) => {
        const updatePlace = _.pick(place, ['id', 'store_id', 'name', 'active'])
        const updatedPlace: Place = await api.put('place', {json: updatePlace}).json()
        return {updatedPlace: {...place, ...updatedPlace}}
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, {payload: {updatedPlace}}) => {
          state.isLoading = false
          state.places = state.places.map(place => {
            return place.id == updatedPlace.id ? updatedPlace : place
          })
        },
        rejected: (state, action) => {
          state.isLoading = false
          state.error = String(action.error.message)
        }
      }
    ),
    delPlace: create.asyncThunk(
      async ({placeId, api}: { placeId: number, api: KyInstance }) => {
        await api.delete(`place/${placeId}`)
        return {placeId}
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, {payload: {placeId}}) => {
          state.isLoading = false
          state.places = state.places.filter(place => {
            return place.id !== placeId
          })
        },
        rejected: (state, action) => {
          state.isLoading = false
          state.error = String(action.error.message)
        }
      }
    ),
    delPlace0: create.reducer((state, {payload: delId}: PayloadAction<number>) => {
      state.isLoading = false
      state.places = state.places.filter(place => {
        return place.id !== delId
      })
      state.error = ''
    }),

  })
})
export const {fetchPlaces, addNewPlace, updatePlace, delPlace} = placesSlice.actions
export default placesSlice.reducer