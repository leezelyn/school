<template>
    <div class="container">
        <van-nav-bar title="学校管理平台" left-text="返回" right-text="退出" left-arrow @click-left="onClickLeft"
            @click-right="handleLogout"></van-nav-bar>
        <van-notice-bar left-icon="volume-o" text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />
    </div>
</template>
<script setup>
import {useStore} from '@/stores/index'
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()

const onClickLeft = () => history.back()
const handleLogout= ()=>{
    localStorage.removeItem("token")
    store.logout()
    router.push("/login")
}
</script>
<style lang="scss" scoped>
.container {
    margin-top: 20px;
}
</style>