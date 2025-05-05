<template>
    <div class="container">
        <van-button type="primary" block plain hairline icon="plus" to="/manage/adduser">添加用户</van-button>
        <van-pull-refresh v-model="freshing" @refresh="onRefresh">
                <van-swipe-cell v-for="item in userInfo" :key="item._id">
                    <van-row>
                        <van-col span="4"> <van-image round width="3rem" height="3rem"
                                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" /></van-col>
                        <van-col span="6"><span>{{ item.name }}</span></van-col>
                        <van-col span="14" class="right-item"><van-tag type="primary">{{ isAdmin(item.role)
                                }}</van-tag></van-col>
                    </van-row>
                    <template #left>
                        <van-button square type="primary" text="选择" />
                    </template>

                    <template #right>
                        <van-button square type="danger" text="删除" @click="handleDel(item._id)" />
                        <van-button square type="primary" text="编辑" @click="handleEdit(item._id)" />
                    </template>
                </van-swipe-cell>
        </van-pull-refresh>

        <van-popup v-model:show="show" round closeable :style="{ padding: '6px' }">
            <Table :itemId="itemId"></Table>
        </van-popup>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showConfirmDialog, showToast } from 'vant';
import axios from 'axios';
import Table from '@/components/table.vue'
import moment from "moment/dist/moment";
import "moment/dist/locale/zh-cn";
moment.locale("zh-cn");

const router = useRouter()
const show = ref(false);
const freshing = ref(false);
const userInfo = ref([])
const itemId = ref({})


onMounted(() => {
    getListData()
})

const isAdmin = (role) => {
    return role == "1" ? "管理员" : "用户"
}
const onRefresh = () => {
    getListData()
    showToast('刷新成功');
    loading.value = false;
}
const handleEdit = (id) => {
    router.push(`/manage/edituser/${id}`)
}

const handleDel = async (id) => {
    showConfirmDialog({
        title: '删除用户',
        message:
            '确认删除吗',
        confirmButtonColor: 'red',
        cancelButtonColor: 'blue'
    }).then(async () => {
        // on confirm
        await axios.delete(`/adminapi/users/delete/${id}`)
        showToast("删除成功")
        getListData()
    }).catch(() => {
        // on cancel
    });

}

const getListData = async () => {
    const res = await axios.get('/adminapi/users/list')
    console.log(res.data.data)
    userInfo.value = res.data.data
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

    .van-swipe-cell {
        margin-top: 5px;



        .van-col {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .right-item {
            display: flex;
            justify-content: end;
            align-items: center;
        }
    }
}
</style>