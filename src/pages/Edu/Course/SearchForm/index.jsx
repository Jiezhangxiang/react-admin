import React, { useState, useEffect } from "react"
import { Form, Input, Select, Cascader, Button, message } from "antd"
import { connect } from "react-redux"
// 解析app 组件中传递过来的 自定义语音包 的组件
import { FormattedMessage, useIntl } from "react-intl"
import { reqGetAllTeacherList } from "@api/edu/teacher"
import { reqGetAllSubjectList, reqGetSecSubject } from "@api/edu/subject"
import { getCouseLimit } from "../redux/index"
import "./index.less"

const { Option } = Select

function SearchForm(props) {
  const [form] = Form.useForm()
  const [tearcherList, setTearcherList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  // 得到一个可以解析 自定义语言包的方法
  const intl = useIntl()
  // 点击分类下拉框会触发这个回调函数
  const onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions)
  }

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    // 设置 Cascader 组件中加载的小图标
    targetOption.loading = true
    const result = await reqGetSecSubject(targetOption.value)
    const secSubjectList = result.items.map((item) => ({
      label: item.title,
      value: item._id,
    }))
    // 关闭 Cascader 组件中加载的小图标
    targetOption.loading = false
    if (secSubjectList.length > 0) {
      targetOption.children = [...secSubjectList]
    } else {
      // 一级分类下面没有二级分类
      targetOption.isLeaf = true
    }

    // subjectList 里面的值实际已经改变了  但是没有调用setSubjectList 所以页面不会重新渲染
    setSubjectList([...subjectList])
  }

  const resetForm = () => {
    form.resetFields()
  }
  // 表单校验完毕点击查询按钮触发对的回调
  const handlFinish = async (value) => {
    console.log(value, "查询")
    let subjectParentId = ""
    let subjectId = ""
    if (value.subject && value.subject.length > 1) {
      subjectParentId = value.subject[0]
      subjectId = value.subject[1]
    }
    if (value.subject && value.subject.length === 1) {
      subjectParentId = 0
      subjectId = value.subject[0]
    }

    const result = await props.getCouseLimit({
      page: 1,
      limit: 5,
      teacherId: value.teacherId,
      subjectId,
      subjectParentId,
      title: value.title,
    })
    message.success("获取课程数据成功")
  }
  useEffect(() => {
    // 发送请求获取 讲师和分类信息
    async function req() {
      const [tearcher, subject] = await Promise.all([
        reqGetAllTeacherList(),
        reqGetAllSubjectList(),
      ])
      // 将获取到一级分类数据加工成功需要渲染的页面格式
      const options = subject.map((item) => {
        return {
          value: item._id,
          label: item.title,
          isLeaf: false, // false 表示还有二级分类
        }
      })
      setTearcherList(tearcher)
      setSubjectList(options)
    }
    req()
  }, [])

  return (
    <Form layout="inline" form={form} onFinish={handlFinish}>
      <Form.Item name="title" label={<FormattedMessage id="title" />}>
        <Input
          placeholder={intl.formatMessage({ id: "title" })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({ id: "teacher" })}
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
      <Form.Item name="subject" label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({ id: "subject" })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          <FormattedMessage id="searchBtn" />
        </Button>
        <Button onClick={resetForm}>
          {intl.formatMessage({ id: "resetBtn" })}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null, { getCouseLimit })(SearchForm)
