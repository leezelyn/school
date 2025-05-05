<template>
    <div class="container">
        <h3>每周一节安全课（班会记录）</h3>
        <table>
            <tr>
                <th>日期</th>
                <td>{{ detail.createTime }}</td>
                <th>主题</th>
                <td>{{ detail.theme }}</td>
            </tr>
            <tr>
                <th>授课教师</th>
                <td>{{detail.teacherName}}</td>
                <th>班级</th>
                <td>{{detail.className}}</td>
            </tr>
            <tr>
                <th colspan="4">授课教案（可粘贴）</th>
            </tr>
            <tr>
                <td colspan="4" class="record">
                    <div>{{ detail.record }}</div>
                    <img :src="`https://1heart.xyz${detail.image}`" alt="">
                </td>
            </tr>
        </table>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
import axios from 'axios';
const props = defineProps({
    itemId: String
})
const detail = ref({});
watchEffect(async () => {
    if (props.itemId) {
        const response = await axios.get(`/adminapi/record/list/${props.itemId}`);
        console.log(response.data.data[0])
        detail.value = response.data.data[0];
    }
});
// 使用 watchEffect 来响应 prop 的变化

</script>
<style scoped>
.container {
    padding: 5px;
    height: calc(100vh - 150px);
}

.record{
    white-space: pre-wrap;
    text-align: justify;
}

h3 {
    text-align: center;
    margin: 0;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table,
th,
td {
    border: 1px solid black;
}

th,
td {
    padding: 2px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

textarea {
    width: 100%;
    height: calc(100vh - 50%);
}

img{
    width: 50%;
    height: 50%;
}
</style>