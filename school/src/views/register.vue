<template>
  <div class="container">
    <h1>学生注册系统</h1>
    <van-config-provider>
      <!-- 1. 去掉 van-form，直接用 div 包裹字段 -->
      <div class="fields" style="margin-top: 100px;">
        <van-cell-group inset>
          <van-field
            v-model="username"
            label="用户名"
            placeholder="请输入用户名"
          />
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
          />
          <van-field
            v-model="confirmPassword"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
          />
          <van-field
            v-model="inviteCode"
            label="邀请码"
            placeholder="请输入邀请码"
          />
        </van-cell-group>
      </div>

      <!-- 2. 按钮只用 @click -->
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="onSubmit">
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

const router          = useRouter();
const username        = ref('');
const password        = ref('');
const confirmPassword = ref('');
const inviteCode      = ref('');

// 手动校验函数
function validate() {
  if (!username.value) {
    showToast('请填写用户名');
    return false;
  }
  if (!password.value) {
    showToast('请填写密码');
    return false;
  }
  if (password.value.length < 6) {
    showToast('密码长度至少 6 位');
    return false;
  }
  // 强度校验：至少包含大小写字母和数字
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!pattern.test(password.value)) {
    showToast('密码需包含大小写字母和数字');
    return false;
  }
  if (confirmPassword.value !== password.value) {
    showToast('两次输入的密码不一致');
    return false;
  }
  if (!inviteCode.value) {
    showToast('请输入邀请码');
    return false;
  }
  return true;
}

// 点击注册按钮时调用
async function onSubmit() {
  if (!validate()) {
    return;
  }

  try {
    const res = await axios.post('/api/users/register', {
      username: username.value,
      password: password.value,
      inviteCode: inviteCode.value,
    });

    if (res.data.ActionType === 'ok') {
      showToast('注册成功，请登录');
      router.push('/login');
    } else {
      showToast(res.data.message || '注册失败，请重试');
    }
  } catch (err) {
    showToast(err.response?.data?.message || '网络或服务器错误');
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 0 16px;
}
h1 {
  margin-top: 40px;
  text-align: center;
}
</style>
