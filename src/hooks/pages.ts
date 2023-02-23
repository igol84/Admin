import React, {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./redux";
import {invokeIf} from "../utilite";
import {authSlice} from "../store/slices/authSlice";
import {LanguageModeContext} from "../language";
import {GridSortModel} from "@mui/x-data-grid";

export const useFetchAccess = (fetchFn: any) => {
  const dispatch = useAppDispatch()
  const access_token = useAppSelector(state => state.authReducer.access_token)
  return (value: any) => dispatch(fetchFn(access_token, value))
}

export const useLoaderAccess = (fetchFn: any, arg: any = null) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const errorText = useAppSelector(state => state.authReducer.errorText)
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
  const fetchAccess = useFetchAccess(fetchFn)
  const dispatchFetchFnAccess = useCallback(() => fetchAccess(arg), [])
  useEffect(() => {
    if (errorText) {
      dispatch(authSlice.actions.logout())
      navigate('/auth')
    } else {
      invokeIf(isAuthenticated, dispatchFetchFnAccess, () => navigate('/auth'))
    }
  }, [errorText])
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

export const useMuiLanguage = () => {
  const {muiLanguage, language} = useContext(LanguageModeContext)
  return muiLanguage[language]
}

interface UseSortModel {
  (
    defaultLocalSortModel: GridSortModel,
    localName: string
  ):
    [
      sortModel: GridSortModel,
      onSortModelChange: (newSortModel: GridSortModel) => void
    ]
}

export const useSortModel: UseSortModel = (defaultLocalSortModel, localName) => {
  const localSortModel: GridSortModel = (typeof localStorage.getItem(localName) === 'string') ?
    JSON.parse(localStorage.getItem(localName) || '') :
    defaultLocalSortModel
  const [sortModel, setSortModel] = React.useState<GridSortModel>(localSortModel)

  const onSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
    localStorage.setItem(localName, JSON.stringify(newSortModel))
  }
  return [sortModel, onSortModelChange]
}



interface UseErrorMessage{
  (errorText: string)
    :
    [
      openAlertSnackbar:boolean,
      handleCloseAlertSnackbar:  (event?: (React.SyntheticEvent | Event), reason?: string) => void,
      errorTextNetwork: string
    ]
}

export const useErrorMessage: UseErrorMessage = (errorText) => {
  const d = useDictionary('auth')
  const [errorTextNetwork, setErrorTextNetwork] = useState('')
  useEffect(() => {
    if (errorText === 'Failed to fetch') {
      setErrorTextNetwork(d['networkError'])
      setOpenAlertSnackbar(true)
    }
    else {
      setErrorTextNetwork('')
      setOpenAlertSnackbar(false)
    }
  }, [errorText])


  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false);
  const handleCloseAlertSnackbarCreator = (setOpenState: (value: boolean) => void) =>
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenState(false)
    }
  const handleCloseAlertSnackbar = handleCloseAlertSnackbarCreator(setOpenAlertSnackbar)
  return [openAlertSnackbar, handleCloseAlertSnackbar, errorTextNetwork]
}