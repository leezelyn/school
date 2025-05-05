<template>
    <van-calendar title="日历" :poppable="false" :show-confirm="false" :style="{ height: '50%' }"
        :formatter="formatter" />
</template>
<script setup>
const formatter = (day) => {
    const month = day.date.getMonth() + 1;
    const date = day.date.getDate();

    const fixedHolidays = {
        '1-1': '元旦',
        '3-8': '妇女节',
        '3-20': '春分',
        '4-4': '清明',
        '4-19': '谷雨',
        '3-8': '妇女节',
        '5-4': '青年节',
        '5-5': '立夏',
        '5-20': '小满',
        '6-1': '儿童节',
    };

    const key = `${month}-${date}`;
    if (fixedHolidays[key]) {
        day.bottomInfo = fixedHolidays[key];
    }

    return day;
}

</script>
<style lang="scss" scoped>
::v-deep .van-calendar__header-title {
    display: none;
}
</style>