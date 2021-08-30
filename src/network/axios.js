import axios from 'axios'
import Vue from 'vue'
//顶部进度条
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export default function(){
  axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
  //在request拦截器中展示进度条
  axios.interceptors.request.use(config =>{
    config.headers.Authorization = window.sessionStorage.getItem('token')
    Nprogress.start()
    return config
  })
  axios.interceptors.response.use(config =>{
    Nprogress.done()
    return config
  })
  //在response拦截器中隐藏进度条
  Vue.prototype.$http = axios
}
