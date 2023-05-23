import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {authSlice} from "../slices/authSlice";
import {showcaseSlice} from "../slices/showcaseSlice";
import {CreateShowcase, UpdateShowcase} from "../../schemas/showcase";
import {Item, Showcase} from "../../schemas/base";
import _ from "lodash";


export const fetchItems = (access_token: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      const items: Item[] = await secureApi.get(`item`).json()
      const showcase: Showcase[] = await secureApi.get('showcase').json()
      const filteredItems = items.filter(item => {
        return !(!!showcase.find(showcaseItem => showcaseItem.name === item.product.name)) && item.qty > 0
      })
      const productNames = filteredItems.map(item => item.product.name)
      const uniqProductNames = _.uniq(productNames)
      const orderedProductNames = _.orderBy(uniqProductNames, value=> value.toLowerCase())

      dispatch(showcaseSlice.actions.showcaseFetchingSuccess({showcase, productsNames: orderedProductNames}))
    } catch (err) {
      dispatch(showcaseSlice.actions.showcaseFetchingError(err as Error))
    }
  }
}

export const addNewItem = (access_token: string, showcaseItem: CreateShowcase) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      const newShowcaseItem: Showcase = await secureApi.post('showcase', {json: showcaseItem}).json()
      dispatch(showcaseSlice.actions.addNewItem({newShowcaseItem}))
      return newShowcaseItem
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const updateShowcase = (access_token: string, showcaseItem: UpdateShowcase) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      const changedItem: Showcase = await secureApi.put('showcase', {json: showcaseItem}).json()
      dispatch(showcaseSlice.actions.updateItem({changedItem}))
      return changedItem
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const delShowcase = (access_token: string, name: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      await secureApi.delete(`showcase/${name}`)
      dispatch(showcaseSlice.actions.delItem(name))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}