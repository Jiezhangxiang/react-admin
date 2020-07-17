import {
  GET_CHAPTER,
  GET_LESSON,
  BATCHREMOVE_CHAPTER,
  BATCHREMOVE_LESSON,
} from "./contstants"
import { reqGetChapterList, reqBatchRemoveChapter } from "@api/edu/chapter"
import { reqGetLesson, reqBatchRemoveLesson } from "@api/edu/lesson"
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
// 批量删除 chapter
function batchRemoveChapterSync(data) {
  return { type: BATCHREMOVE_CHAPTER, data }
}
export function batchRemoveChapter(chapterIds) {
  return (dispatch) => {
    return reqBatchRemoveChapter(chapterIds).then((res) => {
      dispatch(batchRemoveChapterSync(chapterIds))
      return res
    })
  }
}
// 批量删除 lesson
function batchRemoveLessonSync(data) {
  return { type: BATCHREMOVE_LESSON, data }
}
export function batchRemoveLesson(lessonIDs) {
  return (dispatch) => {
    return reqBatchRemoveLesson(lessonIDs).then((res) => {
      dispatch(batchRemoveLessonSync(lessonIDs))
      return res
    })
  }
}
