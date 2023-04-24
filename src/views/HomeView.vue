<script setup>
import BlockButton from '@/components/BlockButton.vue'
import CheckIcon from '@/components/icons/IconCheck.vue'
import InfoIcon from '@/components/icons/IconInfo.vue'
import AccountIcon from '@/components/icons/IconAccount.vue'
import CameraIcon from '@/components/icons/IconCamera.vue'
import ChatIcon from '@/components/icons/IconChat.vue'
import BulletInBoardIcon from '@/components/icons/IconBulletInBoard.vue'
import HelpIcon from '@/components/icons/IconHelp.vue'
import InfoCard from '@/components/InfoCard.vue'

import { useGuestInfoStore } from '@/stores/guest.js'
const guestInfo = useGuestInfoStore()
const guestLogout = () => {
  guestInfo.logout()
}
</script>

<template>
  <header>
    <div class="wrapper">
      <InfoCard :name="guestInfo.name" :logined="guestInfo.logined" />
    </div>
  </header>
  <Transition name="fade" mode="out-in">
    <div v-if="guestInfo.logined">
      <BlockButton index="/checkin">
        <template #icon>
          <CheckIcon />
        </template>
        <template #details> 通过扫描现场二维码签到 </template>

        现场签到
      </BlockButton>

      <BlockButton index="/info">
        <template #icon>
          <InfoIcon />
        </template>
        <template #details>查询坐席、日程安排</template>

        信息查询
      </BlockButton>

      <BlockButton index="/bulletin">
        <template #icon>
          <BulletInBoardIcon />
        </template>
        <template #details> 参与弹幕互动 </template>

        弹幕互动
      </BlockButton>

      <!--BlockButton index="/chatroom">
        <template #icon>
          <ChatIcon />
        </template>
        <template #details> 参与现场聊天吧 </template>

        现场聊天室
      </BlockButton-->

      <BlockButton index="/photo/wall">
        <template #icon>
          <CameraIcon />
        </template>
        <template #details> 与现场观众分享你的留影 </template>

        留影叙佳期
      </BlockButton>

      <BlockButton :click-func="guestLogout">
        <template #icon>
          <AccountIcon />
        </template>
        <template #details> 退出登录状态 </template>

        用户登出
      </BlockButton>
    </div>
  </Transition>
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
</style>
