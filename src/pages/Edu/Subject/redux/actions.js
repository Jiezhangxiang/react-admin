import { reqGetSubject } from "@api/edu/subject"

import { GET_SUBJECT_LIST } from "./constants"
/**
 * 获取subject分页数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
})
export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response))
    })
  }
}
