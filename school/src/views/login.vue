<template>
    <div class="container">
      <h1>学生查询系统</h1>
      <van-config-provider>
        <van-cell-group inset style="margin-top:100px;">
          <van-field
            v-model="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" @click="onSubmit">
            登入
          </van-button>
          <br />
          <van-button plain round block type="primary" @click="goRegister">
            注册
          </van-button>
        </div>
      </van-config-provider>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { showToast } from 'vant';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useStore } from '@/stores/index';
  
  const router   = useRouter();
  const store    = useStore();
  const username = ref('');
  const password = ref('');
  
  const goRegister = () => {
    router.push('/register');
  };
  
  async function onSubmit() {
    if (!username.value || !password.value) {
      showToast('用户名和密码不能为空');
      return;
    }
    try {
      const res = await axios.post('/api/users/login', {
        username: username.value,
        password: password.value,
      });
      const body = res.data;
      if (body.ActionType === 'ok') {
        showToast('登入成功');
    // 1. 拿 token（优先从 header，header 不存在就 fallback 到 body.data.token）
    const headerAuth = res.headers['authorization'];
    const token = headerAuth
      ? headerAuth.replace(/^Bearer\s*/, '')
      : (body.data.token || '');

    // 2. 存 Token
    store.setToken(token);

    // 3. 拿到后端返回的 user 和 permissions
    const { result, permissions } = body.data;

    // 4. 存用户信息 & 权限列表
    store.changeUserInfo(result);
    store.setPermissions(permissions);

    // 5. 跳转主页
    router.push('/home');
  } else {
    showToast(body.message || '登录失败，请检查用户名或密码');
  }
    } catch (err) {
    console.error(err);
    showToast(
    err.response?.data?.message || '请求失败，请稍后重试'
    );
  }

  }
  </script>
  
  <style scoped>
  .container {
    padding: 0 16px;
  }
  h1 {
    margin-top: 40px;
    text-align: center;
  }
  .van-cell-group {
    margin-top: 100px;
  }
  </style>
  