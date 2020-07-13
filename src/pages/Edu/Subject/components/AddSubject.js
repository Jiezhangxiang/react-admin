import React, { useEffect, useState } from "react"
import { Card, Form, Select, Input, Button, message } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { reqGetSubject, reqAddSubject } from "@api/edu/subject"
import "./index.less"
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 },
}
function AddSubject(props) {
  // 定义 subjectList 和定义修改subjectList的方法
  // 初始化 subjectList
  const [subjectList, setSubjectList] = useState({
    total: 0,
    items: [],
  })
  // select 下拉框加载的页码数
  let page = 1
  useEffect(() => {
    // 发送请求获取第一页的父级id
    reqGetSubject(page++, 10).then((result) => {
      setSubjectList({ ...result })
    })
  }, [])
  // 提交from表单的数据 并且表单校验成功后触发
  async function handleFinish(values) {
    //values 表单里面的数据
    try {
      const result = await reqAddSubject(values.subjectname, values.subjectFId)
      if (result._id) {
        props.history.push("/edu/subject/list")
        message.success("添加课程成功")
      }
    } catch (error) {
      // console.log(error);
      message.error("添加课程失败")
    }
  }
  // select 下拉框显示更多的数据
  async function handleMore() {
    const result = await reqGetSubject(++page, 10)
    setSubjectList({
      total: result.total,
      items: [...subjectList.items, ...result.items],
    })  
  }
  return (
    <div>
      <Card
        title={
          <Link to="/edu/subject/list">
            <ArrowLeftOutlined />
            <span className="addSubject">新增课程分类</span>
          </Link>
        }
      >
        <Form {...layout} onFinish={handleFinish}>
          <Form.Item
            name="subjectname"
            label="课程分类名称"
            rules={[
              {
                type: "string",
                min: 2,
                max: 8,
                required: true,
                message: "课程分类名称长度为2-8个字节",
              },
            ]}
          >
            <Input placeholder="请输入课程分类名称" />
          </Form.Item>
          <Form.Item
            name="subjectFId"
            label="父级id"
            rules={[{ required: true, message: "请选择父级id" }]}
          >
            <Select
              dropdownRender={(menu) => {
                return (
                  <>
                    {/* menu 显示的是所有的option组件内容 */}
                    {menu}
                    {subjectList.total > subjectList.items.length && (
                      <Button type="link" onClick={handleMore}>
                        查看更多数据
                      </Button>
                    )}
                  </>
                )
              }}
            >
              <Select.Option value={0} key={0}>
                一级分类
              </Select.Option>
              {subjectList.items.map((item) => {
                return (
                  <Select.Option value={item._id} key={item._id}>
                    {item.title}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </Form>
      </Card>
    </div>
  )
}
export default AddSubject
