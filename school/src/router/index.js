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


router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.name === "login" || to.name === "register") {
    next()
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {
      if (!store.isGetterRouter) {
        router.removeRoute("mainbox")
        configRouter()
        next(
          { path: to.fullPath }
        )
      } else {
        next()
      }
    }
  }
})

const configRouter = () => {
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }
  routesConfigs.forEach(item => {
    permission(item) && router.addRoute("mainbox", item)
  })
  const store = useStore()
  store.changeGetterRouter()
}



const permission = (item) => {
  if (item.requireAuth) {
    const store = useStore()
    return store.userInfo.role === 1
  }
  return true
}

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound,
});

export default router
