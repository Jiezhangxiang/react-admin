import React, { Component } from "react"
import {
  Button,
  message,
  Tooltip,
  Modal,
  Alert,
  Table,
  Input,
  Switch,
} from "antd"
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"

import { connect } from "react-redux"
// 引入知乎的视频预览组件
import Player from "griffith"
import SearchForm from "./SearchForm"
import {
  getLessonList,
  batchRemoveLesson,
  batchRemoveChapter,
} from "@pages/Edu/Chapter/redux"
import { reqDeleteLesson } from "@api/edu/lesson"

import "./index.less"
const { confirm } = Modal
dayjs.extend(relativeTime)

@connect(
  (state) => ({
    chapterList: state.chapterList,
  }),
  { getLessonList, batchRemoveLesson, batchRemoveChapter }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [], // 保存所有被选中的数据的id
    lessonId: "", // 保存被点击跟新课时的id
    lessonName: "",
    lessonFree: false, // 是否免费
  }

  // 视频预览的模态框显示
  showModal = (value) => () => {
    this.setState({
      previewVisible: true,
      previewImage: value.video,
    })
  }

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    })
  }

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    })

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      })
    })
  }

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据")
          return
        }
        message.success("获取用户列表数据成功")
      })
  }
  // 点击选中章节按钮触发的钩子
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    })
    let newSelectedRowKeys = [...selectedRowKeys]
    this.chapterIds = []
    this.lessonIds = []
    const chapterList = this.props.chapterList.items
    chapterList.forEach((chapter) => {
      const index = newSelectedRowKeys.indexOf(chapter._id)
      if (index > -1) {
        this.chapterIds.push(newSelectedRowKeys[index]) // 回改变原来的数组
        newSelectedRowKeys.splice(index, 1) // 返回的是一个新数组
      }
    })
    this.lessonIds = newSelectedRowKeys
  }
  // 点击课程列表的加号按钮显示对应的课时
  handleOnExpand = (expanded, record) => {
    // expanded true表示展开 false 闭合 , record 点击这一项的数据
    if (expanded === true) {
      // 展开
      this.props.getLessonList(record._id)
    }
  }
  // 点击更新按钮触发的钩子
  handleUpdateBtn = (value) => () => {
    this.setState({
      ...this.state,
      lessonId: value._id,
      lessonName: value.title,
      lessonFree: value.free,
    })
  }
  // 发送请求跟新课时信息
  handleUpdate = () => {}
  // input 和 switch 受控组件
  handleChange = (value) => (e) => {
    // 注意 switch 组件中的 事件处理函数第一个参数是checked的值
    if (value === "checked") {
      this.setState({
        ...this.state,
        lessonFree: e,
      })
    } else {
      this.setState({
        ...this.state,
        lessonName: e.target.value,
      })
    }
  }
  // 取消更新课时信息
  handleCancel = () => {
    this.setState({
      ...this.state,
      lessonId: "",
      lessonName: "",
      lessonFree: false,
    })
  }
  // 跳转到添加lesson界面
  handleToAddLesson = (value) => () => {
    this.props.history.push("/edu/chapter/addLesson", value)
  }
  // 删除
  handleDelte = (data) => () => {
    console.log(data)
    confirm({
      title: `你确定要删除${data.title}吗?`,
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk: async () => {
        console.log(data)
        // 发送请求
        await reqDeleteLesson(data._id)
        // 重新获取数据 chapterId
        this.props.getLessonList(data.chapterId)
      },
      // onCancel() {
      //   console.log("Cancel")
      // },
    })
  }
  // 点击批量删除按钮 弹出对话框
  handleSelectDel = () => {
    confirm({
      title: `你确定要删除选中的数据吗?`,
      icon: <ExclamationCircleOutlined />,
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk: async () => {
        // 发送请求删除选中的lesson和chapter
        await this.props.batchRemoveLesson(this.lessonIds)
        await this.props.batchRemoveChapter(this.chapterIds)
        message.success("批量删除成功")
      },
    })
  }

  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state
    //视频展时组件player需要使用的配置属性
    const sources = {
      hd: {
        // play_url: this.state.video,
        play_url: previewImage,
        bitrate: 1,
        duration: 1000,
        format: "",
        height: 500,
        size: 160000,
        width: 500,
      },
    }
    const columns = [
      {
        title: "章节名称",
        // dataIndex: "title",
        render: (value) => {
          // console.log(value)
          if (value._id === this.state.lessonId) {
            return (
              <>
                <Input
                  style={{ width: 300 }}
                  onChange={this.handleChange("value")}
                  value={this.state.lessonName}
                ></Input>
              </>
            )
          } else {
            return value.title
          }
        },
      },
      {
        title: "是否免费",
        // dataIndex: "free",
        render: (value) => {
          if (value._id === this.state.lessonId) {
            return (
              <Switch
                checkedChildren="是"
                onChange={this.handleChange("checked")}
                unCheckedChildren="否"
                checked={this.state.lessonFree}
                defaultChecked
              />
            )
          } else {
            return value.free === true ? "是" : value.free === false ? "否" : ""
          }
        },
      },
      {
        title: "视频",
        render: (value) => {
          if (value.free) {
            // 是课时信息 并且课时视频免费才展示
            return (
              <>
                <Button onClick={this.showModal(value)}>预览</Button>
              </>
            )
          } else {
            return
          }
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          if ("free" in data) {
            // data中是否含有 "free" 属性
            if (data._id === this.state.lessonId) {
              return (
                <>
                  <Button
                    onClick={this.handleUpdate}
                    style={{ marginRight: 15 }}
                    type="primary"
                  >
                    确定
                  </Button>
                  <Button onClick={this.handleCancel}>取消</Button>
                </>
              )
            } else {
              return (
                <div>
                  <Tooltip title="更新课时">
                    <Button
                      type="primary"
                      onClick={this.handleUpdateBtn(data)}
                      style={{ marginRight: 10 }}
                    >
                      <FormOutlined />
                    </Button>
                  </Tooltip>
                  <Tooltip title="删除课时">
                    <Button type="danger" onClick={this.handleDelte(data)}>
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </div>
              )
            }
          } else {
            return (
              <div>
                <Tooltip title="添加课时">
                  <Button type="primary" onClick={this.handleToAddLesson(data)}>
                    <PlusOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="更新章节">
                  <Button
                    type="primary"
                    // onClick={this.handleUpdateBtn(data)}
                    style={{ margin: "0 10px" }}
                  >
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="删除章节">
                  <Button type="danger">
                    {/* onClick={this.handleDelte(data)} */}
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </div>
            )
          }
        },
      },
    ]

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button
                type="danger"
                onClick={this.handleSelectDel}
                style={{ marginRight: 10 }}
              >
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable={{
              // 点击加号按钮展开触发
              onExpand: this.handleOnExpand,
            }}
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          title="视频预览"
          onCancel={this.handleImgModal}
          // 模态框关闭销毁里面的子元素
          destroyOnClose={true}
        >
          <Player
            sources={sources}
            id={"1"}
            cover={"http://localhost:3000/logo512.png"}
            duration={1000}
          />
        </Modal>
      </div>
    )
  }
}

export default Chapter
