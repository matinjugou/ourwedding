<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useDanmakuStore } from '@/stores/danmaku.js'
import { useGuestInfoStore } from '@/stores/guest.js'
import { ElMessage } from 'element-plus'
import CheckbookIcon from '@/components/icons/IconCheckbook.vue'

const loading = ref(false)
const msgInput = ref('')
const danmakuList = reactive([])
const danmakuStore = useDanmakuStore()
const guestInfo = useGuestInfoStore()
const isAdmin = ref(false)

guestInfo.adminCheck().then((res) => {
  isAdmin.value = res.data.data.admin === 1
})

const lastDanmakuId = computed(() => {
  if (danmakuList.length > 0) {
    return danmakuList[danmakuList.length - 1].id
  } else {
    return 0
  }
})

const freshDanmakuList = (
  startId = 0,
  count = 1000,
  legal = 'all',
  authorId = guestInfo.userInfo.id
) => {
  loading.value = true
  danmakuStore.fetchDanmakuList(startId, count, legal, authorId).then((res) => {
    danmakuList.push(...res.data)
    loading.value = false
  })
}

const sendDanmaku = () => {
  if (msgInput.value.trim()) {
    danmakuStore.createDanmaku(msgInput.value.trim(), guestInfo.userInfo.id).then(() => {
      freshDanmakuList(lastDanmakuId.value)
      msgInput.value = ''
      ElMessage.success('发送成功')
    })
  }
}

onMounted(() => {
  freshDanmakuList()
})
</script>

<template>
  <div class="danmaku-page">
    <div class="border-bg"></div>
    <div class="danmaku-history-container" v-loading="loading">
      <h1 class="danmaku-title">历史弹幕</h1>
      <div v-for="danmaku in danmakuList" :key="danmaku.id" class="danmaku-item">
        {{ danmaku.content }}
      </div>
    </div>
    <div class="send-box">
      <input
        type="text"
        class="msg-input"
        placeholder="说点什么..."
        :disabled="loading"
        v-model="msgInput"
        @keyup.enter="sendDanmaku"
      />
      <button class="send-button" @click="sendDanmaku">发送</button>
    </div>
  </div>
  <RouterLink v-if="isAdmin" to="/review-danmaku">
    <i id="review-btn">
      <CheckbookIcon />
    </i>
  </RouterLink>
</template>

<style scoped>
.border-bg {
  background-image: url('@/assets/border_bg.png');
  width: 100%;
  height: calc(100% - 50px);
  background-size: 100% 100%;
  position: absolute;
}
.danmaku-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.danmaku-history-container {
  padding: 15px;
  padding-bottom: 60px; /* 新增 */
  /* background: #f0f3f4; */
  overflow-y: auto;
  height: calc(100vh - 50px); /* 新增 */
  flex: 1;
  overflow-y: auto;
  padding: 15px 10%;
}

.danmaku-title {
  text-align: center;
  line-height: 5rem;
  color: #dea610;
  font-weight: 500;
  font-size: 2.2rem;
  font-family: '阿里妈妈数智体 VF Regular';
  letter-spacing: 3px;
}
.danmaku-item {
  padding: 10px;
  /* text-align: center; */
  margin: 5px 0;
  /* border: 1px solid #ccc; */
  border-radius: 1rem;
  background-color: #ececec;
}

.send-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed; /* 新增 */
  bottom: 0; /* 新增 */
  left: 0; /* 新增 */
  right: 0; /* 新增 */
}

.msg-input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 6px 12px;
}

.send-button {
  margin-left: 10px;
  padding: 6px 12px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #249b49;
}

#review-btn {
  position: fixed;
  bottom: 140px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  color: red;
  font-size: 30px;
  display: flex;
  place-items: center;
  place-content: center;
}
</style>
