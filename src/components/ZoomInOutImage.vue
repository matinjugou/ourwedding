<template>
  <img :src="src" @click="toggleFullscreen" :class="classObject" :style="style" :alt="alt" />
  <transition name="zoom">
    <div v-if="isFullscreen" class="overlay" @click="toggleFullscreen">
      <img
        :src="src"
        class="fullscreen-image"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      />
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const isFullscreen = ref(false)

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

const classObject = ref({
  fullscreen: isFullscreen.value,
  [props.class]: true
})

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  class: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  },
  alt: {
    type: String,
    default: ''
  }
})

let timer = null

function handleMouseDown(event) {
  if (event.button === 0) {
    timer = setTimeout(() => {
      saveImage()
    }, 1000)
  }
}

function handleMouseUp() {
  clearTimeout(timer)
}

function saveImage() {
  const link = document.createElement('a')
  link.href = this.src
  link.download = 'image.jpg'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.fullscreen {
  max-width: 100%;
  max-height: 100%;
  cursor: zoom-out;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  animation: zoom-in-out 0.5s ease-in-out forwards;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.5s ease-in-out;
}

.zoom-enter,
.zoom-leave-to {
  opacity: 0;
}

@keyframes zoom-in-out {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
