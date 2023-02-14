import {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./redux";
import {invokeIf} from "../utilite";
import {authSlice} from "../store/slices/authSlice";
import {LanguageModeContext} from "../language";

export const useAccess = (fetchFn: any, arg: any = null) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const errorText = useAppSelector(state => state.authReducer.errorText)
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  const access_token = useAppSelector(state => state.authReducer.access_token)
  const dispatchFetchFnAccess = useCallback(() => dispatch(fetchFn(access_token, arg)), [])
  useEffect(() => {
    if (errorText) {
      dispatch(authSlice.actions.logout())
      navigate('/auth')
    } else {
      invokeIf(isAuthenticated, dispatchFetchFnAccess, () => navigate('/auth'))
    }
  }, [errorText])
  return dispatchFetchFnAccess
}

export const useIsLoadingDisplay = (loading: Boolean) => {
  const [showLoading, setShowLoading] = useState(false)
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowLoading(true), 500)
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false)
    }
  }, [loading])

  return showLoading
}

export const useDictionary = (page: string) => {
  const {dictionary} = useContext(LanguageModeContext)
  return dictionary[page]
}
