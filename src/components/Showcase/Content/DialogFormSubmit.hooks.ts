import {FormData} from "./types";
import {CreateShowcase, DelImgShowcase, UpdateShowcase} from "../../../schemas/showcase";
import {useFetchAccess} from "../../../hooks/pages";
import {addNewItem, delShowcase, updateShowcase, delImg} from "../../../store/actions/showcase";


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
    const newItem: CreateShowcase = {
      showcaseItem:{
        name: formData.name.value,
        title: formData.title.value,
        desc: formData.desc,
        url: formData.url.value,
        active: true,
        youtube: '',
      },
      files: formData.files
    }
    await addItemAccess(newItem)
  }

  const submitEdit = async (formData: FormData) => {
    const updatedItem: UpdateShowcase = {
      showcaseItem: {
        name: formData.name.value,
        title: formData.title.value,
        desc: formData.desc,
        url: formData.url.value,
        active: true,
        youtube: '',
      },
      files: formData.files
    }
    await editItemAccess(updatedItem)
  }

  const deleteItem = async (name: string) => {
    await deleteItemAccess(name)
  }

  const deleteImage = async (delImgShowcase: DelImgShowcase) => {
    await deleteImageAccess(delImgShowcase)
  }

  return [submitAdd, submitEdit, deleteItem, deleteImage]
}