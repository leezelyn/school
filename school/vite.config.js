import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 代理规则：将所有以'/api'开头的请求代理到另一个服务器
      '/api/': {
        target: 'http://localhost:3000', // 后端服务实际地址
        changeOrigin: true, // 需要虚拟托管站点，以便能够代理websocket
        // rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，去掉/api前缀
      },
      // 你可以在这里继续添加更多的代理规则
    }
  }

})
