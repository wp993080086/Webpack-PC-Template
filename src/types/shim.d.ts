/// <reference types="vite/client" />

/**
 * @description vue文件类型
 */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, TAny>
	export default component
}
