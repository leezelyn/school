<template>
    <div class="container">
        <van-cell-group inset>
            <van-tag type="danger">进行</van-tag>
            <van-cell title="课表查询" value="进入" label="入口已开放" is-link @click="goCourses"/>
        </van-cell-group>
    </div>
    <div class="container">
        <van-cell-group inset>
            <van-tag type="success">代办</van-tag>
            <van-cell title="周末请假" value="进入" label="入口待开启" is-link/>
        </van-cell-group>
    </div>

</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import { showToast } from 'vant'
import upload from '@/utils/upload.js'
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router';
const router = useRouter()


const store = useStore()
const goCourses = () => {
  console.log("11")
  router.push('/courses')
}






</script>
<style lang="scss" scoped>

</style>