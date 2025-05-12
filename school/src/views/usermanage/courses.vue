<template>
    <div class="container">
      <van-cell title="课表查询" 
      :title-style="{ textAlign: 'center', fontWeight: 'bold', width: '100%' }"
      />
      <van-cell
        title="查询时间"
        is-link
        @click="showBottom = true"
        :value="form.weekPeriod || '请选择查询时间'"
      />
  
      <van-popup
        v-model:show="showBottom"
        position="bottom"
        round
        :style="{ height: '40%' }"
        teleport="body"
      >
          <van-tabs v-model:active="activeTab" animated>
            <van-tab title="选择星期" />
            <van-tab title="选择节次" />
          </van-tabs>
  
          <van-picker
          title="查询时间"
            :columns="columns"
            @change="onChange"
            @cancel="onCancel"
            @confirm="onConfirm"
          />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="submit">
          提交
        </van-button>
      </div>
    <!-- —— 按学科分组展示空闲教师 —— -->
    <van-collapse
      v-model="activeName"
      accordion
      @change="onCollapseChange"
    >
      <van-collapse-item
        v-for="(teachers, subject) in groupedTeachers"
        :key="subject"
        :name="subject"
        :title="subject"
      >
        <ul>
          <li v-for="teacher in teachers" :key="teacher.id">
            {{ teacher.name }}  
            <small>（班级：{{ teacher.classes.join('、') }}）</small>
          </li>
        </ul>
      </van-collapse-item>

      <template v-if="freeTeachers.length === 0">
        <div style="padding: 16px; text-align: center; color: #999;">
          暂无空闲教师
        </div>
      </template>
    </van-collapse>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue';
  import { showToast } from 'vant';
  import axios from "axios"
  import { useStore } from '@/stores';
  const store = useStore();
  
  // 弹层控制
  const showBottom = ref(false);
  const activeTab   = ref(0);
  
  // 列数据：对象数组
  const weekColumns   = ['周一','周二','周三','周四','周五','周六','周日']
    .map(item => ({ text: item, value: item }));
  const periodColumns = Array.from({ length: 8 }, (_, i) => `第${i+1}节`)
    .map(item => ({ text: item, value: item }));
  
  // 当前选中项
  const currentWeekday = ref(weekColumns[0]);
  const currentPeriod  = ref(periodColumns[0]);
  
  // 响应式表单
  const form = reactive({ weekPeriod: '' });
  
  // 根据 activeTab 切换数据源
  const columns = computed(() =>
    activeTab.value === 0 ? weekColumns : periodColumns
  );

  
  // Picker 值变动
  const onChange = ({ selectedOptions }) => {
    if (activeTab.value === 0) {
      currentWeekday.value = selectedOptions[0];
    } else {
      currentPeriod.value = selectedOptions[0];
    }
  };
  
  // 取消
  const onCancel = () => { 
    console.log('取消按钮被点击');
    showBottom.value = false;
};
  
  // 确认
  const onConfirm = () => {
    console.log('按钮被点击');
    form.weekPeriod = `${currentWeekday.value.text} ${currentPeriod.value.text}`;
    showBottom.value = false;
  };

// --- collapse state & list of teachers ---
 const freeTeachers = ref([]);
 const activeName   = ref('');
 // track collapse changes if needed
 const onCollapseChange= (name)=> {
  activeName.value = name;
 }
  // 按学科分组的 computed
 const groupedTeachers = computed(() => {
   const map = {};
   freeTeachers.value.forEach(teacher => {
     // teacher.subjects 可能是数组，遍历所有学科
     teacher.subjects.forEach(subj => {
       if (!map[subj]) map[subj] = [];
       map[subj].push(teacher);
     });
   });
   return map;
 });
  
// --- submit 改成 const 箭头函数 ---
const submit = async () => {
  if (!form.weekPeriod) {
    return showToast('请先选择查询时间');
  }

  // 根据 picker 文本映射出数字参数
  const day    = weekColumns.findIndex(w => w.value === currentWeekday.value.value) + 1;
  const period = periodColumns.findIndex(p => p.value === currentPeriod.value.value) + 1;
  
  try {
    const res = await axios.get('/api/timetable/avail', {
      params: { day, period },
    });
    freeTeachers.value = res.data;
    console.log(res.data)
    activeName.value   = '';
    showToast(`查询到 ${res.data.length} 位空闲教师`);
  } catch (err) {
    console.error('查询空闲教师失败：', err);

    if (err.response?.status === 401) {
      showToast('登录已过期，请重新登录');
    } else {
      showToast('查询失败，请稍后重试');
    }
  }
};
  </script>
  
  <style scoped>
  .container { margin-top: 10px; }
  .picker-actions {
    display: flex;
    gap: 8px;
    padding: 16px;
  }
</style>
  