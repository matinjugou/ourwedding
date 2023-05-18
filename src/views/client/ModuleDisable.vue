<script setup>
import IconInfo from '@/components/icons/IconInfo.vue'
</script>

<template>
  <div class="module-disable main">
    <div class="header"></div>
    <div class="disable-card card">
      <img class="disable-image" src="@/assets/disabled.png" />
      <div class="module-disable__title">
        <div class="module-disable__icon">
          <IconInfo />
        </div>
        模块暂未开放，敬请期待
      </div>
    </div>
  </div>
</template>

<style scoped>
.disable-card {
  text-align: center;
}

.disable-image {
  width: 200px;
}

.module-disable__title {
  display: flex;
  justify-content: center;
  color: #727272;
}

.module-disable__icon {
  width: max-content;
}
</style>
