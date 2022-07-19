import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import qs from 'qs'
import Module from './module'
import { errorCode, baseRouter } from '@/config'
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
      ;(config.headers as AxiosRequestHeaders).token = Token.getUserToken()
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
      }
      return Toast(data.message, { type: 'error' })
    }
    return data
  },
  error => {
    // 请求失败
    try {
      const errorInfo = error.response
      const status = (errorInfo.status || 0) * 1
      Toast(errorInfo.data.message, { type: 'error' })
      switch (status) {
        case 400:
          console.error('400 服务器不理解该请求 ！')
          break
        case 403:
          console.error('403 服务器拒绝该请求 ！')
          break
        case 404:
          console.error('404 服务器找不到该请求 ！')
          break
        case 500:
          console.error('500 系统内部错误 ！')
          break
        default:
          console.error(errorInfo.data.message || '系统错误 ！')
      }
      return Promise.reject(errorInfo)
    } catch (e) {
      Toast('网络开小差啦 ！', { type: 'error' })
      return Promise.reject(new Error('网络开小差啦 ！'))
    }
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
