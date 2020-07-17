import request from "@utils/request"

const BASE_URL = "/admin/edu/subject"
// const MOCK_URL = "http://127.0.0.1:8800/admin/edu/subject"

// 获取一级分类管理的列表信息
export function reqGetSubject(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}
// 获取所有一级分类管理的列表信息
export function reqGetAllSubjectList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  })
}
// 获取二级分类管理信息
export function reqGetSecSubject(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  })
}
// 新增课程分类
export function reqAddSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: { title, parentId },
  })
}
// 删除课程分类
export function reqDeleteSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  })
}
// 跟新课程分类信息

export function reqUpdateSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: { title, id: parentId },
  })
}
