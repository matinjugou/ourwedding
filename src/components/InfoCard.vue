<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  logined: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <Transition name="fade" mode="out-in">
      <div v-if="!logined">
        <h1 class="title">欢迎光临</h1>
        <p>您尚未登录，请通过微信扫描个人二维码登录。</p>
      </div>
      <div v-else>
        <h1 class="title">欢迎光临，{{ name }}</h1>
        <p>Enjoy your stay!</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.greetings {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-image: url('@/assets/bg.png');
  background-size: cover;
  background-position: center;
  padding: 56.8vh 2rem 2rem;
  overflow: hidden;
}

.greetings h1 {
  background-image: url('@/assets/gold_bg.jpeg');
  background-size: contain;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
  font-family: 阿里妈妈东方大楷 Regular;
  font-weight: 500;
  font-size: 2.6rem;
  line-height: initial;
  white-space: nowrap;
}

.greetings p {
  font-family: '阿里巴巴普惠体 2.0 35 Thin';
  color: #f6e3e3c2;
  font-weight: 600;
  font-size: 1rem;
}
.greetings h1,
.greetings p {
  /* text-align: center; */
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings p {
    text-align: left;
  }
}
</style>
