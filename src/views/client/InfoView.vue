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
        <span class="important">2023年8月5日上午</span>
      </div>
      <div>
        <span>婚礼地点：</span>
        <span>金茂北京王府井万丽酒店</span>
      </div>
      <div>
        <span>开始签到时间：</span>
        <span class="important">10:18</span>
      </div>
    </el-card>
    <el-card class="info-block">
      <template #header>
        <h3>坐席信息</h3>
      </template>
      <div>
        <div>
          <span>您的坐席标识为：</span>
          <span>[尚在调整中]</span>
          <!--el-image :src="guestInfo.getSeatImage()" class="image"></el-image-->
        </div>
      </div>
    </el-card>
    <el-card class="info-block">
      <template #header>
        <h3>注意事项</h3>
      </template>
      <p>1. <span class="important">谢绝礼金，感谢理解</span></p>
      <p>2. 到场后扫描现场二维码签到并领取伴手礼</p>
      <p>3. 如有停车需要请提前联系新郎或者新娘</p>
      <p>
        4. 若有条件，着装配色请尽量参考下面的色卡。
        <span class="important">得体即可，无风格要求。</span>
      </p>
      <div>
        <img src="@/assets/images/dress_code.png" style="width: 70%" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.important {
  color: rgb(182, 129, 56);
}
</style>
