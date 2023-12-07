import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {tagUrlsSlice} from "../slices/tagUrlsSlice";
import {authSlice} from "../slices/authSlice";
import {CreateTagUrl} from "../../schemas/tagUrl";
import {TagUrl} from "../../schemas/base";

export const fetchTagUrls = (access_token: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tagUrlsSlice.actions.tagUrlsFetching())
      const tagUrls: TagUrl[] = await secureApi.get('tag_url').json()
      dispatch(tagUrlsSlice.actions.tagUrlsFetchingSuccess({tagUrls}))
    } catch (err) {
      dispatch(tagUrlsSlice.actions.tagUrlsFetchingError(err as Error))
    }
  }
}

export const addNewTagUrl = (access_token: string, tagUrl: CreateTagUrl) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tagUrlsSlice.actions.tagUrlsFetching())
      const newTagUrl: TagUrl = await secureApi.post('tag_url', {json: tagUrl}).json()
      dispatch(tagUrlsSlice.actions.addNewTagUrl({newTagUrl: newTagUrl}))
      return newTagUrl
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const updateTagUrl = (access_token: string, updateTagUrl: TagUrl) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tagUrlsSlice.actions.tagUrlsFetching())
      const updatedTagUrl: TagUrl = await secureApi.put('tag_url', {json: updateTagUrl}).json()
      dispatch(tagUrlsSlice.actions.updateTagUrl({changedTagUrl: updatedTagUrl}))
      return updatedTagUrl
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const delTagUrl = (access_token: string, url: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tagUrlsSlice.actions.tagUrlsFetching())
      await secureApi.delete(`tag_url/${url}`)
      dispatch(tagUrlsSlice.actions.delTagUrl(url))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}