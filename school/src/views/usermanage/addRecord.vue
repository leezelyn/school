<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="form.createTime" required label="时间" name="creatTime" placeholder="请输入" />
            <van-field v-model="form.theme" required label="主题" name="theme" placeholder="请输入" />
            <van-field v-model="form.teacherName" required label="授课教师" placeholder="请输入" />
            <van-field v-model="form.className" required label="参与人" placeholder="请输入" />
        </van-cell-group>
        <van-cell title="会议内容" is-link @click="toggleShow" :value="form.record" class="record"></van-cell>
        <van-action-sheet v-model:show="show" title="会议内容">
            <van-field v-model="form.record" name="record" rows="10" type="textarea" maxlength="1000" placeholder="请输入文本"
                show-word-limit />
        </van-action-sheet>
        <van-field name="uploader" label="会议图片">
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
const form = reactive({
    createTime: '',
    theme: '',
    teacherName: '',
    className: '',
    file: null,
})

const value = ref([])
const afterRead = (item) => {
    form.file = item.file
};

const show = ref(false)
const toggleShow = () => { show.value = !show.value }
const onSubmit = async() => {

    const res = await upload('/adminapi/record/add', form)

    console.log(res)

    if (res.ActionType == "ok") {
        showToast("提交成功")
        router.push('/manage/records')
    }

}

</script>
<style lang="scss" scoped>
.record{
    height: 44px;
}
</style>