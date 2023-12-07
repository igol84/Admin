import * as yup from "yup";

import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import React from "react";
import {useFetchAccess} from "../../hooks/pages";
import {TagUrl} from "../../schemas/base";
import {updateTagUrl} from "../../store/actions/tag_url";

export const useHandlerUpdate = () => {
  const editTagUrlAccess = useFetchAccess(updateTagUrl)
  const tagUrlSchema = yup.object({
    url: yup.string().required(),
    search: yup.string(),
    search_ua: yup.string(),
    desc: yup.string(),
    desc_ua: yup.string(),
  })

  function computeMutation(newRow: TagUrl, oldRow: TagUrl) {
    const trimmedRow = toTrimTheRow('desc')(newRow)
    if (equal(trimmedRow, oldRow)) {
      return null
    }
    return trimmedRow
  }

  type HandlerRowUpdate = (newRow: TagUrl, oldRow: TagUrl) => Promise<TagUrl>
  const handlerRowUpdate: HandlerRowUpdate = React.useCallback(
    async (newRow: TagUrl, oldRow: TagUrl) => {
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        const validRow = await tagUrlSchema.validate(mutation)
        return await editTagUrlAccess(validRow)
      } else {
        return oldRow
      }
    },
    [],
  )
  return handlerRowUpdate
}

