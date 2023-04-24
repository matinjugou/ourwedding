<script setup>
import { ref, computed } from 'vue'
import { usePhotoStore } from '@/stores/photo.js'
import AddIcon from '@/components/icons/IconAdd.vue'

const photoWall = usePhotoStore()
const photoRows = computed(() => {
  const result = []

  photoWall.photoList.forEach((photo) => {
    const targetRow = result.find((row) => {
      const newRowWidth = row.width + photoWidth(photo)
      if (newRowWidth > 100) {
        return false
      }

      const newHorizontalCount = row.horizontalCount + (photo.horizontal ? 1 : 0)
      const newVerticalCount = row.verticalCount + (photo.horizontal ? 0 : 1)

      if (newHorizontalCount <= 2 && newVerticalCount <= 3) {
        return true
      }

      return false
    })

    if (targetRow) {
      targetRow.photos.push(photo)
      targetRow.width += photoWidth(photo)
      targetRow.horizontalCount += photo.horizontal ? 1 : 0
      targetRow.verticalCount += photo.horizontal ? 0 : 1
    } else {
      const newRow = {
        id: result.length,
        photos: [photo],
        width: photoWidth(photo),
        horizontalCount: photo.horizontal ? 1 : 0,
        verticalCount: photo.horizontal ? 0 : 1
      }
      result.push(newRow)
    }
  })

  function photoWidth(photo) {
    return photo.horizontal ? 50 : 30
  }

  return result
})
const fadeInDelay = (index) => {
  return {
    animationDelay: `${0.1 * (index + 1)}s`
  }
}
const photoStyle = (row, photo) => {
  if (photo.horizontal && row.horizontalCount === 1 && row.verticalCount === 1) {
    return { width: 'calc(100% - 30% - 10px)', height: '100px' }
  } else if (!photo.horizontal && row.horizontalCount === 1 && row.verticalCount === 1) {
    return { width: '30%', height: '100px' }
  } else {
    return { width: photo.horizontal ? '50%' : '30%', height: '100px' }
  }
}
photoWall.freshPhotoList()
</script>

<template>
  <div class="photo-wall">
    <div v-for="row in photoRows" :key="row.id" class="photo-row">
      <img
        v-for="(photo, index) in row.photos"
        :key="photo.id"
        :src="photo.src"
        :alt="photo.title"
        :class="{ horizontal: photo.horizontal, vertical: !photo.horizontal }"
        :style="[photoStyle(row, photo), fadeInDelay(index)]"
      />
    </div>
  </div>
  <RouterLink to="/photo/add">
    <i id="add-btn">
      <AddIcon />
    </i>
  </RouterLink>
</template>

<style scoped>
.photo-wall {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photo-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.photo-row img {
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

#add-btn {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #67c23a;
  color: white;
  font-size: 30px;
  display: flex;
  place-items: center;
  place-content: center;
}
</style>
