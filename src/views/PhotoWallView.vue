<script setup>
// import { ref, computed } from 'vue'
import { usePhotoStore } from '@/stores/photo.js'
import AddIcon from '@/components/icons/IconAdd.vue'
import RefreshIcon from '@/components/icons/IconRefresh.vue'

const photoWall = usePhotoStore()

// const photoRows = computed(() => {
//   const result = []

//   photoWall.photoList.forEach((photo) => {
//     const targetRow = result.find((row) => {
//       const newRowWidth = row.width + photoWidth(photo)
//       if (newRowWidth > 100) {
//         return false
//       }

//       const newHorizontalCount = row.horizontalCount + (photo.horizontal ? 1 : 0)
//       const newVerticalCount = row.verticalCount + (photo.horizontal ? 0 : 1)

//       if (newHorizontalCount <= 2 && newVerticalCount <= 3) {
//         return true
//       }

//       return false
//     })

//     if (targetRow) {
//       targetRow.photos.push(photo)
//       targetRow.width += photoWidth(photo)
//       targetRow.horizontalCount += photo.horizontal ? 1 : 0
//       targetRow.verticalCount += photo.horizontal ? 0 : 1
//     } else {
//       const newRow = {
//         id: result.length,
//         photos: [photo],
//         width: photoWidth(photo),
//         horizontalCount: photo.horizontal ? 1 : 0,
//         verticalCount: photo.horizontal ? 0 : 1
//       }
//       result.push(newRow)
//     }
//   })

//   function photoWidth(photo) {
//     return photo.horizontal ? 50 : 30
//   }

//   return result
// })

const fadeInDelay = (index) => {
  return {
    animationDelay: `${0.1 * (index + 1)}s`
  }
}

const even = (arr)=>{
  return arr.filter((_,index)=>{
    return index%2 === 0;
  })
}

const odd = (arr) =>{
  return arr.filter((_,index)=>{
    return index%2 === 1;
  })
}
photoWall.freshPhotoList()
</script>

<template>
  <div class="photo-wall">
      <div class="waterfall-half">
        <img
        v-for="(photo, index) in odd(photoWall.photoList)"
        :key="photo.filename"
        :src="`https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/image?filename=${photo.filename}`"
        :alt="photo.filename"
        class="photo-item"
        :style="[fadeInDelay(index)]"
      />
      </div>
      <div class="waterfall-half">
        <img
        v-for="(photo, index) in even(photoWall.photoList)"
        :key="photo.filename"
        :src="`https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/image?filename=${photo.filename}`"
        :alt="photo.filename"
        class="photo-item"
        :style="[fadeInDelay(index)]"
      />
    </div>
  </div>
  <i id="fresh-btn" @click="photoWall.freshPhotoList()">
    <RefreshIcon />
  </i>
  <RouterLink to="/photo/add">
    <i id="add-btn">
      <AddIcon />
    </i>
  </RouterLink>
</template>

<style scoped>
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

.photo-item{
  width: 100%;
  border-radius: 1rem;
}
</style>
