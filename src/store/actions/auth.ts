import axios from "../../axios"

import {AppDispatch} from "../index";
import {authSlice} from "../slices/authSlice";
import Axios, {AxiosError} from "axios";

export interface IAuth {
  username: string
  password: string
}

export interface IAuthResponse {
  access_token: string
  token_type: string
  store_id: number
}

export const login = (data: IAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<IAuthResponse>(
        '/login',
        data,
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      dispatch(authSlice.actions.loginSuccess({
        store_id: response.data.store_id,
        access_token: response.data.access_token,
        username: data.username
      }))
      console.log(response.data.access_token)
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (Axios.isAxiosError(errors)) {
        const errorText = errors.response?.data.detail || errors.message
        if (errorText) {
          dispatch(authSlice.actions.loginFail({
            errorText
          }))
        }
      }
    }
  }
}