import ky from 'ky'
import {useAppSelector} from "../hooks/redux";

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL
})

export const secureApiCreate = (bearer: string = '') =>  {
  return api.extend({
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${bearer}`
    }
  })
}

export const createApi = () =>  {
  const access_token = useAppSelector(state => state.authReducer.access_token)
  return api.extend({
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  })
}



