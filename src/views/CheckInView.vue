<script setup>
import { reactive, ref } from 'vue'
import { useGuestInfoStore } from '@/stores/guest.js'
import { Camera } from '@element-plus/icons-vue'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue3-qrcode-reader'
import { ElMessage } from 'element-plus'

const loading = ref(true)
const guestInfo = useGuestInfoStore()
const checkedInStatus = reactive({
  index: 0,
  time: 0,
  status: false
})
const checkIfUserCheckedIn = () => {
  guestInfo
    .getCheckedInStatus()
    .then((res) => {
      if (res.status === 200) {
        checkedInStatus.index = res.data.index
        checkedInStatus.time = res.data.time
        checkedInStatus.status = res.data.status
      }
    })
    .finally(() => {
      loading.value = false
    })
}
checkIfUserCheckedIn()

const scenarioCode = ref('')
const errorMessage = ref('')
const qrCodeScanner = ref(false)
const onInit = async function (promise) {
  try {
    await promise
  } catch (error) {
    if (error.name === 'StreamApiNotSupportedError') {
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
  scenarioCode.value = result
  guestInfo.checkin(scenarioCode.value).then((res) => {
    if (res.data.code === 0) {
      checkedInStatus.index = res.data.data.index
      checkedInStatus.time = res.data.data.time
      checkedInStatus.status = res.data.data.status
    } else {
      errorMessage.value = res.data.msg
      ElMessage.error(errorMessage.value)
    }
  })
}
const scanQRCode = () => {
  qrCodeScanner.value = true
}
</script>

<template>
  <div v-loading="loading" class="main">
    <div class="header"></div>
    <div v-if="checkedInStatus.status" class="card">
      <el-row>
        <el-col :span="24">
          <span>
            您是今天第
            <h1>{{ checkedInStatus.index }}</h1>
            位签到的客人</span
          >
        </el-col>
        <el-col :span="24">
          <span>签到时间：{{ checkedInStatus.time }}</span>
        </el-col>
      </el-row>
    </div>
    <div v-if="!checkedInStatus.status && !loading" class="card">
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
      <qrcode-stream @decode="onDecode" @init="onInit" camera="front" />
    </qrcode-drop-zone>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  font-weight: 500;
  color: var(--color-heading);
}
.el-loading-mask {
  z-index: 9;
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

.hint{
  color: #4d4d4d;
  text-align: center;
}
.btn{
  margin-top: 10px;
  width: 100%;
}
</style>
