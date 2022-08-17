import { TGlobalDefaultType, IThrottleFunction, IDebounceFunction } from './utils'

// 手机号码校验
export const validateMobile = (rule: unknown, value: string, callback: (value?: Error) => void) => {
  console.log(rule)
  const RegExp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  if (value === '') {
    callback(new Error('请填写联系电话'))
  } else if (!RegExp.test(value)) {
    callback(new Error('手机号码格式有误'))
  } else {
    callback()
  }
}
/**
 * 睡眠
 * @param  {Number} ms 睡眠时间
 * @return {Promise} Promise
 */
export const sleep = (ms = 500) => {
  if (typeof ms !== 'number') {
    throw new Error('参数必须是 Number')
  }
  return new Promise(res => {
    setTimeout(res, ms)
  })
}
/**
 * 节流
 * @param {Function} fn 事件
 * @param {Number} limit 触发间隔
 */
export const throttle = <F extends TAnyFunc>(fn: F, limit = 200): IThrottleFunction<F> => {
  let wait = false
  // eslint-disable-next-line func-names
  return function (this: void, ...args: Parameters<F>) {
    if (wait === false) {
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)
      return fn.apply(this, args)
    }
    return null
  }
}
/**
 * 防抖
 * @param {Function} fn 事件
 * @param {Number} wait 触发间隔
 * @param {Number} immediate 是否立即触发一次
 */
export const debounce = <F extends TAnyFunc>(
  wait: number,
  fn: F,
  immediate = false
): IDebounceFunction<F> => {
  let timeout: NodeJS.Timeout
  // eslint-disable-next-line func-names
  const debounced = function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = () => {
      timeout
      if (immediate !== true) {
        fn.apply(this, args)
      }
    }
    clearTimeout(timeout)
    if (immediate === true && timeout === undefined) {
      fn.apply(this, args)
    }
    timeout = setTimeout(later, wait)
  }
  debounced.cancel = () => {
    clearTimeout(timeout)
  }
  return debounced
}
/**
 * 绑定监听
 * @param  {Event} element 监听源
 * @param {String} event 事件名
 * @param {Function}} handler 回调
 */
export const on = (
  element: TGlobalDefaultType,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void => {
  // console.log('addEventListener', event)
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}
/**
 * 解绑监听
 * @param  {Event} element 监听源
 * @param {String} event 事件名
 * @param {Function}} handler 回调
 */
export const off = (
  element: TGlobalDefaultType,
  event: string,
  handler: EventListenerOrEventListenerObject
): void => {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}
/**
 * 判断变量的类型
 * @param {object} value 变量值
 */
function checkType(value: TAny) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 深拷贝（递归）
 * @param {*} sourceValue 需要拷贝的值
 */
export const deepClone = (sourceValue: TAny) => {
  // 如果传入的数据是简单类型（不是 {} & []），直接返回即可
  if (typeof sourceValue !== 'object') {
    return sourceValue
  }
  // 判断 传入参数的数据类型(object or array)
  const targetType = checkType(sourceValue)
  // 根据传入参数的数据类型，创建 初始存储结果的变量类型 {} or []
  const result: TAny = targetType === 'Object' ? {} : []
  // 遍历 sourceValue (for...in可以遍历数据和对象)
  // 避免数组内有自定义属性，遍历数组使用 for...of，遍历对象 for...in
  if (targetType === 'Array') {
    // 传入参数是数组时，次数使用的是 for...of 遍历，当然，也可以使用 数组的其他遍历方法
    for (const [key, value] of sourceValue.entries()) {
      const itemType = checkType(value)
      // 如果 value 是 数组 或 对象，则继续遍历
      if (itemType === 'Object' || itemType === 'Array') {
        result[key] = deepClone(value)
      } else {
        // 如果 value 是 基本数据类型 或者 函数，直接赋值即可
        result[key] = value
      }
    }
  } else {
    // 传入参数是对象时
    for (const key in sourceValue) {
      // 遍历数组时，key 为数组的 下标
      // 遍历对象时，key 为对象的 key
      // hasOwnProperty 只能检验对象自身的属性，不能检验继承属性，也不能检验原型链上的属性
      if (Object.prototype.hasOwnProperty.call(sourceValue, key)) {
        const item = sourceValue[key]
        const itemType = checkType(item)
        // 如果 value 是 数组 或 对象，则继续遍历
        if (itemType === 'Object' || itemType === 'Array') {
          result[key] = deepClone(item)
        } else {
          // 如果 value 是 基本数据类型 或者 函数，直接赋值即可
          result[key] = item
        }
      }
    }
  }
  return result
}
/**
 * 设置本地storage
 * @param {String} key 键
 * @param {Any} data 数据源
 * @param {String} type 存储类型 local || session
 */
export const setStorage = (
  key: string,
  data: string | number | TAnyArray | TAnyType,
  type: 'session' | 'local' = 'session'
) => {
  const env = process.env.NODE_ENV as string
  if (type === 'session') {
    sessionStorage.setItem(`${key}_${env}`, JSON.stringify(data))
  } else {
    localStorage.setItem(`${key}_${env}`, JSON.stringify(data))
  }
}
/**
 * 获取本地storage
 * @param {String} key 键
 * @param {String} type 存储类型 local || session
 */
export const getStorage = (key: string, type: 'session' | 'local' = 'session') => {
  const env = process.env.NODE_ENV as string
  const target =
    type === 'session'
      ? sessionStorage.getItem(`${key}_${env}`)
      : localStorage.getItem(`${key}_${env}`)
  return target ? JSON.parse(target) : target
}

/**
 * 删除本地storage
 * @param {String} key 键 || 'all' || 键数组
 * @param {String} type 存储类型 local || session
 */
export const deleteStorage = (
  key: 'all' | string | string[],
  type: 'session' | 'local' = 'session'
) => {
  const env = process.env.NODE_ENV as string
  if (typeof key === 'string') {
    if (key === 'all') {
      type === 'session' ? sessionStorage.clear() : localStorage.clear()
    } else {
      type === 'session'
        ? sessionStorage.removeItem(`${key}_${env}`)
        : localStorage.removeItem(`${key}_${env}`)
    }
  } else if (key.length > 0) {
    if (type === 'session') {
      key.forEach(item => {
        sessionStorage.removeItem(`${item}_${env}`)
      })
    } else {
      key.forEach(item => {
        localStorage.removeItem(`${item}_${env}`)
      })
    }
  }
}
