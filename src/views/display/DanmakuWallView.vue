<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDanmakuStore } from '@/stores/danmaku.js'
import lottie from 'lottie-web'

let meteorAnimation
let glitterAnimation

let animationPathRoot

if (process.env.NODE_ENV === 'development') {
  animationPathRoot = 'src'
} else {
  animationPathRoot = 'https://wedding.magichc7.com'
}

onMounted(() => {
  meteorAnimation = lottie.loadAnimation({
    container: document.getElementById('meteor-container'), // 包含动画的dom元素
    renderer: 'svg', // 渲染出来的是什么格式
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    path: `${animationPathRoot}/assets/xialiuxing/xialiuxing.json`
  })
  meteorAnimation.setSpeed(0.7)
  // 渲染主图按钮动画
  glitterAnimation = lottie.loadAnimation({
    container: document.getElementById('glitter-container'), // 包含动画的dom元素
    renderer: 'svg', // 渲染出来的是什么格式
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    path: `${animationPathRoot}/assets/xingguangshanshuo/xingguangshanshuo.json`
  })
  document.getElementsByClassName('home-btn')[0].style.display = 'none'
})
onUnmounted(() => {
  meteorAnimation.destroy()
  glitterAnimation.destroy()
})

const maxDisplayLength = 10
const cardCount = 3
const totalCardCount = cardCount + 3

const danmakuStore = useDanmakuStore()
const danmakuList = ref([])
const visibleDanmakuList = ref([])

const displayIndex = ref(0)
const nextVisibleDanmakuIndex = ref(0)
const nextInsertDanmakuIndex = ref(0)

const itemShow = (index) => {
  let distance = (index - displayIndex.value + totalCardCount) % totalCardCount
  if (distance === totalCardCount - 2) {
    return false
  }
  return true
}

const itemStyle = (index) => {
  let distance = (index - displayIndex.value + totalCardCount) % totalCardCount
  if (distance === totalCardCount - 1) {
    distance = -1
  }
  return {
    top: `${(100 / (totalCardCount - 3)) * distance}%`,
    height: `calc(100% / ${totalCardCount - 3})`
  }
}

// const apiRes = await danmakuStore.fetchDanmakuList()
for (let i = 0; i < totalCardCount; i++) {
  visibleDanmakuList.value.push({
    content: `init item`
  })
}
nextVisibleDanmakuIndex.value = totalCardCount - 3

const newDanmakuList = []
let lastUpdateTime = 0
let lastIdSet = new Set()
setInterval(() => {
  danmakuStore.fetchDanmakuList(0, 10, 'true', null, lastUpdateTime).then((res) => {
    if (res.data.length > 0) {
      const checkItem = (index) => {
        if (index >= res.data.length) {
          return
        }
        const item = res.data[index]
        if (item.update_time > lastUpdateTime) {
          insertNewDanmakuItem(item)
          lastUpdateTime = item.update_time
          lastIdSet.add(item.id)
        } else {
          if (!lastIdSet.has(item.id)) {
            insertNewDanmakuItem(item)
            lastIdSet.add(item.id)
          }
        }
        setTimeout(checkItem, 100, index + 1)
      }
      checkItem(0)
    }
  })
}, 1000)

const insertNewDanmakuItem = (item) => {
  newDanmakuList.push(item)
  step()
}

const step = () => {
  // update danmakuList
  if (newDanmakuList.length > 0) {
    const item = newDanmakuList.shift()
    danmakuList.value.push(item)
    if (danmakuList.value.length > maxDisplayLength) {
      danmakuList.value = danmakuList.value.slice(
        danmakuList.value.length - maxDisplayLength,
        danmakuList.value.length
      )
    }
    nextInsertDanmakuIndex.value = danmakuList.value.length - 1
  }

  // update visibleDanmakuList
  if (danmakuList.value.length > 0) {
    visibleDanmakuList.value[nextVisibleDanmakuIndex.value] =
      danmakuList.value[nextInsertDanmakuIndex.value]
    nextInsertDanmakuIndex.value = (nextInsertDanmakuIndex.value + 1) % danmakuList.value.length
  }

  displayIndex.value = (displayIndex.value + 1) % totalCardCount
  nextVisibleDanmakuIndex.value = (nextVisibleDanmakuIndex.value + 1) % totalCardCount
}

setInterval(step, 3000)
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
  position: absolute;
  right: 0;
}

#glitter-container {
  width: 100%;
  height: 100%;
  position: absolute;
  display: inline-block;
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
