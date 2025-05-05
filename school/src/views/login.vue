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
        const token =
          res.headers['authorization']?.replace(/^Bearer\s*/, '') ||
          body.token ||
          '';
        store.setToken(token);
        store.changeUserInfo(body.user);
        router.push('/home');
      } else {
        showToast('登入失败，请检查账号密码');
      }
    } catch (err) {
      console.error(err);
      showToast('请求失败，请稍后重试');
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
  