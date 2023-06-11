import {convertFromFormDataToShowcase, FormData} from "./types";
import {useFetchAccess} from "../../../hooks/pages";
import {addNewItem, delImg, delShowcase, updateShowcase} from "../../../store/actions/showcase";
import {ShowcaseImage} from "../../../schemas/base";


interface UseFormSubmit {
  ( selectedShowcaseItemKey: string,
    resetFormData: () => void
  ):
    [
      submitAdd: (formData: FormData) => Promise<void>,
      submitEdit: (formData: FormData) => Promise<void>,
      deleteItem: (key: string) => Promise<void>,
      deleteImage: (showcaseImage: ShowcaseImage) => Promise<void>
    ]
}

export const useFormSubmit: UseFormSubmit = (selectedShowcaseItemKey, resetFormData) => {
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
    const data = convertFromFormDataToShowcase(formData, selectedShowcaseItemKey)
    resetFormData()
    await editItemAccess(data)
  }

  const deleteItem = async (dir: string) => {
    await deleteItemAccess(dir)
  }

  const deleteImage = async (showcaseImage: ShowcaseImage) => {
    await deleteImageAccess(showcaseImage)
  }

  return [submitAdd, submitEdit, deleteItem, deleteImage]
}