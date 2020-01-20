import Axios from 'axios'
import { Message } from 'element-ui'
import { baseURL } from '@/config'

class HttpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
    return config
  }

  // 销毁请求实例
  destory (url) {
    delete this.queue[url]
    // 请求队列中有请求
    if (!Object.keys(this.queue).length) {
      // 做一些处理，例如Spin.hide
    }
  }

  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 添加全局loading
      if (!Object.keys(this.queue).length) {
        // Spin.hide
      }
      // 存入队列
      this.queue[url] = true
      return config
    }, error => {
      // 对错误请求做些什么
      return Promise.reject(error)
    })
    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      this.destory(url)
      let { data, status } = res
      return { data, status }
    }, (error) => {
      this.destory(url)
      Message.error('服务器内部错误')
      // 对响应错误做些什么
      return Promise.reject(error)
    })
  }

  // 请求实例
  request (options) {
    let instance = Axios.create({
      baseURL,
      timeout: 5000
    })
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    console.log(options)
    return instance(options)
  }
}

const axios = new HttpRequest()
export default axios
