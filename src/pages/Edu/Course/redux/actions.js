import { GET_COURSE_LIMIT } from "./constant"
import { reqGetAllCourse } from "@api/edu/course"
// 获取课程分页列表
function getCouseLimitSync(data) {
  return { type: GET_COURSE_LIMIT, data }
}
export function getCouseLimit(data) {
  return (dispatch) => {
    return reqGetAllCourse(data).then((res) => {
      dispatch(getCouseLimitSync(res))
      return res
    })
  }
}
