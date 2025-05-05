<template>
    <div class="container">
        <van-button type="primary" block plain hairline icon="plus" to="/manage/addrecord">添加班会记录</van-button>
        <van-cell-group inset v-for="item in records" :key="item._id">
            <van-card :title="item.theme">
                <template #tags>
                    <div class="panel">
                        <van-tag plain type="success ">班会时间</van-tag>
                        <span>{{ item.createTime }}</span>
                    </div>
                    <div class="panel">
                        <van-tag plain type="success ">授课教师</van-tag>
                        <span>{{ item.teacherName }}</span>
                    </div>
                    <div class="panel">
                        <span style="color: gray;">最近编辑:</span>
                        <span style="color: gray;">{{ timeFormat(item.editTime) }}</span>
                    </div>
                </template>

                <template #footer>
                    <van-button size="mini" type="primary" @click="handlePrev(item._id)">预览</van-button>
                    <van-button size="mini" type="primary" @click="handleEdit(item._id)">编辑</van-button>
                    <van-button size="mini" type="primary" @click="handleDownload(item._id)">下载</van-button>
                    <van-button size="mini" type="danger" @click="handleDel(item._id)">删除</van-button>
                </template>
            </van-card>

        </van-cell-group>
        <van-popup v-model:show="show" round closeable :style="{ padding: '6px' }">
            <Table :itemId="itemId"></Table>
        </van-popup>

    </div>
</template>

<script setup>
import { showToast, showConfirmDialog } from 'vant';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Table from '@/components/table.vue'
import moment from "moment/dist/moment";
import "moment/dist/locale/zh-cn";
moment.locale("zh-cn");

const router = useRouter()
const show = ref(false);
const records = ref([])
const itemId = ref({})

onMounted(() => {
    getListData()
})

const timeFormat = (time) => {
    return moment(time).format('lll')
}
const handlePrev = async (id) => {
    show.value = true;
    itemId.value = id
}
const handleEdit = (id) => {
    router.push(`/manage/editrecord/${id}`)

}
const handleDownload = async (id) => {
    axios({
        url: `/adminapi/record/download/${id}`,
        method: 'GET',
        responseType: 'blob', // 重要：确保处理二进制响应类型
    }).then((response) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
        downloadLink.download = '班会记录.docx';
        downloadLink.click();
        showToast("下载完成");
    })
}

const handleDel = async (id) => {
    showConfirmDialog({
        title: '删除文件',
        message:
            '确认删除吗',
        confirmButtonColor: 'red',
        cancelButtonColor: 'blue'
    }).then(async () => {
        await axios.delete(`/adminapi/record/delete/${id}`)
        showToast("删除成功")
        getListData()
    }).catch(() => {
        // on cancel
    });
}

const getListData = async () => {
    const res = await axios.get('/adminapi/record/list')
    // console.log(res.data.data)
    records.value = res.data.data
}


</script>

<style lang="scss" scoped>
.container {
    padding: 10px;

    .van-card {
        margin-top: 5px;
    }

    .panel {
        display: flex;
        justify-content: space-between;
        padding: 5px;

        span {
            text-align: center;
        }
    }
}
</style>