import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {authSlice} from "../slices/authSlice";
import {showcaseSlice} from "../slices/showcaseSlice";
import {
  CreateShowcase,
  DelImgShowcase,
  FetchDelImgShowcase,
  NameAndColors,
  UpdateShowcase
} from "../../schemas/showcase";
import {Brand, Item, Showcase, ShowcaseDirs, ShowcaseIDs, ShowcaseWithImages} from "../../schemas/base";
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
        const dirNameProps = [item.name]
        if (item.color) {
          dirNameProps.push(item.color)
        }
        const dirName = generate_url(dirNameProps.join('-'))
        const dir = dirs.find(dir => dir.name === dirName)
        const images = dir ? dir.images : []
        return {...item, images: images.sort()}
      })
      const namesAndColors: NameAndColors[] = []
      items.forEach(item => {
        const find = namesAndColors.find(name => name.name === item.product.name)
        if (item.product.shoes) {
          if (!find) {
            const nameAndColors: NameAndColors = {name: item.product.name, shoes: {colors: [item.product.shoes.color]}}
            namesAndColors.push(nameAndColors)
          } else {
            if (find.shoes && !find.shoes.colors.includes(item.product.shoes.color))
              find.shoes.colors.push(item.product.shoes.color)
          }
        } else {
          if (!find) {
            const nameAndColors: NameAndColors = {name: item.product.name, shoes: null}
            namesAndColors.push(nameAndColors)
          }
        }
      })
      const orderedNamesAndColors = _.orderBy(namesAndColors, value => value.name.toLowerCase())
      const brandNames = brands.map(brand => ({id: brand.id, name: brand.name}))
      const orderedBrandNames = _.orderBy(brandNames, value => value.name.toLowerCase())

      dispatch(showcaseSlice.actions.showcaseFetchingSuccess({
        showcase: showcaseWithImages,
        namesAndColors: orderedNamesAndColors,
        brandNames: orderedBrandNames
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
        const dirNameProps = [showcaseItem.name]
        if (showcaseItem.color) {
          dirNameProps.push(showcaseItem.color)
        }
        const dirName = generate_url(dirNameProps.join('-'))
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
        const dirNameProps = [showcaseItem.name]
        if (showcaseItem.color) {
          dirNameProps.push(showcaseItem.color)
        }
        const dirName = generate_url(dirNameProps.join('-'))
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

export const delShowcase = (access_token: string, showcaseIDs: ShowcaseIDs) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showcaseSlice.actions.showcaseFetching())
      await secureApi.post('showcase/delete_showcase', {json: showcaseIDs})
      const dirNameProps = [showcaseIDs.name]
      if (showcaseIDs.color) {
        dirNameProps.push(showcaseIDs.color)
      }
      const dirName = generate_url(dirNameProps.join('-'))
      await secureApi.delete(`showcase/dir/${dirName}`)
      dispatch(showcaseSlice.actions.delItem(showcaseIDs))
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
      const data: FetchDelImgShowcase = {imgName: delImgShowcase.imgName, dirName: delImgShowcase.dirName}
      await secureApi.delete(`showcase/img`, {json: data})
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