import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Table } from "antd" //导入Button按钮
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons" //导入antd中的icon
import { reqGetSubject } from "@api/edu/subject"
import { getSubjectList } from "@pages/Edu/Subject/redux"
import "./index.less"

// 设置显示table 的列表信息
const columns = [
  { title: "分类名称", dataIndex: "title", key: "title" },

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

@connect(
  (state) => {
    const { subjectList } = state
    return { subjectList }
  },
  { getSubjectList }
)
class Subject extends Component {
  // 设置选中页码数
  currentPge = 1
  componentDidMount() {
    // 发送请求获取第一页的subject的数据
    this.getSubjectList(1, 10)
  }
  // 发送请求获取的subject的数据
  getSubjectList(page, limit) {
    this.currentPge = page
    this.props.getSubjectList(page, limit)
  }
  render() {
    return (
      <div className="subject">
        <Button type="primary" icon={<PlusOutlined />}>
          新建
        </Button>
        <Table
          // 设置表格内行的key属性
          rowKey="_id"
          className="subjectTable"
          columns={columns}
          // 展开项
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          // 需要展示的内容数据
          dataSource={this.props.subjectList.items}
          // position={[bottomRight]}
          pagination={{
            // 控制选中的页码数
            current: this.currentPge,
            total: this.props.subjectList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions: ["5", "10", "15", "20"], //设置每天显示数据数量的配置项
            defaultPageSize: 10, //每页默认显示数据条数 默认是10,
            onChange: (page, size) => {
              this.getSubjectList(page, size)
            }, //页码改变的时候触发,
            onShowSizeChange: (current, size) => {
              this.getSubjectList(current, size)
            }, //一页展示几条数据变化时触发 current 当前页码, size 一页}}
          }}
        />
      </div>
    )
  }
}
export default Subject
