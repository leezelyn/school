<template>
    <div class="container">
        <van-grid :border="true" :column-num="3" square>
            <van-grid-item @click="handleTable">
                <van-icon name="passed" size="25" />
                <span>表单查询</span>
            </van-grid-item>
            <van-grid-item @click="handleUser">
                <van-icon name="friends-o" size="25" />
                <span>用户管理</span>
            </van-grid-item>
            <van-grid-item @click="handleRecords">
                <van-icon name="calendar-o" size="25" />
                <span>班会记录</span>
            </van-grid-item>
            <van-grid-item @click="handleStudent">
                <van-icon name="user-circle-o" size="25" />
                <span>学生信息</span>
            </van-grid-item>
            <van-grid-item >
                <van-icon name="description-o" size="25" />
                <span>作业布置</span>
            </van-grid-item><van-grid-item >
                <van-icon name="completed-o" size="25" />
                <span>其他</span>
            </van-grid-item>

        </van-grid>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const handleTable = () => {
    router.push('/manage/checklist')
}

const handleUser = () => {
    router.push('/manage/userlist')
}

const handleRecords = () => {
    router.push('/manage/records')
}

const handleStudent = () => {
    router.push('/manage/studentlist')
}

const handleOut = () => {
    router.push('/manage/homework')
}

const handleReference = () => {
    router.push('/manage/reference')
}

</script>
<style lang="scss" scoped>
.container {
    height: calc(100% - 86px);
    width: 100%;

    .van-grid {
        height: 50px;

        span {
            font-size: 13px;
            padding: 10px;
            color: gray;
        }
    }
}
</style>