import {convertFromFormDataToShowcase, FormData} from "./types";
import {DelImgShowcase} from "../../../schemas/showcase";
import {useFetchAccess} from "../../../hooks/pages";
import {addNewItem, delImg, delShowcase, updateShowcase} from "../../../store/actions/showcase";


interface UseFormSubmit {
  ():
    [
      submitAdd: (formData: FormData) => Promise<void>,
      submitEdit: (formData: FormData) => Promise<void>,
      deleteItem: (name: string) => Promise<void>,
      deleteImage: (delImgShowcase: DelImgShowcase) => Promise<void>
    ]
}

export const useFormSubmit: UseFormSubmit = () => {
  const addItemAccess = useFetchAccess(addNewItem)
  const editItemAccess = useFetchAccess(updateShowcase)
  const deleteItemAccess = useFetchAccess(delShowcase)
  const deleteImageAccess = useFetchAccess(delImg)

  const submitAdd = async (formData: FormData) => {
    await addItemAccess(convertFromFormDataToShowcase(formData))
  }

  const submitEdit = async (formData: FormData) => {
    await editItemAccess(convertFromFormDataToShowcase(formData))
  }

  const deleteItem = async (name: string) => {
    await deleteItemAccess(name)
  }

  const deleteImage = async (delImgShowcase: DelImgShowcase) => {
    await deleteImageAccess(delImgShowcase)
  }

  return [submitAdd, submitEdit, deleteItem, deleteImage]
}