<template>
    <van-row >
        <van-col sapn="4"><van-image width="4rem" height="4rem" fit="cover" position="left" round
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" /></van-col>
        <van-col sapn="18"  offset="2"><span>{{ store.userInfo.name }}</span></van-col>
    </van-row>
    <van-divider />
    <van-cell title="修改密码" is-link @click="toggleShow"></van-cell>
    <van-popup v-model:show="showBottom" position="bottom" round :style="{ height: '40%' }">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="store.userInfo.username" readonly="" name="用户名" label="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>

    </van-popup>
    <van-cell-group inset>
        <van-cell title="无" value="内容" />
        <van-cell title="无" value="内容" label="描述信息" />
    </van-cell-group>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { useStore } from '@/stores';
import axios from 'axios';

const password = ref()
const router = useRouter()
const store = useStore()
// console.log(store.userInfo)
const showBottom = ref(false);
const toggleShow = () => { showBottom.value = !showBottom.value }
const onSubmit = async (values) => {
    const res = await axios.post(`/adminapi/users/update/${store.userInfo._id}`, values)
    if (res.data.ActionType === "ok") {
        showToast("修改成功")
        showBottom.value = false
    } else {
        showToast("修改成功，请联系管理员")
    }

}

</script>
<style lang="scss" scoped>
.van-form {
    margin-top: 20px;
}
.van-col{
    display: flex;
    align-items: center;
}
.van-row {
    padding: 4%;
}
</style>