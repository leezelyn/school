<template>
    <div class="container">
        <van-search v-model="searchQuery" placeholder="请输入搜索内容" @search="onSearch" />
        <van-cell-group inset>
            <van-cell v-for="item in filteredItems" :key="item.id" :title="item.name" is-link />
        </van-cell-group>

    </div>
</template>

<script setup>
import { showToast } from 'vant';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import moment from "moment/dist/moment";
import "moment/dist/locale/zh-cn";
moment.locale("zh-cn");

const router = useRouter()
const userInfo = ref([])

const searchQuery = ref('')

const items = [
    { id: 1, name: '苹果' },
    { id: 2, name: '香蕉' },
    { id: 3, name: '橙子' },
    // 更多商品...
]

const filteredItems = computed(() => {
    return items.filter(item => item.name.includes(searchQuery.value))
})

const onSearch = () => {
    console.log("1111")
}
onMounted(() => {
    getListData()
})

const getListData = async () => {
    // const res = await axios.get('/adminapi/users/stduentlist')
    // console.log(res.data.data)
    // userInfo.value = res.data.data
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
    }
}
</style>