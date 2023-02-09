import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean
  access_token: string
  username: string
  store_id: null | number
  errorText: string
  errorDate: null | number
}

const ACCESS_KEY = 'token'
const USERNAME_KEY = 'username'
const STORE_KEY = 'store_id'
const EXPIRES_KEY = 'expires'

function getInitialState(): AuthState {
  const expiresIn = localStorage.getItem(EXPIRES_KEY) ?? null

  if (expiresIn && new Date() > new Date(expiresIn)) {
    return {
      isAuthenticated: false,
      access_token: '',
      username: '',
      store_id: null,
      errorText: '',
      errorDate: null,
    }
  }
  return {
    isAuthenticated: Boolean(localStorage.getItem(ACCESS_KEY) ?? false),
    access_token: localStorage.getItem(ACCESS_KEY) ?? '',
    username: localStorage.getItem(USERNAME_KEY) ?? '',
    store_id: Number(localStorage.getItem(STORE_KEY)) ?? null,
    errorText: '',
    errorDate: null,
  }
}

const initialState: AuthState = getInitialState()

interface AuthPayload {
  access_token: string
  username: string
  store_id: number
}
interface ErrorPayload {
  errorText: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.access_token = ''
      state.username = ''
      state.store_id = null
      state.errorText = ''
      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(USERNAME_KEY)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem(STORE_KEY)
    },
    loginSuccess(state, action: PayloadAction<AuthPayload>) {
      state.access_token = action.payload.access_token
      state.store_id = Number(action.payload.store_id)
      state.username = action.payload.username
      state.isAuthenticated = Boolean(action.payload.access_token)

      const tokenExpires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

      localStorage.setItem(ACCESS_KEY, action.payload.access_token)
      localStorage.setItem(USERNAME_KEY, action.payload.username)
      localStorage.setItem(STORE_KEY, action.payload.store_id.toString())
      localStorage.setItem(EXPIRES_KEY, tokenExpires.toString())
      state.errorText = ''
      state.errorDate = null
    },
    loginFail(state, action: PayloadAction<ErrorPayload>) {
      state.access_token = ''
      state.store_id = null
      state.username = ''
      state.isAuthenticated = false
      state.errorText = action.payload.errorText
      state.errorDate = new Date().getMilliseconds()

      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(USERNAME_KEY)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem(STORE_KEY)
    }
  }
})

export default authSlice.reducer