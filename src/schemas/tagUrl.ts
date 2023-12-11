import {TagUrl} from "./base";
import _ from "lodash";

export type CreateTagUrl = TagUrl

export const getParents = (tagUrls: TagUrl[]): string[] => {
  return  _.uniq(tagUrls.filter(tag => tag.parent==='' && tag.search!=='').map(tag => tag.url))
}


