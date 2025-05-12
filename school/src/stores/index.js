import { defineStore } from 'pinia'


export const useStore = defineStore('main', {
  state: () => ({
    permissions: [],
    isGetterRouter: false,
    userInfo: {},
    token: '',
  }),
  getters: {
    // 定义你的 getters
  },
  actions: {
    changeUserInfo(value) {
      this.userInfo = { ...this.userInfo, ...value }
    },
    logout() {
      this.userInfo = {},
      this.permissions = []
      this.hasLoadedRoutes = false
      localStorage.removeItem('token')
    },
    setToken(token) {
      this.token = token;
    },
    setPermissions(perms) {
      this.permissions = perms
    },
    changeGetterRouter(){
      this.isGetterRouter = !this.isGetterRouter
    }
    
  },
  persist: {
    enabled: true,
    strategies: [{
      key: 'mainStore',
      paths: ['userInfo','token','permissions'],
    }], // <- HERE
  },
})
