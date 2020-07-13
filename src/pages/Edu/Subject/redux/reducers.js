import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from "./constants"

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
}
export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    // 更改subjectList的分页数据
    case GET_SUBJECT_LIST:
      // 每一项添加一个children 属性(添加后会显示加号按钮)
      action.data.items.forEach((item) => {
        item.children = []
      })
      return action.data
    case GET_SECSUBJECT_LIST:
      // 将action中的list属性添加到一级课程分类数据中的children 内
      if (action.list.items.length > 0) {
        const parentId = action.list.items[0].parentId
        prevState.items.forEach((item) => {
          if (item._id === parentId) {
            item.children = action.list.items
            return
          }
        })
      }
      return { ...prevState }
    default:
      return prevState
  }
}
