import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Table, Input, Popconfirm, message, Tooltip } from "antd" //导入Button按钮
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons" //导入antd中的icon
import { getSubjectList, getSecSubjectListSync } from "@pages/Edu/Subject/redux"
import { reqUpdateSubject, reqDeleteSubject } from "@api/edu/subject.js"
import "./index.less"

@connect(
  (state) => {
    const { subjectList } = state
    return { subjectList }
  },
  { getSubjectList, getSecSubjectListSync }
)
class Subject extends Component {
  // 设置选中页码数
  currentPge = 1
  currentLimit = 10
  // 设置表格中的数据是否显示input还是展示数据(保存被点击修改那条数据的id)
  state = {
    title: "",
    _id: "",
  }
  componentDidMount() {
    // 发送请求获取第一页的subject的数据
    this.getSubjectList(1, 10)
  }
  // 发送请求获取的subject的数据
  getSubjectList(page, limit) {
    this.currentPge = page
    this.props.getSubjectList(page, limit)
  }
  // 跳转到新增subject界面
  handleToAdd = () => {
    this.props.history.push("/edu/subject/add")
  }
  // 点击列表中的展开图标触发
  handleonExpand = (expanded, record) => {
    //expanded true 展开 flase 关闭  record 点击的那一项列表数据
    if (expanded) {
      this.props.getSecSubjectListSync(record._id)
    }
  }
  //点击修改按钮 显示修改的input框
  handleupdate = (value) => {
    return () => {
      // 调用这个可以重新渲染页面
      this.setState({
        title: value.title,
        _id: value._id,
      })
    }
  }
  // 更新input 变为受控组件
  handleChange = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value,
    })
  }
  // 发送更新请求更新修改数据
  handleUpdate = async () => {
    try {
      // 调用api 更新
      const { title, _id } = this.state
      await reqUpdateSubject(title, _id)
      // 修改成功重新渲染本页面
      this.setState({
        title: "",
        _id: "",
      })
    } catch (error) {}
  }
  // 点击更新操作显示的取消按钮
  handleCancel = () => {
    this.setState({
      title: "",
      _id: "",
    })
  }
  //
  handleDelete = (id) => {
    return async () => {
      try {
        await reqDeleteSubject(id)
        // 重新获取状态数据
        const page =
          this.props.subjectList.items.length >= 2
            ? this.currentPge
            : this.currentPge - 1
        this.getSubjectList(page, this.currentLimit)

        message.success("删除成功")
      } catch (error) {
        message.error("删除失败")
      }
    }
  }
  render() {
    // 设置显示table 的列表信息
    const columns = [
      {
        title: "分类名称",
        // dataIndex: "title",
        key: "title",
        render: (value) => {
          return (
            <>
              {this.state._id === value._id ? (
                <Input
                  className="titleInput"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              ) : (
                value.title
              )}
            </>
          )
        },
      },
      {
        title: "操作",
        dataIndex: "",
        key: "x",
        width: 200,
        render: (value) => {
          if (value._id === this.state._id) {
            return (
              <>
                <Button
                  onClick={this.handleUpdate}
                  style={{ marginRight: 10 }}
                  type="primary"
                >
                  确定
                </Button>
                <Button onClick={this.handleCancel}>取消</Button>
              </>
            )
          } else {
            return (
              <>
                <Tooltip title="编辑">
                  <Button
                    onClick={this.handleupdate(value)}
                    type="primary"
                    style={{ marginRight: 10 }}
                  >
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip style={{ position: "relative" }} title="删除">
                  <Popconfirm
                    title={`是否删除${value.title}?`}
                    // 点击确定按钮触发的回调
                    onConfirm={this.handleDelete(value._id)}
                    // onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button type="danger">
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </>
            )
          }
        },
      },
    ]
    return (
      <div className="subject">
        <Button
          type="primary"
          onClick={this.handleToAdd}
          icon={<PlusOutlined />}
        >
          新建
        </Button>
        <Table
          // 设置表格内行的key属性
          rowKey="_id"
          className="subjectTable"
          columns={columns}
          // 展开项
          expandable={{
            onExpand: this.handleonExpand,
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
              this.currentLimit = size
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
