<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="form.username" required label="用户名" name="username" placeholder="请输入" />
            <van-field v-model="form.name" required label="姓名" name="name" placeholder="请输入" />
            <van-field v-model="form.password" required label="密码" name="password" placeholder="请输入" />
            <van-field v-model="form.classid" required label="班级" name="classid" placeholder="请输入" />
        </van-cell-group>
        <van-field v-model="roleText" is-link readonly  label="用户权限" placeholder="点击选择权限组"
            @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
            <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <van-field name="uploader" label="头像">
            <template #input>
                <van-uploader v-model="value" :after-read="afterRead" />
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
import { showToast } from 'vant';
import upload from '@/utils/upload';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const roleText = ref('');
const showPicker = ref(false);
const columns = ref([
    { text: '普通用户', value: 0 },
    { text: '管理员', value: 1 },
])

const onConfirm = ({selectedOptions}) => {
    console.log(selectedOptions)
    form.role = selectedOptions[0].value;
    roleText.value = selectedOptions[0].text; // 更新角色文本
    showPicker.value = false;
};

const form = reactive({
    username: '',
    name: '',
    classid: '',
    password: '',
    file: null,
    role:0
})

const value = ref([])
const afterRead = (item) => {
    form.file = item.file
};

const onSubmit = async (values) => {

    const res = await upload('/adminapi/users/add', {...values,role:form.role})

    if (res.ActionType == "ok") {
        showToast("添加成功")
        router.push('/manage/userlist')
    }

}

</script>

<style lang="scss" scoped>
.record {
    height: 44px;
}
</style>