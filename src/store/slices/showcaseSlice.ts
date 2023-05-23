import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Showcase} from "../../schemas/base";
import _ from "lodash";


interface ShowcaseState {
  showcase: Showcase[]
  productsNames: string[]
  isLoading: boolean
  error: string
}

const initialState: ShowcaseState = {
  showcase: [],
  productsNames: [],
  isLoading: false,
  error: ''
}

export interface ItemsPayload {
  showcase: Showcase[]
  productsNames: string[]
}

interface NewItemPayload {
  newShowcaseItem: Showcase
}

interface ChangedItemPayload {
  changedItem: Showcase
}

export const showcaseSlice = createSlice({
  name: 'showcase',
  initialState,
  reducers: {
    showcaseFetching(state) {
      state.isLoading = true
    },
    showcaseFetchingSuccess(state, action: PayloadAction<ItemsPayload>) {
      state.showcase = action.payload.showcase
      state.productsNames = action.payload.productsNames
      state.isLoading = false
      state.error = ''
    },
    showcaseFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewItem(state, {payload: {newShowcaseItem}}: PayloadAction<NewItemPayload>) {
      state.isLoading = false
      state.productsNames = state.productsNames.filter(name=>{
        return name !== newShowcaseItem.name
      })
      state.showcase.unshift(newShowcaseItem)
      state.error = ''
    },
    updateItem(state, {payload: {changedItem}}: PayloadAction<ChangedItemPayload>) {
      state.isLoading = false
      state.showcase = state.showcase.map(item => {
        return item.name == changedItem.name ? changedItem : item
      })
      state.error = ''
    },
    delItem(state, {payload: delName}: PayloadAction<string>) {
      state.isLoading = false
      state.showcase = state.showcase.filter(item => {
        return item.name !== delName
      })
      state.productsNames.push(delName)
      state.productsNames = _.orderBy(state.productsNames, value=> value.toLowerCase())
      state.error = ''
    }

  }
})

export default showcaseSlice.reducer