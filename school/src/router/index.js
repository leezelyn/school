import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import { useStore } from '@/stores/index'
import MainBox from '@/views/mainbox.vue'
import NotFound from '../views/NotFound.vue'
import routesConfigs from './config'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },    
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
    },
  ]
})


// 全局前置守卫
router.beforeEach((to, from, next) => {
  const store = useStore()

  // 1. 登录页和注册页总是放行
  if (to.name === 'login' || to.name === 'register') {
    return next()
  }

  // 2. 未登录则跳回登录
  if (!localStorage.getItem('token')) {
    return next({ path: '/login' })
  }

  // 3. 登录后，首次动态装路由
  if (!store.isGetterRouter) {
    // 先移除旧的 mainbox 再重新装
    router.removeRoute('mainbox')
    configRouter()
    // 用 replace：避免多余 history 记录
    return next({ path: to.fullPath, replace: true })
  }

  // 4. 已加载完路由，再次进入需要权限的路由时做二次拦截
  if (to.meta?.permission) {
    const { resource, action } = to.meta.permission
    const key = `${resource}:${action}`
    if (!store.permissions.includes(key)) {
      // 没权限则跳 404
      return next({ name: 'NotFound' })
    }
  }

  // 5. 其他情况一律放行
  next()
})

//动态添加 mainbox 的子路由
const configRouter = () => {
 // 先加回 mainbox 根路由
 if (!router.hasRoute('mainbox')) {
   router.addRoute({
     path: '/mainbox',
     name: 'mainbox',
     component: MainBox
   })
 }

 // 再把 config.js 中的路由按权限加到 mainbox 下面
 routesConfigs.forEach(item => {
   if (permission(item)) {
     router.addRoute('mainbox', item)
   }
 })

 // 打一个 flag，避免重复挂载
 const store = useStore()
 store.changeGetterRouter()
}


//判断单条路由 config 项是否可挂载
const permission = (item) => {
 // 如果没有 meta.permission，默认不用鉴权
  if (!item.meta?.permission) {
    return true
  }
// 否则看当前用户权限列表里有没有 resource:action
  const { resource, action } = item.meta.permission
  return useStore().permissions.includes(`${resource}:${action}`)
}

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound,
});

export default router
