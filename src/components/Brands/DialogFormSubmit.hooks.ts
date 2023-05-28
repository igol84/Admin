import {convertFromFormDataToBrand, FormData} from "./types";
import {useFetchAccess} from "../../hooks/pages";
import {addNewBrand, delBrand, updateBrand} from "../../store/actions/brands";


interface UseFormSubmit {
  ():
    [
      submitAdd: (formData: FormData) => Promise<void>,
      submitEdit: (formData: FormData) => Promise<void>,
      deleteBrand: (idBrand: number) => Promise<void>,
    ]
}

export const useFormSubmit: UseFormSubmit = () => {
  const addBrandAccess = useFetchAccess(addNewBrand)
  const editBrandAccess = useFetchAccess(updateBrand)
  const deleteBrandAccess = useFetchAccess(delBrand)


  const submitAdd = async (formData: FormData) => {
    await addBrandAccess(convertFromFormDataToBrand(formData))
  }

  const submitEdit = async (formData: FormData) => {
    await editBrandAccess(convertFromFormDataToBrand(formData))
  }

  const deleteBrand = async (idBrand: number) => {
    await deleteBrandAccess(idBrand)
  }


  return [submitAdd, submitEdit, deleteBrand]
}