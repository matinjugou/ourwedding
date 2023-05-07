<script setup>
import { useGuestInfoStore } from '@/stores/guest.js'

const guestInfo = useGuestInfoStore()
</script>

<template>
  <div class="main">
    <div class="header"></div>
  <el-card class="info-block">
    <template #header>
      <h3>婚礼信息</h3>
    </template>
    <div>
      <span>婚礼主题：</span>
      <span>Healing Dream</span>
    </div>
    <div>
      <span>婚礼日期：</span>
      <span>2023年8月5日上午</span>
    </div>
    <div>
      <span>婚礼地点：</span>
      <span>金茂北京王府井万丽酒店</span>
    </div>
  </el-card>
  <el-card class="info-block">
    <template #header>
      <h3>坐席信息</h3>
    </template>
    <span v-if="!guestInfo.seatImg">未查询到您的坐席信息</span>
    <div v-else>
      <div>
        <span>您的坐席标识为：</span>
        <el-image :src="guestInfo.seatImg" class="image"></el-image>
      </div>
    </div>
  </el-card>
  <el-card class="info-block">
    <template #header>
      <h3>日程安排</h3>
    </template>
    <span>尚无当日日程安排，敬请期待</span>
  </el-card>
  </div>
  
</template>

<style scoped>
/* .info-block {
  margin: 0 1rem 1rem;
} */




</style>
