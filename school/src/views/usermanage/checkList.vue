<template>
    <van-cell-group>
        <van-tag type="danger">结束</van-tag>
        <van-cell title="伙食截图汇总" value="进入" label="已完成" is-link to="/manage/mealslist" />
    </van-cell-group>

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

const onSubmit = (values) => {
    console.log(selectedItem.value._id)
    axios.put(`/adminapi/checklist/list/${selectedItem.value._id}`, values)

}
</script>
<style lang="scss" scoped>
.van-form {
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