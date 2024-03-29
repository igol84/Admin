import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useStoreId = () => useAppSelector(state => state.authReducer.store_id)

export const useIsAdmin = () => {
  const storeId = useStoreId()
  return storeId === 3
}