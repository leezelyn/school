<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(img, index) in images" :key="index">
                <img :src="img" />
        </van-swipe-item>
    </van-swipe>
    <calendar></calendar>
</template>
<script setup>
import Calendar from '@/components/calendar.vue';
// 动态导入assets目录下的所有.jpg图片
const imageModules = import.meta.glob('@/assets/*.jpg', { eager: true });

// 转换为图片URL数组
const images = Object.values(imageModules).map((module) => module.default);

</script>
<style lang="scss" scoped>
img{
    height: 150px;
    width: 100%;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: white;
}
</style>