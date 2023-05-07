<script setup>
import { ref } from 'vue'
import ReturnIcon from '@/components/icons/IconReturn.vue'
import { usePhotoStore } from '@/stores/photo.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const photoStore = usePhotoStore()
const photoInput = ref(null)
const imageSrc = ref('')

const selectPhoto = () => {
  photoInput.value.click()
}

const onFileChange = (e) => {
  const files = e.target.files || e.dataTransfer.files
  if (!files.length) return
  createImage(files[0])
}

const createImage = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    imageSrc.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const uploadPhoto = () => {
  if (!imageSrc.value) return

  console.log('上传图片', imageSrc.value)
  photoStore
    .uploadPhoto(imageSrc.value)
    .then((res) => {
      ElMessage.success('上传成功')
      router.push('/photo/wall')
    })
    .catch((err) => {
      ElMessage.error('上传失败')
    })
}
</script>

<template>
  <div class="upload-page">
    <input
      type="file"
      ref="photoInput"
      accept="image/*"
      @change="onFileChange"
      style="display: none"
    />
    <div class="upload-container" @click="selectPhoto">
      <div v-if="!imageSrc" class="upload-placeholder">点击上传照片</div>
      <img v-else :src="imageSrc" alt="预览" />
    </div>
    <div v-if="imageSrc" class="upload-button-container">
      <el-button @click="uploadPhoto" type="success" round>上传</el-button>
    </div>
  </div>
  <RouterLink to="/photo/wall">
    <i id="return-btn">
      <ReturnIcon />
    </i>
  </RouterLink>
</template>

<style scoped>
.upload-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 100vw;
  max-height: 400px;
  margin: 20% 0;
  border: 2px dashed #ccc;
}

.upload-placeholder {
  color: #ccc;
  font-size: 20px;
  text-align: center;
}

.upload-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.upload-button-container {
  margin: 10px 0;
}

.upload-button-container button {
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  padding: 6px 18px;
  cursor: pointer;
}

#return-btn {
  position: fixed;
  bottom: 100px;
  right: 20px;
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
</style>
