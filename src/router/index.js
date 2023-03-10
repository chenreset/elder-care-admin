import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '居家养老服务后台管理',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '居家养老服务后台管理', icon: 'dashboard' }
    }]
  },
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'list',
        name: '用户管理',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'update/:id',
        name: 'UserUpdate',
        component: () => import('@/views/user/update'),
        meta: { title: '编辑用户信息', noCache: true },
        hidden: true
      }
    ]
  },

  // 文章管理
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: '文章管理',
    meta: { title: '文章管理', icon: 'el-icon-reading' },
    children: [
      {
        path: 'list',
        name: '文章管理',
        component: () => import('@/views/article/index'),
        meta: { title: '文章管理', icon: 'el-icon-reading' }
      },
      {
        path: 'update/:id',
        name: 'ArticleUpdate',
        component: () => import('@/views/article/update'),
        meta: { title: '编辑文章信息', noCache: true },
        hidden: true
      }
    ]
  },
  // 商品管理
  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'el-icon-shopping-bag-1' },
    children: [
      {
        path: 'list',
        name: '商品管理',
        component: () => import('@/views/good/index'),
        meta: { title: '商品管理', icon: 'el-icon-shopping-bag-1' }
      },
      {
        path: 'update/:id',
        name: 'GoodUpdate',
        component: () => import('@/views/good/update'),
        meta: { title: '编辑商品信息', noCache: true },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
