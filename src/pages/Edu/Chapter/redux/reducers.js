import { GET_CHAPTER, GET_LESSON } from "./contstants"
const initChapterList = {
  total: 0,
  items: [],
}
export function chapterList(parseState = initChapterList, action) {
  switch (action.type) {
    case GET_CHAPTER:
      // 给items 中的每一项添加一个children属性 []
      action.data.items.forEach((item) => (item.children = []))
      return action.data
    case GET_LESSON:
      // 给对应的children中添加数据

      if (action.data.length > 0) {
        const parentId = action.data[0].chapterId
        parseState.items.forEach((item) => {
          if (item._id === parentId) {
            item.children = action.data
          }
        })
      }
      return { ...parseState }
    default:
      return parseState
  }
}
