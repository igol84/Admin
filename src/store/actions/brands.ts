import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {authSlice} from "../slices/authSlice";
import {brandSlice} from "../slices/brandsSlice";
import {CreateBrand, UpdateBrand} from "../../schemas/brand";
import {Brand, BrandWithImage} from "../../schemas/base";


export const fetchBrands = (access_token: string) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(brandSlice.actions.brandFetching())
      const brands: Brand[] = await secureApi.get(`brand`).json()
      const images: string[] = await secureApi.get('brand/images').json()
      const brandWithImage: BrandWithImage[] = brands.map(brand => {
        const image = images.find(img => img === `${brand.id}.jpg`)
        return {...brand, image}
      })
      dispatch(brandSlice.actions.brandFetchingSuccess({
        brands: brandWithImage
      }))
    } catch (err) {
      dispatch(brandSlice.actions.brandFetchingError(err as Error))
    }
  }
}

export const addNewBrand = (access_token: string, data: CreateBrand) => {
  const {brand, file} = data
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(brandSlice.actions.brandFetching())
      const newBrand: Brand = await secureApi.post('brand', {json: brand}).json()
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        await secureApi.post(`brand/image/${newBrand.id}`, {body: formData})
      }
      const brandWithImage: BrandWithImage = {
        ...newBrand, image: file ? `${newBrand.id}.jpg` : undefined
      }
      dispatch(brandSlice.actions.addNewBrand({newBrand: brandWithImage}))
      return newBrand
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}


export const updateBrand = (access_token: string, data: UpdateBrand) => {
  const {brand, file} = data
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(brandSlice.actions.brandFetching())
      const changedBrand: Brand = await secureApi.put('brand', {json: brand}).json()
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        await secureApi.post(`brand/image/${brand.id}`, {body: formData})
      }
      const fileName = file ? `${brand.id}.jpg` : undefined
      dispatch(brandSlice.actions.updateBrand({changedBrand, fileName}))
      return changedBrand
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const delBrand = (access_token: string, delId: number) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(brandSlice.actions.brandFetching())
      await secureApi.delete(`brand/${delId}`)
      await secureApi.delete(`brand/image/${delId}`)
      dispatch(brandSlice.actions.delBrand(delId))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

