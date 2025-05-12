<template>
        <van-tabbar route v-model="active">
            <van-tabbar-item  to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item  to="/activity" icon="star-o">代办</van-tabbar-item>
            <van-tabbar-item   icon="friends-o" to="/manage" v-admin>管理</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/center">个人中心</van-tabbar-item>
        </van-tabbar>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores';
const store = useStore()
const active = ref('home')
const vAdmin = {
    mounted(el) {
        if (!(store.permissions.includes('user:C'))) {
            el.parentNode.removeChild(el)
        }
    }
}
</script>