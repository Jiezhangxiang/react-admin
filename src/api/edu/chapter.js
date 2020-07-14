import request from "@utils/request"
const BASE_URL = "/admin/edu/chapter"
// 获取章节分页列表信息 /chapter/:page/:limit
export function reqGetChapterList({ page, limit, courseId }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: { courseId },
  })
}
