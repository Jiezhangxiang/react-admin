import {
  GET_CHAPTER,
  GET_LESSON,
  BATCHREMOVE_CHAPTER,
  BATCHREMOVE_LESSON,
} from "./contstants"
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
    case BATCHREMOVE_CHAPTER:
      // action.data 存储的是一个包含所有需要删除的chapter的id
      // let chapterList = parseState.items
      const newChildren = parseState.items.filter((chapter) => {
        const index = action.data.indexOf(chapter._id)
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      console.log(newChildren, "删除后的数组")
      const a = { ...parseState, items: newChildren }
      console.log(a, "state")
      return a
    case BATCHREMOVE_LESSON:
      // let chapterList = parseState.items
      parseState.items.forEach((chapter) => {
        const newChildren = chapter.children.filter((item) => {
          if (action.data.indexOf(item._id) > -1) {
            return false
          } else {
            return true
          }
        })
        chapter.children = newChildren
      })

      return { ...parseState, items: parseState.items }
    default:
      return parseState
  }
}
