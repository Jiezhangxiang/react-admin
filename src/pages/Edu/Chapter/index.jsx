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
import SearchForm from "./SearchForm"
import { getLessonList } from "@pages/Edu/Chapter/redux"
import { reqDeleteLesson } from "@api/edu/lesson"

import "./index.less"
const { confirm } = Modal
dayjs.extend(relativeTime)

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList,
  }),
  { getLessonList }
  // { getcourseList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    lessonId: "", // 保存被点击跟新课时的id
    lessonName: "",
    lessonFree: false, // 是否免费
  }

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      })
    }
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

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    })
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

  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state

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
                  <Tooltip title="查看详情">
                    <Button>
                      <SettingOutlined />
                    </Button>
                  </Tooltip>
                  <Tooltip title="更新课时">
                    <Button
                      type="primary"
                      onClick={this.handleUpdateBtn(data)}
                      style={{ margin: "0 10px" }}
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
                  <Button type="danger" >
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
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
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
              <Button type="danger" style={{ marginRight: 10 }}>
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
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default Chapter
