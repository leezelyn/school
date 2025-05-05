<template>
    <van-cell-group inset v-for="item in tableData" :key="item.name">
        <van-card :thumb="'https://1heart.xyz' + item.imageCharge">
            <template #tags>
                <div>
                    <div class="panel">
                        <van-tag plain type="success " size="18">姓名</van-tag>
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="panel">
                        <van-tag plain type="success ">班级</van-tag>
                        <span>{{ item.classid }}</span>
                    </div>
                    <div class="panel">
                        <van-tag plain type="primary">缴费时间</van-tag>
                        <span>{{ item.chargeTime }}</span>
                    </div>
                </div>
            </template>
            <template #footer>
                <van-button size="mini" type="primary" @click="handlePrev(item.imageCharge)">预览</van-button>
                <van-button size="mini" type="primary" @click="handleEdit(item)">编辑</van-button>
            </template>
        </van-card>
    </van-cell-group>
    <van-popup v-model:show="showCenter" round :style="{ padding: '6px', height: '60%', width: '70%' }">
        <van-form @submit="onSubmit">
            <van-cell title="姓名" is-link :value="selectedItem.name"></van-cell>
            <van-cell title="班级" is-link :value="selectedItem.classid"></van-cell>
            <van-field v-model="selectedItem.chargeTime" name="chargeTime" required label="缴费时间" />
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </van-form>
    </van-popup>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, } from 'vue';
import { showImagePreview } from 'vant'

// const imgUrl =ref([])
const tableData = ref([])
const showCenter = ref(false);
const selectedItem = ref([])

const handlePrev = (data) => {
    const urls = data ? "https://1heart.xyz" + data : ""
    showImagePreview({
        images: [urls],
        closeable: true,
    });
};

const handleEdit = (item) => {
    showCenter.value = true;
    selectedItem.value = item
}

onMounted(async () => {
    const res = await axios.get('/adminapi/checklist/list')
    // console.log(res.data.data)
    tableData.value = res.data.data
})

const onSubmit = (values)=>{
    console.log(selectedItem.value._id)
    axios.put(`/adminapi/checklist/list/${selectedItem.value._id}`,values)

}
</script>
<style lang="scss" scoped>

.van-form{
    margin-top: 40px;

}
.van-cell-group {
    padding: 3px;

    .panel {
        padding: 5px;
    }

    .van-tag {
        height: 10px;
    }

    span {
        padding: 5px;
    }

    .va-button {
        padding: 10px;
    }
}
</style>