<template>
    <div class="app-container">
        <NavBar></NavBar>
        <!-- 使用 class 包裹 router-view 以应用样式 -->
        <div class="content">
            <router-view />
        </div>
        <TabBar></TabBar>
    </div>
</template>
<script setup>
import NavBar from '@/components/navbar.vue';
import TabBar from '@/components/tabbar.vue';
</script>

<style>
/* 应用于 TabBar 的样式应使用类名或 ID */
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

/* 确保内容不被 TabBar 遮挡 */
.content {
    padding-bottom: 50px; /* 根据 TabBar 的实际高度调整 */
}

/* 确保整个应用填满整个屏幕高度 */
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
