import React, { Component } from "react"

import { Row, Col, Statistic, Progress } from "antd"
import {
  CaretUpOutlined,
  CaretDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons"
// 面积图表
import { AreaChart, ColumnChart } from "bizcharts"
import Card from "@comps/Card"


const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
}

export default class Analysis extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 2000)
  }

  render() {
    const { loading } = this.state
    // 面积图数据源
    const data = [
      { year: "1991", value: 3 },
      { year: "1992", value: 4 },
      { year: "1993", value: 3.5 },
      { year: "1994", value: 5 },
      { year: "1995", value: 4.9 },
      { year: "1996", value: 6 },
      { year: "1997", value: 7 },
      { year: "1998", value: 9 },
      { year: "1999", value: 13 },
    ]
    // 柱状图数据源
    const ColumnChartData = [
      {
        type: "家具家电",
        sales: 38,
      },
      {
        type: "粮油副食",
        sales: 52,
      },
      {
        type: "生鲜水果",
        sales: 61,
      },
      {
        type: "美容洗护",
        sales: 145,
      },
      {
        type: "母婴用品",
        sales: 48,
      },
      {
        type: "进口食品",
        sales: 38,
      },
      {
        type: "食品饮料",
        sales: 38,
      },
      {
        type: "家庭清洁",
        sales: 38,
      },
    ]
    return (
      <Row gutter={24}>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="总销售额" prefix="￥" value={112893} />}
            prefix="￥"
            value="100"
            footer={<span>日销售额 ￥121314</span>}
            loading={loading}
          >
            <span style={{ marginRight: 10 }}>
              日同比:&nbsp;&nbsp;12%&nbsp;
              <CaretUpOutlined style={{ color: "red" }} />
            </span>
            <span>
              日周比:&nbsp;&nbsp;10%&nbsp;
              <CaretDownOutlined style={{ color: "hotPink" }} />
            </span>
          </Card>
        </Col>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="总销售额" prefix="￥" value={112893} />}
            footer={<span>日销售额 ￥121314</span>}
          >
            <AreaChart
              data={data}
              // title={{
              //   visible: true,
              //   text: '面积图',
              // }}
              xField="year"
              yField="value"
              // 去除横纵坐标条
              xAxis={{ visible: false }}
              yAxis={{ visible: false }}
              // 图表设置是否圆滑
              smooth={true}
              // 图表的宽高默认为容器的宽高 自定义的宽高会失效
              forceFit={true}
              // 默认存在一个padding
              padding="0"
            />
          </Card>
        </Col>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="支付总数" value={112893} />}
            footer={<span>转化率 30%</span>}
          >
            <ColumnChart
              data={ColumnChartData}
              // title={{
              //   visible: true,
              //   text: "基础柱状图",
              // }}
              forceFit
              padding="auto"
              xField="type"
              yField="sales"
              xAxis={{ visible: false }}
              yAxis={{ visible: false }}
              meta={{
                type: {
                  alias: "类别",
                },
                sales: {
                  alias: "销售额(万)",
                },
              }}
              padding="0"
            />
          </Card>
        </Col>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="运营结果"  suffix="%"  value={80.9} />}
            footer={<span>转化率 80.9%</span>}
          >
            <Progress
              strokeColor={{
                from: "#108ee9",
                to: "#87d068",
              }}
              percent={80.9}
              status="active"
             
            />
          </Card>
        </Col>
      </Row>
    )
  }
}
