import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import qs from 'qs'
import Module from './module'
import { errorCode, baseRouter, httpCode } from '@/config'
import { Toast, Alert } from '@/utils/toast'
import Token from '@/services/token'
import { TQueryType, THaveCode, TParams, TRequestType, THttpResponse } from './request.d'

const baseURL = process.env.VUE_APP_URL
const env = process.env.NODE_ENV
const headers: AxiosRequestHeaders = {}
headers['Content-Type'] = 'application/json;charset=utf-8'
headers['Access-Control-Allow-Origin'] = '*'

console.log(`${env}：${baseURL}`)

declare module 'axios' {
  export interface AxiosRequestConfig {
    module?: string
    loading?: boolean
    noAccessToken?: boolean
    isForm?: boolean
  }
}

// axios实例
const instance = axios.create({
  withCredentials: true,
  timeout: 15 * 1000,
  headers: {
    ...headers,
    channel: 2
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.noAccessToken) {
      // eslint-disable-next-line
      ;(config.headers as AxiosRequestHeaders).token = Token.getUserToken()
      // eslint-disable-next-line
      ;(config.headers as AxiosRequestHeaders).refreshToken = Token.getSToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<THttpResponse & THaveCode>) => {
    const { data } = response
    const key = data.code.slice(-5)
    if (key !== errorCode.SUCCESS) {
      if (key === errorCode.EXPIRE) {
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('userDetails')
        Alert('登录状态过期，请重新登录 !', { showClose: false }).then(() => {
          window.location.href = baseRouter.LOGIN
        })
      } else {
        Toast(`${data.code}：${data.message}`, { type: 'error' })
      }
      return Promise.reject(new Error(data.message || '请求出错了'))
    }
    return data
  },
  error => {
    const { response } = error
    const resData = response?.data
    let errorMsg = `${response?.status || error.message}：请求出错啦 ~`
    const httpMessage = httpCode.find(item => item.code === response?.status)
    if (httpMessage) {
      errorMsg = httpMessage.message
      console.error(httpMessage.message)
    }
    if (resData?.message && resData?.code) {
      Toast(`${resData.code}：${resData.message}`, { type: 'error', duration: 3000 })
    } else {
      Toast(errorMsg, { type: 'error', duration: 3000 })
    }
    return Promise.reject(response)
  }
)

// 处理Url
function makeUrl(type: TRequestType, module: string, path: string, data: TParams) {
  const query: TQueryType = { ...(data || {}) }
  if (path[0] !== '/') path = `/${path}`
  let url = ''
  env === 'local' ? (url = '/api') : (url = baseURL as string)
  if (type === 'get') {
    url += `${module}${path}?${qs.stringify(query)}`
  } else {
    url += `${module}${path}`
  }
  return url
}

// 请求封装
export default {
  async get<T = TAny>(
    module: Module,
    path: string,
    data?: TDictObject<TAny>,
    config?: Partial<AxiosRequestConfig>
  ) {
    const url = makeUrl('get', module, path, data)
    return instance.get<null, THttpResponse<T>>(url, config)
  },
  async post<T = TAny>(
    module: Module,
    path: string,
    data?: TDictObject<TAny> | null,
    config?: Partial<AxiosRequestConfig>
  ) {
    const url = makeUrl('post', module, path, data)
    return instance.post<null, THttpResponse<T>>(url, data ?? {}, config)
  }
}
