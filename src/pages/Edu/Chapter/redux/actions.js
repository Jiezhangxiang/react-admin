import { GET_CHAPTER, GET_LESSON } from "./contstants"
import { reqGetChapterList } from "@api/edu/chapter"
import { reqGetLesson } from "@api/edu/lesson"
// 获取章节列表信息
function getChapterListSync(data) {
  return {
    type: GET_CHAPTER,
    data,
  }
}
export function getChapterList({ page, limit, courseId }) {
  return (dispatch) => {
    return reqGetChapterList({ page, limit, courseId }).then((res) => {
      dispatch(getChapterListSync(res))
      return res
    })
  }
}
// 获取章节下面对应的课程信息
function getLessonListSync(data) {
  return {
    type: GET_LESSON,
    data,
  }
}
export function getLessonList(chapterId) {
  return (dispatch) => {
    return reqGetLesson(chapterId).then((res) => {
      dispatch(getLessonListSync(res))
      return res
    })
  }
}
