import ky from 'ky'

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



