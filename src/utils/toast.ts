import { ElMessage, ElMessageBox, ElNotification, MessageOptions, ElMessageBoxOptions, NotificationParams } from 'element-plus'

/**
 * @description toast轻提示
 * @param {String} message
 * @param {MessageOptions} option
 */
export const Toast = (message: string, option: MessageOptions = {}) => {
	return ElMessage({
		message,
		showClose: true,
		grouping: true,
		duration: 3000,
		...option
	})
}
/**
 * @description alert提示框
 * @param {String} message
 * @param {ElMessageBoxOptions} config
 */
export const Alert = (message: string, config: ElMessageBoxOptions = {}) => {
	const defaultOption = {
		title: '温馨提示',
		closeOnClickModal: false,
		closeOnPressEscape: false,
		confirmButtonText: '确认',
		draggable: true,
		customClass: `${config.customClass || ''} f-messagebox`
	}
	const option = { ...defaultOption, ...config }
	return ElMessageBox.alert(message, option)
}
/**
 * @description confirm确认框
 * @param {String} message
 * @param {ElMessageBoxOptions} config
 */
export const Confirm = (message: string, config: ElMessageBoxOptions = {}) => {
	const defaultOption = {
		title: '温馨提示',
		closeOnClickModal: false,
		closeOnPressEscape: false,
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		draggable: true,
		customClass: `${config.customClass || ''} p-messagebox`,
		cancelButtonClass: `${config.cancelButtonClass || ''} is_plain`
	}
	const option = { ...defaultOption, ...config }
	return ElMessageBox.confirm(message, option)
}
/**
 * @description notification通知
 * @param {NotificationParams} option
 */
export const Notification = (option: NotificationParams = {}) => {
	return ElNotification(option)
}
