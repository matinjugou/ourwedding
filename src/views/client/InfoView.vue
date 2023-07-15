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
        <span>开始签到时间：</span>
        <span>10:18</span>
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
      <div>
        <div>
          <span>您的坐席标识为：</span>
          <el-image :src="guestInfo.getSeatImage()" class="image"></el-image>
        </div>
      </div>
    </el-card>
    <el-card class="info-block">
      <template #header>
        <h3>注意事项</h3>
      </template>
      <p>1. 到场后扫描现场二维码签到并领取伴手礼</p>
      <p>2. 着装配色若有条件请尽量参考下面的色卡</p>
      <div>
        <img src="@/assets/images/dress_code.jpeg" style="width: 70%" />
      </div>
      <p>3. 如有停车需要请提前联系新郎或者新娘</p>
      <p>4. 谢绝礼金，感谢理解</p>
    </el-card>
  </div>
</template>

<style scoped>
/* .info-block {
  margin: 0 1rem 1rem;
} */
</style>
