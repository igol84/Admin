import {convertFromFormDataToShowcase, FormData} from "./types";
import {DelImgShowcase} from "../../../schemas/showcase";
import {useFetchAccess} from "../../../hooks/pages";
import {addNewItem, delImg, delShowcase, updateShowcase} from "../../../store/actions/showcase";
import {ShowcaseIDs} from "../../../schemas/base";


interface UseFormSubmit {
  (resetFormData: () => void):
    [
      submitAdd: (formData: FormData) => Promise<void>,
      submitEdit: (formData: FormData) => Promise<void>,
      deleteItem: (name: string, color: string) => Promise<void>,
      deleteImage: (delImgShowcase: DelImgShowcase) => Promise<void>
    ]
}

export const useFormSubmit: UseFormSubmit = (resetFormData) => {
  const addItemAccess = useFetchAccess(addNewItem)
  const editItemAccess = useFetchAccess(updateShowcase)
  const deleteItemAccess = useFetchAccess(delShowcase)
  const deleteImageAccess = useFetchAccess(delImg)

  const submitAdd = async (formData: FormData) => {
    const data = convertFromFormDataToShowcase(formData)
    resetFormData()
    await addItemAccess(data)
  }

  const submitEdit = async (formData: FormData) => {
    const data = convertFromFormDataToShowcase(formData)
    resetFormData()
    await editItemAccess(data)
  }

  const deleteItem = async (name: string, color: string) => {
    const id: ShowcaseIDs = {name, color}
    await deleteItemAccess(id)
  }

  const deleteImage = async (delImgShowcase: DelImgShowcase) => {
    await deleteImageAccess(delImgShowcase)
  }

  return [submitAdd, submitEdit, deleteItem, deleteImage]
}