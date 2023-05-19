<script setup>
import { ref, onMounted } from 'vue'
import { usePhotoStore } from '@/stores/photo.js'
import ReturnIcon from '@/components/icons/IconReturn.vue'
import RefreshIcon from '@/components/icons/IconRefresh.vue'
import { Check, Close, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ZoomInOutImage from '@/components/ZoomInOutImage.vue'

const loading = ref(false)
const index = ref(0)
const photoStore = usePhotoStore()
const unreviewedPhotoList = ref([])

const getUnreviewedPhotoList = () => {
  loading.value = true
  photoStore.getUnreviewedPhotoList().then((res) => {
    unreviewedPhotoList.value = res.data.data
    index.value = 0
    loading.value = false
  })
}

const reviewPhoto = (legal) => {
  const filename = unreviewedPhotoList.value[index.value]
  photoStore
    .reviewPhoto(filename, legal)
    .then(() => {
      ElMessage.success('审核成功')
      getUnreviewedPhotoList()
    })
    .catch(() => {
      ElMessage.error('审核失败')
    })
}

const lastIndex = () => {
  if (index.value === 0) {
    index.value = unreviewedPhotoList.value.length - 1
  } else {
    index.value--
  }
}

const nextIndex = () => {
  if (index.value === unreviewedPhotoList.value.length - 1) {
    index.value = 0
  } else {
    index.value++
  }
}

function imageSrc(filename) {
  if (process.env.NODE_ENV === 'development') {
    return `https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/image?filename=${filename}`
  } else {
    return filename
  }
}

onMounted(() => {
  getUnreviewedPhotoList()
})
</script>

<template>
  <div class="photo-page">
    <div class="border-bg"></div>
    <div class="photo-history-container">
      <h1 class="photo-title">审核图片</h1>
      <div class="photo-box" :loading="loading">
        <ZoomInOutImage
          v-if="unreviewedPhotoList.length > 0"
          :src="imageSrc(unreviewedPhotoList[index])"
          :alt="unreviewedPhotoList[index]"
          :style="{
            width: '100%',
            borderRadius: '1rem'
          }"
        />
        <span v-else>暂无未审核的图片</span>
      </div>
      <el-row
        v-if="unreviewedPhotoList.length > 0"
        style="justify-content: space-around; margin-top: 20px"
      >
        <el-button :icon="ArrowLeft" @click="lastIndex"></el-button>
        <el-button type="success" :icon="Check" @click="reviewPhoto('1')">通过</el-button>
        <el-button type="danger" :icon="Close" @click="reviewPhoto('0')">拒绝</el-button>
        <el-button :icon="ArrowRight" @click="nextIndex"></el-button>
      </el-row>
    </div>
  </div>
  <RouterLink to="/photo/wall">
    <i id="return-btn">
      <ReturnIcon />
    </i>
  </RouterLink>
  <i id="fresh-btn" @click="getUnreviewedPhotoList">
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
.photo-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.photo-history-container {
  padding: 15px;
  padding-bottom: 60px; /* 新增 */
  /* background: #f0f3f4; */
  overflow-y: auto;
  height: calc(100vh - 50px); /* 新增 */
  flex: 1;
  overflow-y: auto;
  padding: 15px 10%;
}

.photo-title {
  text-align: center;
  line-height: 5rem;
  color: #dea610;
  font-weight: 500;
  font-size: 2.2rem;
  font-family: '阿里妈妈数智体 VF Regular';
  letter-spacing: 3px;
}
.photo-item {
  padding: 10px;
  /* text-align: center; */
  margin: 5px 0;
  /* border: 1px solid #ccc; */
  border-radius: 1rem;
  background-color: #ececec;
}
.photo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  padding: 20px;
  /* text-align: center; */
  height: 60%;
  margin: 5px 0;
  border-radius: 1rem;
  background-color: #ececec;
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
