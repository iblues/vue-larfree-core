import axios from 'axios'
// import qs from "qs";
import {
  Message
} from 'element-ui'

// const cachios = require('cachios')

const httpInit = function(param) {
  console.log(param.host, '$http.host')
  const Axios = axios.create({
    baseURL: param.host,
    timeout: 40000,
    responseType: 'json',
    withCredentials: false // 不需要cookie
  })

  // const cachiosInstance = cachios.create(Axios, {
  //   stdTTL: 2
  //   // checkperiod: 0,
  // })

  // POST传参序列化(添加请求拦截器)
  Axios.interceptors.request.use(
    config => {
      // 若是有做鉴权token , 就给头部带上token
      if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
        // config.headers.city = localStorage.getItem('cityId');
      }
      return config
    },
    error => {
      Message({
        showClose: true,
        message: error,
        type: 'error.data.error.message'
      })
      return Promise.reject(error.data.error.message)
    }
  )
  Axios.interceptors.response.use(
    res => {
      res = res.data
      return res
    },
    error => {
      if (error.response && error.response.status === 401) {
        // location.href = "/#/login/index";       //bigdata 路由未发生调整,只能暂时通过location处理
        // router.push({
        //     path: "/login/index"
        // });
      } else if (error.message && (error.message.indexOf('timeout') > -1)) {
        Message({
          showClose: true,
          message: '网络请求超时',
          type: 'error'
        })
      } else {
        Message({
          showClose: true,
          message: error.response.data.msg || '网络错误',
          type: 'error'
        })
      }
      // console.info('error.response',error.response);
      // let errorInfo = error.data.error ? error.data.error.message : error.data;
      // let errorInfo = error;
      return Promise.reject(error)
    }
  )
  return Axios
}

export default {
  install: function(Vue, param) {
    const Axios = httpInit(param)
    Object.defineProperty(Vue.prototype, '$http', {
      value: Axios
    })
  }
}
