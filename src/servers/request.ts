import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast, Alert } from '@/utils/toast'
import { superLocal, superSession } from '@/utils/storage'
import { HTTP_CODE } from '@/constant'
import { THttpResponse } from '@/types/common'

export const createAxiosExamples = (config?: AxiosRequestConfig): AxiosInstance => {
	const instance = axios.create({
		baseURL: process.env.VITE_API_URL,
		timeout: 1000 * 30, // 超时
		withCredentials: true, // 跨域携带cookie
		headers: { 'Content-Type': 'application/json' }, // 请求头
		...config // 自定义配置
	})

	// 请求拦截器
	instance.interceptors.request.use(
		(config) => {
			const T = superLocal.get('token')
			if (T) {
				config.headers.common['Authorization'] = `Bearer ${T}`
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	// 响应拦截器
	instance.interceptors.response.use(
		// 成功
		(response: AxiosResponse<TDict, THttpResponse>) => {
			const res = response.data
			const code = response.data.code
			if (res instanceof Blob) return res
			if (code === 401) {
				Alert('登录状态已过期，请重新登录', { confirmButtonText: '确定' })
					.then(() => {
						// 清除浏览器全部缓存
						superLocal.clear()
            superSession.clear()
						window.location.href = '/' // 去登录页
					})
					.catch(() => {})
			} else if (code !== 0) {
				Toast(res.message, { type: 'error' })
				return Promise.reject(new Error(res.message))
			}
			return res
		},
		// 失败
		(error) => {
			const { response, message } = error
			const resData = response?.data
			let errorMsg = `${response?.status || error.message}：请求出错啦 ~`
			const httpMessage = HTTP_CODE.find((item) => item.code === response?.status)
			if (httpMessage) errorMsg = httpMessage.message
			// 处理报错提示
			if (message.indexOf('timeout') !== -1) {
				Toast('网络超时', { type: 'error' })
			} else if (message === 'Network Error') {
				Toast('网络连接错误', { type: 'error' })
			} else if (message === 'canceled') {
				Toast('请求已取消', { type: 'error' })
			} else if (resData?.message && resData?.code) {
				Toast(`${resData.code}：${resData.message}`, { type: 'error' })
			} else {
				Toast(errorMsg, { type: 'error' })
			}
			return Promise.reject(error)
		}
	)
	return instance
}
