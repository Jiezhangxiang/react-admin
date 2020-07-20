import React, { Component } from "react"
import { Card, DatePicker, Button } from "antd"
import moment from "moment"
const { RangePicker } = DatePicker
const tabListNoTitle = [
  {
    key: "scale",
    tab: "销售量",
  },
  {
    key: "visit",
    tab: "访问量",
  },
]

const contentListNoTitle = {
  scale: <p>销售量...</p>,
  visit: <p>访问量...</p>,
}
export default class Scale extends Component {
  state = {
    key: "scale",
    flageDate: "day", // day week month year
    rangeDate: [], //存储 RangePicker 里面需要的数据
  }
  // 点击选项卡片会触发的回调
  onTabChange = (key) => {
    console.log(key)
    this.setState({ key })
  }
  // 点击选择日期按钮触发
  handleClikBtn = (flageDate) => () => {
    let rangeDate
    switch (flageDate) {
      case "day":
        rangeDate = [moment(), moment()]
        break
      case "week":
        rangeDate = [moment(), moment().add(1, "w")]
        break
      case "month":
        rangeDate = [moment(), moment().add(1, "M")]
        break

      case "year":
        rangeDate = [moment(), moment().add(1, "y")]
        break

      default:
        rangeDate = this.state.rangeDate
    }
    this.setState({
      rangeDate,
      flageDate,
    })
  }
  // 点击时间日历里面的时会触发
  handleRangeChange = (rangeDate) => {
    // rangeDate 点击选中的时间
    this.setState({
      rangeDate,
    })
  }
  render() {
    const { flageDate, rangeDate } = this.state
    const exact = (
      <>
        <Button
          onClick={this.handleClikBtn("day")}
          type={flageDate === "day" ? "link" : "text"}
        >
          今日
        </Button>
        <Button
          onClick={this.handleClikBtn("week")}
          type={flageDate === "week" ? "link" : "text"}
        >
          本周
        </Button>
        <Button
          onClick={this.handleClikBtn("month")}
          type={flageDate === "month" ? "link" : "text"}
        >
          本月
        </Button>
        <Button
          onClick={this.handleClikBtn("year")}
          type={flageDate === "year" ? "link" : "text"}
        >
          今年
        </Button>
        {/* rangeDate 一个数组 数组中一个数表示起始时间 第二个数表示结束时间 */}
        <RangePicker onChange={this.handleRangeChange} value={rangeDate} />
      </>
    )
    return (
      <div>
        <Card
          style={{ width: "100%" }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.key}
          tabBarExtraContent={exact}
          onTabChange={this.onTabChange}
        >
          {contentListNoTitle[this.state.key]}
        </Card>
      </div>
    )
  }
}
