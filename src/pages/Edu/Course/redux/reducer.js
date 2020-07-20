import { GET_COURSE_LIMIT } from "./constant"
const initCourseList = { total: 0, items: [] }
export default function courseList(parseSate = initCourseList, action) {
  switch (action.type) {
    case GET_COURSE_LIMIT:
      return action.data
    default:
      return parseSate
  }
}
