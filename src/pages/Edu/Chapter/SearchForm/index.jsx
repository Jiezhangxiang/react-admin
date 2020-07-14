import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Form, Select, Button,message } from "antd"
import { reqGetCourse } from "@api/edu/course.js"
import { getChapterList } from "@pages/Edu/Chapter/redux"

import "./index.less"

const { Option } = Select
function SearchForm(props) {
  const [courseList, setCourseList] = useState([])
  const [form] = Form.useForm()
  const resetForm = () => {
    // 重置表单数据
    form.resetFields()
  }
  useEffect(() => {
    // 组件挂载成功发送请求
    async function getCourseList() {
      const result = await reqGetCourse()
      setCourseList(result) // 这个setCourseList是一个类似异步的 不能下面直接courseList获取数据
    }
    getCourseList()
  }, []) // 传递空数组表示是componentDidmount
  // 表单校验成功后触发
  async function handleFinish(value) {
    // 发送请求
    await props.getChapterList({
      page: 1,
      limit: 10,
      courseId: value.teacherId,
    })
    message.success('获取章节信息成功')
  }
  return (
    <Form layout="inline" onFinish={handleFinish} form={form}>
      <Form.Item name="teacherId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map((course) => (
            <Option key={course._id} value={course._id}>
              {course.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null, { getChapterList })(SearchForm)
