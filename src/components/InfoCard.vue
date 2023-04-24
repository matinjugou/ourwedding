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
        <h1 class="green">欢迎光临</h1>
        <h3>您尚未登录，请通过微信扫描个人二维码登录。</h3>
      </div>
      <div v-else>
        <h1 class="green">欢迎光临，{{ name }}</h1>
        <h3>Enjoy your stay!</h3>
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

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  width: 100%;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
