import React, { Component } from "react"
import { Button, Table } from "antd" //导入Button按钮
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons" //导入antd中的icon
import "./index.less"
// 设置显示table 的列表信息
const columns = [
  { title: "分类名称", dataIndex: "name", key: "name" },

  {
    title: "操作",
    dataIndex: "",
    key: "x",
    width: 200,
    render: () => {
      return (
        <>
          <Button type="primary" style={{ marginRight: 10 }}>
            <FormOutlined />
          </Button>
          <Button type="danger">
            <DeleteOutlined />
          </Button>
        </>
      )
    },
  },
]

const data = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
  },
]
export default class Subject extends Component {
  render() {
    return (
      <div className="subject">
        <Button type="primary" icon={<PlusOutlined />}>
          新建
        </Button>
        <Table
          className="subjectTable"
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={data}
        />
        ,
      </div>
    )
  }
}
