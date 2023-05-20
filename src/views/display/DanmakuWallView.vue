<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useDanmakuStore } from '@/stores/danmaku.js'

const danmakuStore = useDanmakuStore()
const sortedDanmakuList = ref([])

const timer = setInterval(() => {
  danmakuStore.getNewestDanmakuList().then((res) => {
    sortedDanmakuList.value = res.sort((a, b) => a.id - b.id)
  })
}, 60000)

onMounted(() => {
  danmakuStore.getNewestDanmakuList().then((res) => {
    sortedDanmakuList.value = res.sort((a, b) => a.id - b.id)
  })
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="danmaku-container">
    <div class="stars-container">
      <div
        v-for="(danmaku, index) in sortedDanmakuList"
        :key="index"
        :style="{
          '--duration': 5 + danmaku.content.length * 0.4 + 's',
          '--interval': 2 * index + 's',
          '--top': Math.random() * 100 + 'vh'
        }"
        class="danmaku"
      >
        <span class="danmaku-content">{{ danmaku.content }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.danmaku-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/nightsky.jpeg');
  background-size: 100% 100%;
  overflow: hidden;
}

.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.danmaku {
  position: absolute;
  top: var(--top);
  left: 100%;
  font-weight: bold;
  animation: danmaku-animation linear infinite;
  animation-delay: var(--interval);
  animation-duration: var(--duration);
  display: flex;
  white-space: nowrap;
  font-size: 1rem;
  line-height: 1.5; /* Add line height to make the padding-left equal to the container height */
  height: 1.5em; /* Set the container height */

  /* Clip the background to text, setting text color to transparent */
  -webkit-background-clip: text;
  background-clip: text;
  color: black;

  /* Add padding-left to ensure no text is displayed within the semicircle */
  padding-left: 1.5em; /* Set padding-left equal to container height */
  padding-right: 1.5em; /* Set padding-left equal to container height */
}

/* Use before to create the desired semicircle shape */
.danmaku::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #e6e9ef;
  border-radius: 100px 0 0 100px;
  transform: translateY(-50%);
}

.danmaku::after {
  content: '';
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  /* Set the background-color with gradient to create the trail */
  background: linear-gradient(to left, #e6e9ef 0%, #e6e9ef 100%, rgba(230, 233, 239, 0) 100%);
  width: 100%;
  height: 100%;
  clip-path: polygon(
    0% 0%,
    0% 100%,
    100% 50%
  ); /* To create the triangle with the correct direction */
}

.danmaku-content {
  position: relative;
  z-index: 1;
}

@keyframes danmaku-animation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - 100vw));
  }
}
</style>
