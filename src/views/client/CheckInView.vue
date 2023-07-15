<script setup>
import { ref } from 'vue'
import { useGuestInfoStore } from '@/stores/guest.js'
import { QrcodeStream, QrcodeDropZone } from 'vue3-qrcode-reader'
import { ElMessage } from 'element-plus'

const guestInfo = useGuestInfoStore()
const errorMessage = ref('')
const qrCodeScanner = ref(false)
const onInit = async function (promise) {
  try {
    await promise
  } catch (error) {
    if (error.name === 'StreamApiNotSupportedError') {
      errorMessage.value.textContent = '您的浏览器不支持该功能'
    } else if (error.name === 'NotAllowedError') {
      errorMessage.value = '没有摄像头访问权限'
    } else if (error.name === 'NotFoundError') {
      errorMessage.value = '没有找到摄像头'
    } else if (error.name === 'NotSupportedError') {
      errorMessage.value = '您的浏览器不支持摄像头访问，或者您的浏览器不支持MediaDevices API'
    } else if (error.name === 'NotReadableError') {
      errorMessage.value = '摄像头被占用，或者您拒绝了访问摄像头的请求'
    } else if (error.name === 'OverconstrainedError') {
      errorMessage.value = '您的摄像头不支持所需的分辨率，或者您的摄像头不支持所需的帧率'
    } else {
      errorMessage.value = '未知错误: ' + error.message
    }
    ElMessage.error(errorMessage.value)
  }
}
const onDecode = (result) => {
  qrCodeScanner.value = false
  guestInfo
    .checkin(result)
    .then(() => {
      ElMessage.success('签到成功')
      window.location.reload()
    })
    .catch((err) => {
      errorMessage.value = err.response.data.message
      ElMessage.error('签到失败：' + errorMessage.value)
    })
}
const scanQRCode = () => {
  qrCodeScanner.value = true
}
</script>

<template>
  <div class="main">
    <div class="header"></div>
    <div v-if="guestInfo.userInfo.checkin" class="card">
      <el-row>
        <el-col :span="24">
          <span>
            您是今天第
            <h1>{{ guestInfo.userInfo.checkin_index }}</h1>
            位签到的客人</span
          >
        </el-col>
        <el-col :span="24">
          <span>签到时间：{{ guestInfo.userInfo.checkin_time }}</span>
        </el-col>
      </el-row>
    </div>
    <div v-if="!guestInfo.userInfo.checkin" class="card">
      <el-row justify="center">
        <el-col :span="24" class="hint">您尚未签到，请扫描现场二维码签到</el-col>
      </el-row>
      <el-row justify="center">
        <el-button @click="scanQRCode" type="primary" class="btn">点击扫码</el-button>
      </el-row>
    </div>
  </div>
  <div class="scan-box-fullscreen" v-if="qrCodeScanner">
    <qrcode-drop-zone>
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </qrcode-drop-zone>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  font-weight: 500;
  color: var(--color-heading);
}

.scan-box-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hint {
  color: #4d4d4d;
  text-align: center;
}
.btn {
  margin-top: 10px;
  width: 100%;
}
</style>
