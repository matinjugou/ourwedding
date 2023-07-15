<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDanmakuStore } from '@/stores/danmaku.js'
import ReturnIcon from '@/components/icons/IconReturn.vue'
import RefreshIcon from '@/components/icons/IconRefresh.vue'
import { Check, Close, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const index = ref(0)
const danmakuStore = useDanmakuStore()
const unreviewedDanmakuList = ref([])

const getUnreviewedDanmakuList = (startId = 0, count = 1000, legal = 'null') => {
  loading.value = true
  danmakuStore.fetchDanmakuList(startId, count, legal, '').then((res) => {
    unreviewedDanmakuList.value = res.data
    index.value = 0
    loading.value = false
  })
}

const reviewDanmaku = (legal) => {
  const id = unreviewedDanmakuList.value[index.value].id
  danmakuStore
    .reviewDanmaku(id, legal)
    .then(() => {
      ElMessage.success('审核成功')
      getUnreviewedDanmakuList()
    })
    .catch(() => {
      ElMessage.error('审核失败')
    })
}

const lastIndex = () => {
  if (index.value === 0) {
    index.value = unreviewedDanmakuList.value.length - 1
  } else {
    index.value--
  }
}

const nextIndex = () => {
  if (index.value === unreviewedDanmakuList.value.length - 1) {
    index.value = 0
  } else {
    index.value++
  }
}

let timer = null

onMounted(() => {
  timer = setInterval(getUnreviewedDanmakuList, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="danmaku-page">
    <div class="border-bg"></div>
    <div class="danmaku-history-container">
      <h1 class="danmaku-title">审核弹幕</h1>
      <div
        class="danmaku-box"
        :loading="loading"
        :class="{ 'non-content': unreviewedDanmakuList.length === 0 }"
      >
        <p v-if="unreviewedDanmakuList.length > 0">{{ unreviewedDanmakuList[index].content }}</p>
        <span v-else>暂无未审核的弹幕</span>
      </div>
      <el-row
        v-if="unreviewedDanmakuList.length > 0"
        style="justify-content: space-around; margin-top: 20px"
      >
        <el-button :icon="ArrowLeft" @click="lastIndex"></el-button>
        <el-button type="success" :icon="Check" @click="reviewDanmaku('1')">通过</el-button>
        <el-button type="danger" :icon="Close" @click="reviewDanmaku('0')">拒绝</el-button>
        <el-button :icon="ArrowRight" @click="nextIndex"></el-button>
      </el-row>
    </div>
  </div>
  <RouterLink to="/bulletin">
    <i id="return-btn">
      <ReturnIcon />
    </i>
  </RouterLink>
  <i id="fresh-btn" @click="getUnreviewedDanmakuList()">
    <RefreshIcon />
  </i>
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
.danmaku-box {
  padding: 20px;
  /* text-align: center; */
  height: 60%;
  margin: 5px 0;
  border-radius: 1rem;
  background-color: #ececec;
}
.danmaku-box.non-content {
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
}

#return-btn {
  position: fixed;
  bottom: 140px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #67c23a75;
  color: white;
  font-size: 30px;
  display: flex;
  place-items: center;
  place-content: center;
}

#fresh-btn {
  position: fixed;
  bottom: 220px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #02679a6b;
  color: white;
  font-size: 30px;
  display: flex;
  place-items: center;
  place-content: center;
}
</style>
