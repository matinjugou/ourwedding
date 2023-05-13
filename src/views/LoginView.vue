<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { useGuestInfoStore } from '@/stores/guest.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const guestInfo = useGuestInfoStore()
const username = ref('')
const inviteCode = route.query.invite_code

function verify() {
  guestInfo
    .verify(inviteCode, username.value)
    .then((res) => {
      ElMessage.success('登录成功')
      guestInfo.login(res.data.data)
      router.push('/')
    })
    .catch((err) => {
      ElMessage.error(err.response.data.message)
    })
}

function checkInviteCode() {
  return inviteCode
}
</script>

<template>
  <div class="main">
    <div class="header"></div>
    <el-card class="card_form" v-if="checkInviteCode()">
      <template #header> <h3>请输入姓名以验证身份</h3> </template>
      <el-form ref="loginForm" label-width="0px">
        <el-form-item>
          <el-input v-model="username" placeholder="姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="verify" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-else style="text-align: center">
      <span>验证失败，请确认二维码正确</span>
    </el-card>
  </div>
</template>
