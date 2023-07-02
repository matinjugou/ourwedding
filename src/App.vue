<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useGuestInfoStore } from '@/stores/guest.js'
import HomeIcon from '@/components/icons/IconHome.vue'
const guestInfo = useGuestInfoStore()
guestInfo.init()
</script>

<template>
  <RouterView />
  <RouterLink to="/">
    <i class="home-btn">
      <HomeIcon />
    </i>
  </RouterLink>
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

header {
  line-height: 1.5;
  max-height: 100vh;
}

header .wrapper {
  margin: auto;
  max-width: 500px;
}

.logo {
  display: none;
}

.home-btn {
  position: fixed;
  bottom: 60px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* background-color: var(--color-heading); */
  background-color: #69839d9e;
  color: white;
  font-size: 30px;
  display: flex;
  place-items: center;
  place-content: center;
  z-index: 999;
}
.home-btn-top {
  top: 20px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: center;
    flex-wrap: wrap;
  }
}
</style>
