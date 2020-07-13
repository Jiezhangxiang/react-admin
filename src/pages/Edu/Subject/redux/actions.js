import { reqGetSubject, reqGetSecSubject } from "@api/edu/subject"

import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from "./constants"
//获取一级subjecty分页数据
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
//获取级二subjecty数据
function getSecSubjectList(list) {
  return { type: GET_SECSUBJECT_LIST, list }
}
export function getSecSubjectListSync(parentId) {
  return (dispatch) => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectList(response))
    })
  }
}
