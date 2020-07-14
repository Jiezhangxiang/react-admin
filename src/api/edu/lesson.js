import request from "@utils/request"
const BASE_URL = "/admin/edu/lesson"
// 获取所有的课程列表信息 // lesson/get/:chapterId[]
export function reqGetLesson(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  })
}
// 更新课时信息 lesson/update
export function reqUpdateLesson({ lessonId, title, free, video }) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: { lessonId, title, free, video },
  })
}
// 删除课时信息 remove/:lessonId
export function reqDeleteLesson(lessonId) {
  return request({
    url: `${BASE_URL}/remove/${lessonId}`,
    method: "DELETE",
  })
}
