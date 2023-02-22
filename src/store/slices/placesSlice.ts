import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlaceResponse} from "../actions/places";

interface PlaceState {
  places: PlaceResponse[]
  isLoading: boolean
  error: string
}

const initialState: PlaceState = {
  places: [],
  isLoading: false,
  error: ''
}

export interface PlacesPayload {
  places: PlaceResponse[]
}

interface PlacePayload {
  newPlace: PlaceResponse
}

interface ChangedPlacePayload {
  changedPlace: PlaceResponse
}

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    placesFetching(state) {
      state.isLoading = true
    },
    placesFetchingSuccess(state, action: PayloadAction<PlacesPayload>) {
      state.places = action.payload.places
      state.isLoading = false
      state.error = ''
    },
    placesFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewPlace(state, {payload: {newPlace}}: PayloadAction<PlacePayload>) {
      state.isLoading = false
      state.places.unshift(newPlace)
      state.error = ''
    },
    updatePlace(state, {payload: {changedPlace}}: PayloadAction<ChangedPlacePayload>) {
      state.isLoading = false
      state.places = state.places.map(place => {
        return place.id == changedPlace.id ? changedPlace : place
      })
      state.error = ''
    },
    delPlace(state, {payload: delId}: PayloadAction<number>) {
      state.isLoading = false
      state.places = state.places.filter(place => {
        return place.id !== delId
      })
      state.error = ''
    }
  }
})

export default placesSlice.reducer