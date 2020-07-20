import request from "@utils/request"
const BASE_URL = "/admin/edu/course"
// 获取所有的课程列表信息 // admin/edu/course
export function reqGetCourse() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  })
}
// 获取所有的课程分页列表信息
export function reqGetAllCourse({
  page,
  limit,
  teacherId,
  subjectId,
  subjectParentId,
  title,
}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: { teacherId, subjectId, subjectParentId, title },
  })
}
