import { defineStore } from 'pinia'


export const useStore = defineStore('main', {
  state: () => ({
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
    clearUserInfo() {
      this.userInfo = {},
      this.token = '';
    },
    setToken(token) {
      this.token = token;
    },
    changeGetterRouter(){
      this.isGetterRouter = !this.isGetterRouter
    }
    
  },
  persist: {
    enabled: true,
    strategies: [{
      key: 'mainStore',
      paths: ['userInfo','token'],
    }], // <- HERE
  },
})
