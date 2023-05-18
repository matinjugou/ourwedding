<script setup>
import { ref } from 'vue'
import { useChatroomStore } from '@/stores/chatroom.js'

const qrcode = ref('')
const loading = ref(true)
const errorMessage = ref('')
const chatroom = useChatroomStore()
chatroom.getChatroomQrcode().then((res) => {
  loading.value = false
  if (res.data.code === 0) {
    qrcode.value = res.data.data
  }
})
</script>

<template>
  <div class="main">
    <div class="header"></div>
    <el-card :body-style="{ padding: '0px' }">
    <el-image v-loading="loading" :src="qrcode" class="image">
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
    <div style="padding: 14px">请扫码加入现场群聊</div>
    <div v-if="errorMessage">
      <el-alert :title="errorMessage" type="error" />
    </div>
  </el-card>
  </div>

</template>

<style scoped>
.image {
  width: fit-content;
  height: 400px;
  display: block;
  margin: 1rem;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
</style>
