import React, { useEffect, useState } from "react"
import { Card, Form, Input, Button, message, Switch } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import Myupload from "../UpLoad"
import { reqAddLesson } from "@api/edu/lesson"
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 },
}
function AddLesson(props) {
  // 提交from表单的数据 并且表单校验成功后触发
  async function handleFinish(values) {
    const newLesson = {
      chapterId: props.location.state._id,
      title: values.lessonTitle,
      free: values.free,
      video: values.video,
    }
    try {
      // 发送请求添加lesson
      await reqAddLesson(newLesson)
      message.success("添加课时成功")
      props.history.push("/edu/chapter/list")
    } catch (error) {
      message.error("添加课时失败")
    }
  }
  return (
    <div>
      <Card
        title={
          <Link to="/edu/chapter/list">
            <ArrowLeftOutlined />
            <span style={{ marginLeft: 15 }} className="addLesson">
              新增课时
            </span>
          </Link>
        }
      >
        <Form
          {...layout}
          onFinish={handleFinish}
          // 设置表单项的默认值
          initialValues={{ free: true }}
        >
          <Form.Item
            name="lessonTitle"
            label="课时名称"
            rules={[
              {
                type: "string",
                min: 2,
                max: 8,
                required: true,
                message: "课时名称长度为2-8个字节",
              },
            ]}
          >
            <Input placeholder="请输入课时名称" />
          </Form.Item>
          <Form.Item name="free" label="是否免费" valuePropName="checked">
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            name="video"
            label="课时视频"
            rules={[
              {
                required: true,
                message: "请上传课时视频",
              },
            ]}
          >
            <Myupload />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default AddLesson
