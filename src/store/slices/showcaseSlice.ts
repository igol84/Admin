import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Showcase, ShowcaseImage} from "../../schemas/base";
import _ from "lodash";
import {BrandsNames, NameAndColors} from "../../schemas/showcase";
import {produce} from "immer";


interface ShowcaseState {
  showcase: Showcase[]
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
  showcase: Showcase[]
  namesAndColors: NameAndColors[]
  brandNames: BrandsNames[]
}

interface NewItemPayload {
  newShowcaseItem: Showcase
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
        const oldImageNames = item.images.map(row=> row.image)
        const itemImages = fileNames ? _.uniq([...fileNames, ...oldImageNames]).sort() : oldImageNames
        const images: ShowcaseImage[] = itemImages.map(image => ({dir: changedItem.key, image: image}))
        const showcaseWithImages: Showcase = {...changedItem, images}
        return item.key === changedItem.key ? showcaseWithImages : item
      })
      state.error = ''
    },
    delItem(state, {payload: dir}: PayloadAction<string>) {
      state.isLoading = false
      state.showcase = state.showcase.filter(item => {
        return !(item.key === dir)
      })
      state.error = ''
    },
    delImg(state, {payload: {dir, image}}: PayloadAction<ShowcaseImage>) {
      state.isLoading = false
      state.showcase = produce(state.showcase, draftData => {
        draftData.map(showcaseItem => {
          if (showcaseItem.key === dir)
            showcaseItem.images = showcaseItem.images.filter(row => row.image !== image)
        })
      })
      state.error = ''
    },

  }
})

export default showcaseSlice.reducer