import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {authSlice} from "../slices/authSlice";
import {showcaseSlice} from "../slices/showcaseSlice";
import {CreateShowcase, DelImgShowcase, UpdateShowcase} from "../../schemas/showcase";
import {Brand, Item, Showcase, ShowcaseDirs, ShowcaseWithImages} from "../../schemas/base";
import _ from "lodash";
import {generate_url} from "../../utilite";


export const fetchItems = (access_token: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      const items: Item[] = await secureApi.get(`item`).json()
      const showcase: Showcase[] = await secureApi.get('showcase').json()
      const dirs: ShowcaseDirs[] = await secureApi.get('showcase/dir').json()
      const brands: Brand[] = await secureApi.get(`brand`).json()
      const showcaseWithImages: ShowcaseWithImages[] = showcase.map(item => {
        const dir = dirs.find(dir => dir.name === generate_url(item.name))
        const images = dir ? dir.images : []
        return {...item, images: images.sort()}
      })
      const productNames = items.map(item => item.product.name)
      const uniqProductNames = _.uniq(productNames)
      const orderedProductNames = _.orderBy(uniqProductNames, value => value.toLowerCase())

      dispatch(showcaseSlice.actions.showcaseFetchingSuccess({
        showcase: showcaseWithImages,
        productsNames: orderedProductNames,
        brandNames: brands.map(brand => ({id: brand.id, name: brand.name}))
      }))
    } catch (err) {
      dispatch(showcaseSlice.actions.showcaseFetchingError(err as Error))
    }
  }
}

export const addNewItem = (access_token: string, data: CreateShowcase) => {
  const {showcaseItem, files} = data
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      const newShowcaseItem: Showcase = await secureApi.post('showcase', {json: showcaseItem}).json()
      if (files) {
        const formData = new FormData()
        files.forEach(file => {
          formData.append('files', file)
        })
        const dirName = generate_url(showcaseItem.name)
        await secureApi.post(`showcase/files/${dirName}`, {body: formData}).json()
      }
      const fileNames = files ? files.map(file => file.name) : []
      const showcaseWithImage: ShowcaseWithImages = {
        ...newShowcaseItem, images: fileNames
      }
      dispatch(showcaseSlice.actions.addNewItem({newShowcaseItem: showcaseWithImage}))
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


export const updateShowcase = (access_token: string, data: UpdateShowcase) => {
  const {showcaseItem, files} = data
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      const changedItem: Showcase = await secureApi.put('showcase', {json: showcaseItem}).json()
      if (files) {
        const formData = new FormData()
        files.forEach(file => {
          formData.append('files', file)
        })
        const dirName = generate_url(showcaseItem.name)
        await secureApi.post(`showcase/files/${dirName}`, {body: formData}).json()
      }
      const fileNames = files ? files.map(file => file.name) : null
      dispatch(showcaseSlice.actions.updateItem({changedItem, fileNames}))
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
      const dirName = generate_url(name)
      await secureApi.delete(`showcase/dir/${dirName}`)
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

export const delImg = (access_token: string, delImgShowcase: DelImgShowcase) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      await secureApi.delete(`showcase/img`, {json: delImgShowcase})
      dispatch(showcaseSlice.actions.delImg(delImgShowcase))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const fetchColors = (access_token: string, name: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      const colors: string[] = name ? await secureApi.get(`prod/colors_by_prod_name/${name}`).json() : []
      dispatch(showcaseSlice.actions.getColors(colors))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}