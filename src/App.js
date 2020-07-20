import React, { useState, useEffect } from "react"
import { Router } from "react-router-dom"
import pubSub from "pubsub-js"
import history from "@utils/history"
// 引入全局自定义国际需要的组件
import { IntlProvider } from "react-intl"
// 引入 antd 国际化配置组件
import { ConfigProvider } from "antd"
// antd 配置语言包
import zhCN from "antd/es/locale/zh_CN"
import enUS from "antd/es/locale/en_US"
// 引入自定义的语言包
import { zh, en } from "./locales/index"
import Layout from "./layouts"
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css"
function App() {
  const [locale, setLocale] = useState("zh")
  const [messages, setMessages] = useState(zh)
  const [locale1,setLocale1]= useState(zhCN)
  useEffect(() => {
    pubSub.subscribe("setLocaleMessages", (message, data) => {
      console.log(data);
      if (data === "zh") {
        setLocale("zh")
        setMessages(zh)
        setLocale1(enUS)
      }
      if (data === "en") {
       
        setLocale("en")
        setMessages(en)
        setLocale1(enUS)
      }
    })
    return () => {
      pubSub.unsubscribe("setLocaleMessages")
    }
  })
  return (
    <Router history={history}>
      <ConfigProvider locale={locale1}>
        {/* locale 表示语言环境 message 表示选择的语言包  */}
        <IntlProvider locale={locale} messages={messages}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  )
}

export default App
