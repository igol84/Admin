import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TagUrl} from "../../schemas/base";

interface TagUrlState {
  tagUrls: TagUrl[]
  isLoading: boolean
  error: string
}

const initialState: TagUrlState = {
  tagUrls: [],
  isLoading: false,
  error: ''
}

export interface TagUrlsPayload {
  tagUrls: TagUrl[]
}

interface TagUrlPayload {
  newTagUrl: TagUrl
}

interface ChangedTagUrlPayload {
  changedTagUrl: TagUrl
}

export const tagUrlsSlice = createSlice({
  name: 'tagUrls',
  initialState,
  reducers: {
    tagUrlsFetching(state) {
      state.isLoading = true
    },
    tagUrlsFetchingSuccess(state, action: PayloadAction<TagUrlsPayload>) {
      state.tagUrls = action.payload.tagUrls
      state.isLoading = false
      state.error = ''
    },
    tagUrlsFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewTagUrl(state, {payload: {newTagUrl}}: PayloadAction<TagUrlPayload>) {
      state.isLoading = false
      state.tagUrls.unshift(newTagUrl)
      state.error = ''
    },
    updateTagUrl(state, {payload: {changedTagUrl}}: PayloadAction<ChangedTagUrlPayload>) {
      state.isLoading = false
      state.tagUrls = state.tagUrls.map(tagUrl => {
        return tagUrl.url === changedTagUrl.url ? changedTagUrl : tagUrl
      })
      state.error = ''
    },
    delTagUrl(state, {payload: delUrl}: PayloadAction<string>) {
      state.isLoading = false
      state.tagUrls = state.tagUrls.filter(tagUrl => {
        return tagUrl.url !== delUrl
      })
      state.error = ''
    }
  }
})

export default tagUrlsSlice.reducer