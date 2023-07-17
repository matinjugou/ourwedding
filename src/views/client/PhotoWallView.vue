<script setup>
import { onMounted, ref } from 'vue'
import { usePhotoStore } from '@/stores/photo.js'
import { useGuestInfoStore } from '@/stores/guest.js'
import ZoomInOutImage from '@/components/ZoomInOutImage.vue'
import RefreshIcon from '@/components/icons/IconRefresh.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import CheckbookIcon from '@/components/icons/IconCheckbook.vue'

const loading = ref(false)
const photoWall = usePhotoStore()
const guestInfo = useGuestInfoStore()

const isAdmin = ref(false)

guestInfo.adminCheck().then((res) => {
  isAdmin.value = res.data.data.admin === 1
})

const fadeInDelay = (index) => {
  return {
    animationDelay: `${0.1 * (index + 1)}s`
  }
}

const even = (arr) => {
  return arr.filter((_, index) => {
    return index % 2 === 0
  })
}

const odd = (arr) => {
  return arr.filter((_, index) => {
    return index % 2 === 1
  })
}

function loadImage() {
  loading.value = true
  photoWall.getOlderPhoto(() => {
    loading.value = false
  })
}

onMounted(() => {
  loadImage()
})

function imageSrc(filename) {
  if (process.env.NODE_ENV === 'development') {
    return `https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/image?filename=${filename}`
  } else {
    return filename
  }
}
</script>

<template>
  <div
    class="photo-wall"
    :infinite-scroll-immediate="false"
    v-infinite-scroll="loadImage"
    :infinite-scroll-distance="100"
    :infinite-scroll-delay="10000"
    :loading="loading"
  >
    <div class="waterfall-half">
      <ZoomInOutImage
        v-for="(photo, index) in odd(photoWall.photoList)"
        :key="photo.filename"
        :src="imageSrc(photo.filename)"
        :alt="photo.filename"
        class="photo-item"
        :style="[fadeInDelay(index)]"
      />
    </div>
    <div class="waterfall-half">
      <ZoomInOutImage
        v-for="(photo, index) in even(photoWall.photoList)"
        :key="photo.filename"
        :src="imageSrc(photo.filename)"
        :alt="photo.filename"
        class="photo-item"
        :style="[fadeInDelay(index)]"
      />
    </div>
  </div>
  <RouterLink to="/photo/add">
    <i id="add-btn">
      <AddIcon />
    </i>
  </RouterLink>
  <i id="fresh-btn" @click="photoWall.freshPhotoList()">
    <RefreshIcon />
  </i>
  <RouterLink v-if="isAdmin" to="/review-photo">
    <i id="review-btn">
      <CheckbookIcon />
    </i>
  </RouterLink>
</template>

<style>
.photo-wall {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0.5rem;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.waterfall-half img {
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

#add-btn {
  position: fixed;
  bottom: 140px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e3a40091;
  color: white;
  font-size: 30px;
  display: flex;
  place-items: center;
  place-content: center;
}

#review-btn {
  position: fixed;
  bottom: 300px;
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

.waterfall-half {
  width: 50%;
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
}
.waterfall-half:first-child {
  margin: 0 0.5rem 0 0;
}

.photo-item {
  width: 100%;
  border-radius: 1rem;
}
</style>
