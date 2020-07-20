import React, { Component } from "react"
import { Card, Radio } from "antd"
import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Legend,
  Annotation,
} from "bizcharts"
// 饼图的数据源
const data = [
  {
    type: "分类一",
    value: 20,
  },
  {
    type: "分类二",
    value: 18,
  },
  {
    type: "分类三",
    value: 32,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "Other",
    value: 15,
  },
]
// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01
// 自定义 other 的图形，增加两条线
registerShape("interval", "sliceShape", {
  draw(cfg, container) {
    const points = cfg.points
    let path = []
    path.push(["M", points[0].x, points[0].y])
    path.push(["L", points[1].x, points[1].y - sliceNumber])
    path.push(["L", points[2].x, points[2].y - sliceNumber])
    path.push(["L", points[3].x, points[3].y])
    path.push("Z")
    path = this.parsePath(path)
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path: path,
      },
    })
  },
})

export default class Serach extends Component {
  state = {
    saleNum: 0, //销售数量
  }

  // 点击图表(每一列)触发的钩子
  handleCharClikc = (event) => {
    const data = event.data.data

    
    this.setState({
      saleNum: data.value + this.state.saleNum,
    })
  }
  render() {
    const extra = (
      <>
        <Radio.Group
          defaultValue="allChannel"
          //   value={this.state.radioValue}
          //   onChange={this.handleRadioChange}
        >
          <Radio.Button value="allChannel">全部渠道</Radio.Button>
          <Radio.Button value="line">线上</Radio.Button>
          <Radio.Button value="store">门店</Radio.Button>
        </Radio.Group>
      </>
    )
    return (
      <div>
        <Card title="销售额类型占比" extra={extra} style={{ marginTop: 20 }}>
          {/* char 所有的图标的外层容器 autoFit 自动适应容器的宽高 */}
          <Chart
            data={data}
            height={500}
            autoFit
            onIntervalClick={this.handleCharClikc}
          >
            {/* Coordinate 坐标系的组件 type  设置坐标系的类型  radius  innerRadius 都是设置半径的 */}
            <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
            {/* Axis 设置是否显示坐标轴 */}
            <Axis visible={false} />
            {/* 设置提示信息 */}
            <Tooltip>
              {(title, items) => {
                console.log(title, items)
                // items 是个数组，即被触发tooltip的数据。
                // 获取items的颜色
                const color = items[0].color
                const data = items[0].data
                return (
                  <>
                    <div style={{ padding: 5 }}>
                      <span
                        style={{
                          borderRadius: "50%",
                          backgroundColor: color,
                          display: "inline-block",
                          width: 7,
                          height: 7,
                          marginRight: 5,
                        }}
                      ></span>
                      <span>
                        {data.type}:{data.value}
                      </span>
                    </div>
                  </>
                )
              }}
            </Tooltip>

            <Interval
              // 定义图表的样式
              adjust="stack"
              // 设置图标展示的值
              position="value"
              // 根据数值定义图标的颜色
              color="type"
              // 将数值映射到图表的方法上面
              shape="sliceShape"
            />
            {/* 设置图表交互效果 */}
            <Interaction type="element-selected" />
            {/* 设置图例 */}
            <Legend position="right-top" />
            {/* 设置图标标注 */}
            <Annotation.Text
              position={["50%", "45%"]}
              content="销售量"
              style={{ textAlign: "center", fontSize: 30, fontWeight: 700 }}
            />
            <Annotation.Text
              position={["50%", "55%"]}
              content={this.state.saleNum}
              style={{ textAlign: "center", fontSize: 20 }}
            />
          </Chart>
        </Card>
      </div>
    )
  }
}
