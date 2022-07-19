/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw
} from 'vue-router'

type ScrollPositionNormalized = {
  behavior?: ScrollOptions['behavior']
  left: number
  top: number
}

// 批量导入routes
function importAll(webpackContext: __WebpackModuleApi.RequireContext) {
  return webpackContext.keys().map(fileUrl => {
    const body = webpackContext(fileUrl).default
    return body
  })
}

const files = importAll(require.context('./routers/', true, /\.ts$/))
const allRouters = Array<RouteRecordRaw>()
// eslint-disable-next-line
for (const key in files) {
  const defaultArr = files[key] as unknown as RouteRecordRaw
  if (Array.isArray(defaultArr)) {
    allRouters.push(...defaultArr)
  }
}

const routerInstance = createRouter({
  history: createWebHistory(),
  routes: allRouters,
  scrollBehavior(
    to: RouteLocationNormalized,
    _: RouteLocationNormalizedLoaded,
    savedPosition: ScrollPositionNormalized | null
  ) {
    if ((to.meta.savedPosition as boolean) && savedPosition) {
      return savedPosition
    }
    return {
      left: 0,
      top: 0
    }
  }
})

// routerInstance.beforeEach((to, _, next) => {
//   if (to.meta) {
//     document.title = (to.meta.title as string) || ''
//   }
//   next()
// })

export default routerInstance
