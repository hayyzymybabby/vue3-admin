import path from 'path-browserify'
/**
 *  所有子集路由·
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]')
    return true
}

/**
 *  处理脱离层级的路由
 */
export const filterRoutes = routes => {
  // 所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 *  根据 routes 数据， 返回对应的 menu 规则数据
 */
export const generateMenus = (routes, basPath = '') => {
  const result = []
  // 不满足该条件 `meta && meta.title && meta.icon` 的数据不应该存在
  routes.forEach(item => {
    // 不存在children && 不存在meta 直接 return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在children, 不存在meta, 迭代 generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      return result.push(...generateMenus(item.children))
    }
    // 不存在 children, 存在 meta || 存在 children && 存在 meta
    // 因为最终的menu 需要进行跳转，此时我们需要合并 path
    const routePath = path.resolve(basPath, item.path)
    // 路由分离之后，可能存在同名父路由的情况
    let route = result.find(item => item.path === routePath)
    // 当前 路由尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 存在 children && 存在 meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
