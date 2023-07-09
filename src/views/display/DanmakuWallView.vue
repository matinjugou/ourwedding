<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDanmakuStore } from '@/stores/danmaku.js'
import lottie from 'lottie-web'

let meteorAnimation
let glitterAnimation
onMounted(() => {
  meteorAnimation = lottie.loadAnimation({
    container: document.getElementById('meteor-container'), // 包含动画的dom元素
    renderer: 'svg', // 渲染出来的是什么格式
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    path: 'src/assets/xialiuxing/xialiuxing.json'
  })
  meteorAnimation.setSpeed(0.7)
  // 渲染主图按钮动画
  glitterAnimation = lottie.loadAnimation({
    container: document.getElementById('glitter-container'), // 包含动画的dom元素
    renderer: 'svg', // 渲染出来的是什么格式
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    path: 'src/assets/xingguangshanshuo/xingguangshanshuo.json'
  })
  document.getElementsByClassName('home-btn')[0].style.display = "none";
})
onUnmounted(() => {
  meteorAnimation.destroy()
  glitterAnimation.destroy()
})

const maxDisplayLength = 10
const cardCount = 6

const danmakuStore = useDanmakuStore()
const danmakuList = ref([])
const visibleDanmakuList = ref([])

const displayIndex = ref(0)
const nextVisibleDanmakuIndex = ref(0)
const nextInsertDanmakuIndex = ref(0)

const itemShow = (index) => {
  let distance = (index - displayIndex.value + cardCount) % cardCount
  if (distance === cardCount - 2) {
    return false
  }
  return true
}

const itemStyle = (index) => {
  let distance = (index - displayIndex.value + cardCount) % cardCount
  if (distance === cardCount - 1) {
    distance = -1
  }
  return {
    top: `${(100 / (cardCount - 3)) * distance}%`,
    height: `calc(100% / ${cardCount - 3})`
  }
}

// const apiRes = await danmakuStore.fetchDanmakuList()
for (let i = 0; i < cardCount; i++) {
  visibleDanmakuList.value.push({
    content: `init item`
  })
}
nextVisibleDanmakuIndex.value = 3

const insertNewDanmakuItem = (item) => {
  danmakuList.value.push(item)
  if (danmakuList.value.length > maxDisplayLength) {
    danmakuList.value = danmakuList.value.slice(
      danmakuList.value.length - maxDisplayLength,
      danmakuList.value.length
    )
  }
  nextInsertDanmakuIndex.value = danmakuList.value.length - 1
}

let danmakuId = 0

const generateNewDanmaku = (timeout) => {
  setTimeout(() => {
    insertNewDanmakuItem({
      author: {
        id: 10001,
        name: '黄超'
      },
      content: `弹幕文字弹幕文字弹幕文字弹幕文字弹幕文字${danmakuId}`,
      create_time: '2023-05-16T00:10:49',
      id: danmakuId,
      legal: 1
    })
    danmakuId += 1
    generateNewDanmaku(Math.floor(Math.random() * 10) + 1)
  }, timeout * 1000)
}
generateNewDanmaku(0)

setInterval(() => {
  // update visibleDanmakuList
  if (danmakuList.value.length > 0) {
    visibleDanmakuList.value[nextVisibleDanmakuIndex.value] =
      danmakuList.value[nextInsertDanmakuIndex.value]
    nextInsertDanmakuIndex.value = (nextInsertDanmakuIndex.value + 1) % danmakuList.value.length
  }

  displayIndex.value = (displayIndex.value + 1) % cardCount
  nextVisibleDanmakuIndex.value = (nextVisibleDanmakuIndex.value + 1) % cardCount
}, 3000)
</script>

<template>
  <div class="danmaku-wall">
    <div class="danmaku-container">
      <div id="meteor-container"></div>
      <div id="glitter-container"></div>
      <div
        v-for="(item, index) in visibleDanmakuList"
        :key="index"
        class="danmaku-item"
        :style="itemStyle(index)"
        v-show="itemShow(index)"
      >
        <div class="danmaku-content">
          <div class="text-container">
            <div class="text" :class="{ 'scrolling-text': item.content.length > 20 }">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#meteor-container {
  width: 100%;
  height: 100%;
  position: absolute;
}
#glitter-container {
  width: 100%;
  height: 100%;
  position: absolute;
}
.danmaku-wall {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/nightsky.jpeg');
  padding: 15px 0;
  background-size: 100% 100%;
  overflow: hidden;
}

.danmaku-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.danmaku-item {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 15px;
  transition: top 0.3s ease-out;
}

.danmaku-content {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  display: flex;
  height: 100%;
  padding: 32px;
  align-items: center;
}

.text-container {
  display: flex;
  align-items: center;
  border-radius: 15px;
  /* background-color: rgba(255, 255, 255, 0.999); */
  width: 100%;
  height: 100%;
  /* padding: 5px; */
  overflow: hidden;
}

.text {
  font-family: '阿里妈妈刀隶体 Regular';
  padding-left: 10px;
  font-size: 84px;
  color: #ecec98f0;
  white-space: nowrap;
}

.scrolling-text {
  animation: scrollingText 10s linear infinite;
}

@keyframes scrollingText {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
