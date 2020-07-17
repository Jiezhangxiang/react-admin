import React, { useState, useEffect } from "react"
import { Form, Input, Select, Cascader, Button } from "antd"
import { reqGetAllTeacherList } from "@api/edu/teacher"
import { reqGetAllSubjectList } from "@api/edu/subject"
import "./index.less"

const { Option } = Select

function SearchForm() {
  const [form] = Form.useForm()
  const [tearcherList, setTearcherList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false,
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false,
  //   },
  // ])
  const options = subjectList.map((subject) => {
    return {
      value: subject._id,
      label: subject.title,
      isLeaf: false, // false 表示还有二级分类
    }
  })
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1",
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
        },
      ]
      // setOptions([...options])
    }, 1000)
  }

  const resetForm = () => {
    form.resetFields()
  }
  useEffect(() => {
    // 发送请求获取 讲师和分类信息
    async function req() {
      const [tearcher, subject] = await Promise.all([
        reqGetAllTeacherList(),
        reqGetAllSubjectList(),
      ])
      setTearcherList(tearcher)
      setSubjectList(subject)
    }
    req()
  }, [])

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {tearcherList.map((item) => {
            return (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default SearchForm
