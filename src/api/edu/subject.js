import request from "@utils/request"

const BASE_URL = "/admin/edu/subject"
// const MOCK_URL = "http://127.0.0.1:8800/admin/edu/subject"

// 获取分类管理的列表信息
export function reqGetSubject(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}
