import React, { Component } from "react"
import { Tabs, Radio, Card } from "antd"
import { RingProgressChart } from "bizcharts"
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from "bizcharts"
const { TabPane } = Tabs
export default class Static extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: "top",
    }
  }
  handleModeChange = (e) => {
    const mode = e.target.value
    this.setState({ mode })
  }
  render() {
    const { mode } = this.state
    // 折线图数据源
    const data = [
      {
        month: "Jan",
        city: "Tokyo",
        temperature: 7,
      },
      {
        month: "Jan",
        city: "London",
        temperature: 3.9,
      },
      {
        month: "Feb",
        city: "Tokyo",
        temperature: 6.9,
      },
      {
        month: "Feb",
        city: "London",
        temperature: 4.2,
      },
      {
        month: "Mar",
        city: "Tokyo",
        temperature: 9.5,
      },
      {
        month: "Mar",
        city: "London",
        temperature: 5.7,
      },
      {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5,
      },
      {
        month: "Apr",
        city: "London",
        temperature: 8.5,
      },
      {
        month: "May",
        city: "Tokyo",
        temperature: 18.4,
      },
      {
        month: "May",
        city: "London",
        temperature: 11.9,
      },
      {
        month: "Jun",
        city: "Tokyo",
        temperature: 21.5,
      },
      {
        month: "Jun",
        city: "London",
        temperature: 15.2,
      },
      {
        month: "Jul",
        city: "Tokyo",
        temperature: 25.2,
      },
      {
        month: "Jul",
        city: "London",
        temperature: 17,
      },
      {
        month: "Aug",
        city: "Tokyo",
        temperature: 26.5,
      },
      {
        month: "Aug",
        city: "London",
        temperature: 16.6,
      },
      {
        month: "Sep",
        city: "Tokyo",
        temperature: 23.3,
      },
      {
        month: "Sep",
        city: "London",
        temperature: 14.2,
      },
      {
        month: "Oct",
        city: "Tokyo",
        temperature: 18.3,
      },
      {
        month: "Oct",
        city: "London",
        temperature: 10.3,
      },
      {
        month: "Nov",
        city: "Tokyo",
        temperature: 13.9,
      },
      {
        month: "Nov",
        city: "London",
        temperature: 6.6,
      },
      {
        month: "Dec",
        city: "Tokyo",
        temperature: 9.6,
      },
      {
        month: "Dec",
        city: "London",
        temperature: 4.8,
      },
    ]
    const cols = {
      month: {
        range: [0, 1],
      },
    }
    // 鼠标移动在折线图上面显示的图例信息
    const containerTpl = `    <div class="g2-tooltip">
  <div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>
  <table>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>名称</th>
        <th>值</th>
      </tr>
    </thead>
    <tbody class="g2-tooltip-list"></tbody>
  </table>
</div>`
    const itemTpl = ` <tr data-index={index}>
     <td>
       <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
     </td>
     <td>{name}</td>
     <td>{value}</td>
   </tr>`

    // 显示迷你饼图
    const CartTitle = (
      <>
        <Radio.Group
          onChange={this.handleModeChange}
          value={mode}
          style={{ marginBottom: 8 }}
        ></Radio.Group>
        <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 600 }}>
          {[...Array(30).keys()].map((i) => (
            <TabPane
             
              tab={
                <>
                  <div style={{ fontWeight: "bold" }}>Tab-{i}</div>
                  <RingProgressChart
                    width={50}
                    height={50}
                    percent={Math.random()}
                  />
                </>
              }
              key={i}
              disabled={i === 28}
            >
              {/* 折线统计图 */}
              <Chart height={500} padding="0" data={data} scale={cols}  autoFit>
                <Legend />
                <Axis name="month" />
                <Axis
                  name="temperature"
                  label={{
                    formatter: (val) => `${val}°C`,
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: "y",
                  }}
                  custom={true}
                  containerTpl={containerTpl}
                  itemTpl={itemTpl}
                />
                <Geom
                  type="line"
                  position="month*temperature"
                  size={2}
                  color={"city"}
                  shape={"smooth"}
                />
                <Geom
                  type="point"
                  position="month*temperature"
                  size={4}
                  shape={"circle"}
                  color={"city"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1,
                  }}
                />
              </Chart>
            </TabPane>
          ))}
        </Tabs>
      </>
    )

    return (
      <div style={{ marginTop: 20 }}>
        <Card title={CartTitle}></Card>
      </div>
    )
  }
}
