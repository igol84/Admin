import {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./redux";
import {invokeIf} from "../utilite";

export const useAccess = (fetchFn: any) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  const access_token = useAppSelector(state => state.authReducer.access_token)
  const dispatchFetchFnAccess = useCallback(()=> dispatch(fetchFn(access_token)), [])
  useEffect(() => {
    invokeIf(isAuthenticated, dispatchFetchFnAccess, () => navigate('/auth'))
  }, [])
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
  }, [])

  return showLoading
}