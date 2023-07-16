import { createRouter, createWebHistory } from 'vue-router'
import api from '@/services/api'

function checkModuleState() {
  return (to, from, next) => {
    api
      .get(
        'https://global-settings-wedding-service-srkycydkes.cn-beijing.fcapp.run/module-enable?name=' +
          to.name
      )
      .then((res) => {
        if (!res.data.enabled) {
          next({ name: 'module-disable' })
        } else {
          next()
        }
      })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/client/HomeView.vue')
    },
    {
      path: '/checkin',
      name: 'checkin',
      component: () => import('../views/client/CheckinView.vue'),
      beforeEnter: checkModuleState()
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: () => import('../views/client/ChatroomView.vue'),
      beforeEnter: checkModuleState()
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/client/InfoView.vue'),
      beforeEnter: checkModuleState()
    },
    {
      path: '/module-disable',
      name: 'module-disable',
      component: () => import('../views/client/ModuleDisable.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/client/LoginView.vue')
    },
    {
      path: '/photo/wall',
      name: 'photoWall',
      component: () => import('../views/client/PhotoWallView.vue'),
      beforeEnter: checkModuleState()
    },
    {
      path: '/photo/add',
      name: 'photoAdd',
      component: () => import('../views/client/PhotoAddView.vue')
    },
    {
      path: '/bulletin',
      name: 'bulletin',
      component: () => import('../views/client/BulletInBoardView.vue'),
      beforeEnter: checkModuleState()
    },
    {
      path: '/review-danmaku',
      name: 'review-danmaku',
      component: () => import('../views/admin/ReviewDanmakuView.vue')
    },
    {
      path: '/review-photo',
      name: 'review-photo',
      component: () => import('../views/admin/ReviewPhotoView.vue')
    },
    {
      path: '/danmaku-wall',
      name: 'danmaku-wall',
      component: () => import('../views/display/DanmakuWallView.vue')
    }
  ]
})

export default router
