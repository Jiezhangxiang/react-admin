const express = require("express")
const Mock = require("mockjs")
// 生成随机内容的方法
const Random = Mock.Random
// 生成随机的中文
Random.ctitle()
const app = express()
app.use((req, res, next) => {
  //设置响应头 跨域
  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Headers", "content-type,token")
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
  //调用下一个中间件
  next()
})
app.get("/admin/edu/subject/:page/:limit", (req, res) => {
  // 获取查询字符串
  const { page, limit } = req.params
  const subjectData = {
    code: 20000,
    success: true,
    data: Mock.mock({
      // 随机生成总条数（10-20以内的整数）
      total: Random.integer(+limit, limit * page * 3),
      ["items|" + limit]: [
        {
          // id 在原来的基础上面加一
          "_id|+1": 0,
          //
          title: "@ctitle(2,5)",
          parentId: 0,
        },
      ],
    }),
    message: "",
  }
  res.json(subjectData)
})
app.listen(8800, (err) => {
  if (err) {
    return console.log(err)
  }
  return console.log("8800端口监听中，地址:http://localhost:8800")
})
