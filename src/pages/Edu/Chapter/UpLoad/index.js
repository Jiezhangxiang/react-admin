import React, { Component } from "react"
import { Button, message, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import * as qiniu from "qiniu-js"
import { nanoid } from "nanoid"
import { reqGetQiNIUYunToken } from "@api/edu/lesson"
export default class Myupload extends Component {
  constructor() {
    super()
    // 从缓存中拿到token
    const res = JSON.parse(localStorage.getItem("QINIUYUN_OBJ"))
    if (res) {
      // 拿到就存储到state中
      this.state = { ...res }
    } else {
      // 不存在就先初始化 expires 过期时间
      this.state = { uploadToken: "", expires: 0 }
    }
  }
  // 视频选中上传之前触发
  handleBeforeUpload = (file, fileList) => {
    // file 包含上传文件的信息, fileList包含上传文件的数组
    // 视频大小不能超过20m
    return new Promise(async (resolve, reject) => {
      const videoSize = 20 * 1024 * 1024
      if (videoSize >= file.size) {
        // 判断 uploadToken 是否过期了
        const date = Date.now()
        if (date > this.state.expires) {
          // toekn 过期或者没有token
          // 调用获取token的方法
          const { uploadToken, expires } = await reqGetQiNIUYunToken()
          this.saveuploadToken(uploadToken, expires)
        }
        resolve(file)
      } else {
        message.error("视频大小不能操作20M")
        reject()
      }
    })
  }
  // 将token保存到状态数据中和缓存内
  saveuploadToken(uploadToken, expires) {
    // 过期时间
    const targetExpires = expires * 1000 + Date.now()
    // 存储到状态数据中
    this.setState({
      expires: targetExpires,
      uploadToken,
    })
    // 存储到缓存内
    localStorage.setItem(
      "QINIUYUN_OBJ",
      JSON.stringify({
        expires: targetExpires,
        uploadToken,
      })
    )
  }
  // handleBeforeUpload 函数返回true 或成功的promies执行 上传文件
  handleCustomRequest = (vlaue) => {
    const file = vlaue.file // 上传的文件
    const key = nanoid(20) + 'xiaobaicai' //上传的文件名
    const token = this.state.uploadToken // 七牛云的token
    const putExtra = { mimeType: "video/*" } // 设置上传的格式
    const config = { region: qiniu.region.z2 } // 设置上传区域
    const observable = qiniu.upload(file, key, token, putExtra, config)
    const observer = {
      next(res) {
        // ...视频上传中触发
        vlaue.onProgress(res.total)
      },
      error(err) {
        // ...视频上传失败触发
        vlaue.onError(err)
      },
      complete: (res) => {
        // ...视频上传成功触发
        vlaue.onSuccess(res)
        // from表单中的from.item组件会给子组件传递一个onChange方法
        // 这个组件是自定义组件所以需要手动的调用
        const videoUrl = "http://qdcdb1qpp.bkt.clouddn.com/" + res.key
        this.props.onChange(videoUrl)
      },
    }
    this.subscription = observable.subscribe(observer) // 上传开始
  }
  componentWillUnmount() {
    // 组件卸载取消上传视频
    this.subscription && this.subscription.unsubscribe()
  }
  render() {
    return (
      <>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
          accept="video/*"
        >
          <Button>
            <UploadOutlined /> 上传课时视频
          </Button>
        </Upload>
      </>
    )
  }
}
