import {FormData} from "./types";
import {CreateShowcase, UpdateShowcase} from "../../../schemas/showcase";
import {useFetchAccess} from "../../../hooks/pages";
import {addNewItem, delShowcase, updateShowcase} from "../../../store/actions/showcase";


interface UseFormSubmit {
  ():
    [
      submitAdd: (formData: FormData) => Promise<void>,
      submitEdit: (formData: FormData) => Promise<void>,
      deleteItem: (name: string) => Promise<void>
    ]
}

export const useFormSubmit: UseFormSubmit = () => {
  const addItemAccess = useFetchAccess(addNewItem)
  const editItemAccess = useFetchAccess(updateShowcase)
  const deleteItemAccess = useFetchAccess(delShowcase)


  const submitAdd = async (formData: FormData) => {
    const newItem: CreateShowcase = {
      name: formData.name.value,
      title: formData.title.value,
      desc: formData.desc,
      url: formData.url.value,
      active: true,
      youtube: ''
    }
    await addItemAccess(newItem)
  }

  const submitEdit = async (formData: FormData) => {
    const updatedItem: UpdateShowcase = {
      name: formData.name.value,
      title: formData.title.value,
      desc: formData.desc,
      url: formData.url.value,
      active: true,
      youtube: ''
    }
    await editItemAccess(updatedItem)
  }


  const deleteItem = async (name: string) => {
    await deleteItemAccess(name)
  }

  return [submitAdd, submitEdit, deleteItem]
}