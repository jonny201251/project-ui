import request from 'umi-request'
import { Modal } from 'antd'
import { history } from 'umi'
import * as utils from '../utils'

export function get(url, params) {
  if (!url) {
    Modal.error({ content: '缺少url', okText: '知道了' })
    return
  }
  return request.get(url, { params: params }).then(res => {
    if (res.msg === '用户未登录') {
      history.push('/login')
    } else if (res.code === 200) {
      return res.data
    } else {
      Modal.error({ content: res.msg || '操作失败', okText: '知道了' })
    }
  }).catch(err => {
    // Modal.error({ content: '系统错误', okText: '知道了' })
  })
}

export function post(url, values) {
  if (!url) {
    Modal.error({ content: '缺少url', okText: '知道了' })
    return
  }
  return request.post(url, { data: values }).then(res => {
    if (res.msg === '用户未登录') {
      history.push('/login')
    } else if (res.code === 200) {
      return res.data
    } else {
      Modal.error({ content: res.msg || '操作失败', okText: '知道了' })
    }
  }).catch(err => {
    // Modal.error({ content: '系统错误', okText: '知道了' })
  })
}

export async function proTableRequest(params, sorter, filter) {
  let url=params.list
  delete params.list
  const data = await post(url, params)
  if (data) {
    if (data.dataList) {
      return { success: true, data: data.dataList, total: data.total, page: data.totalPage }
    } else {
      return { success: true, data: data, total: data.length, page: 1 }
    }
  }
}

Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

export function getTodayDate() {
  //今天日期
  let date = new Date()
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

