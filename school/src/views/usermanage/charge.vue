<template>
    <div class="container">
            <van-cell 
                        title="姓名：" 
                        :value="infos.name"
            />
            <van-cell 
                        title="班级：" 
                        :value="infos.class"
            />
            <van-cell 
                    title="缴费时间" 
                    is-link 
                    @click="toggleShow" 
                    :value="userData" 
            />
            <van-popup v-model:show="showBottom" position="bottom" round :style="{ height: '40%' }">
                <van-picker-group title="缴费日期" :tabs="['选择日期', '选择时间']" next-step-text="下一步" @confirm="onConfirm"
                    @cancel="onCancel">
                    <van-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate"
                        :formatter="dateFormatter" :columns-type="columnsDateType" />
                    <van-time-picker v-model="currentTime" :columns-type="columnsTimeType" :formatter="timeFormatter"
                        min-time="00:00:00" max-time="23:59:59" />
                </van-picker-group>
            </van-popup>
            <van-field name="uploader" label="截图上传">
                <template #input>
                    <van-uploader v-model="value" :after-read="afterRead" />
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" @click="submit">
                    提交
                </van-button>
            </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import { showToast } from 'vant'
import upload from '@/utils/upload.js'
import {useStore} from '@/stores/index'

const store = useStore()
const infos = computed(()=>({
    name:store.userInfo.name,
    class:store.userInfo.classid

}))

const userData = computed(()=>form.chargeTime)
const showBottom = ref(false);
const toggleShow = () => { showBottom.value = !showBottom.value }
const currentDate = ref(['2024', '02', '01']);
const currentTime = ref(['12', '00', '00']);
const columnsTimeType = ['hour', 'minute', 'second'];
const columnsDateType = ['year', 'month', 'day'];
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 5, 1)

const dateFormatter = (type, option) => {
    if (type === 'year') {
        option.text += '年';
    }
    if (type === 'month') {
        option.text += '月';
    }
    if (type === 'day') {
        option.text += '日';
    }
    return option;
};
const timeFormatter = (type, option) => {
    if (type === 'hour') {
        option.text += '时';
    }
    if (type === 'minute') {
        option.text += '分';
    }
    if (type === 'second') {
        option.text += '秒';
    }
    return option;
};


const value = ref([])


const form = reactive({
    file: null,
    date: "",
    image:""
})

const afterRead = (item) => {
    form.file = item.file
    console.log(form)
};


const onConfirm = () => {
    form.chargeTime = `${currentDate.value.join('/')} ${currentTime.value.join(':')}`
    toggleShow()
    console.log(form.chargeTime)
};

const onCancel = () => {
    showBottom.value = false
    showToast('cancel');
};

const submit = async () =>{
    if(form.chargeTime){

        console.log(form)

        const res = await upload('/adminapi/checklist/upload',form)

        console.log(res)

        if(res.ActionType == "ok"){
            showToast("信息上传成功")
        }



    }else{
        showToast('非法请求')
    }
    

}





</script>
<style lang="scss" scoped>
.container {
    margin-top: 50px;

}
</style>