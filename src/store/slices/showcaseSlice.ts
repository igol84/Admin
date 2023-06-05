import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Showcase, ShowcaseIDs, ShowcaseWithImages} from "../../schemas/base";
import _ from "lodash";
import {BrandsNames, DelImgShowcase, NameAndColors} from "../../schemas/showcase";
import produce from "immer";


interface ShowcaseState {
  showcase: ShowcaseWithImages[]
  namesAndColors: NameAndColors[]
  brandNames: BrandsNames[]
  isLoading: boolean
  error: string
}

const initialState: ShowcaseState = {
  showcase: [],
  namesAndColors: [],
  brandNames: [],
  isLoading: false,
  error: ''
}

export interface ItemsPayload {
  showcase: ShowcaseWithImages[]
  namesAndColors: NameAndColors[]
  brandNames: BrandsNames[]
}

interface NewItemPayload {
  newShowcaseItem: ShowcaseWithImages
}

interface ChangedItemPayload {
  changedItem: Showcase
  fileNames: string[] | null
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
      state.namesAndColors = action.payload.namesAndColors
      state.brandNames = action.payload.brandNames
      state.isLoading = false
      state.error = ''
    },
    showcaseFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewItem(state, {payload: {newShowcaseItem}}: PayloadAction<NewItemPayload>) {
      state.isLoading = false
      state.showcase.unshift(newShowcaseItem)
      state.error = ''
    },
    updateItem(state, {payload: {changedItem, fileNames}}: PayloadAction<ChangedItemPayload>) {
      state.isLoading = false

      state.showcase = state.showcase.map(item => {
        const itemImages = fileNames ? _.uniq([...fileNames, ...item.images]).sort() : item.images
        const showcaseWithImages: ShowcaseWithImages = {...changedItem, images: itemImages}
        return item.name == changedItem.name && item.color === changedItem.color ? showcaseWithImages : item
      })
      state.error = ''
    },
    delItem(state, {payload: {name, color}}: PayloadAction<ShowcaseIDs>) {
      state.isLoading = false
      state.showcase = state.showcase.filter(item => {
        return !(item.name === name && item.color === color)
      })
      state.error = ''
    },
    delImg(state, {payload: {nameItem, colorItem, imgName}}: PayloadAction<DelImgShowcase>) {
      state.isLoading = false
      state.showcase = produce(state.showcase, draftData => {
        draftData.map(showcaseItem => {
          if (showcaseItem.name === nameItem && showcaseItem.color === colorItem)
            showcaseItem.images = showcaseItem.images.filter(image => image !== imgName)
        })
      })
      state.error = ''
    },

  }
})

export default showcaseSlice.reducer