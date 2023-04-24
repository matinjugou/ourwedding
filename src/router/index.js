import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckinView from '../views/CheckinView.vue'
import ChatroomView from '../views/ChatroomView.vue'
import InfoView from '../views/InfoView.vue'
import ModuleDisable from '../views/ModuleDisable.vue'
import api from '@/services/api'

function checkModuleState() {
  return (to, from, next) => {
    api.get('/module/state?moduleName=' + to.name).then((res) => {
      if (!res.data.data.enable) {
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
      component: HomeView
    },
    {
      path: '/checkin',
      name: 'checkin',
      component: CheckinView
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: ChatroomView,
      beforeEnter: checkModuleState()
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView
    },
    {
      path: '/module-disable',
      name: 'module-disable',
      component: ModuleDisable
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/photo/wall',
      name: 'photoWall',
      component: () => import('../views/PhotoWallView.vue')
    },
    {
      path: '/photo/add',
      name: 'photoAdd',
      component: () => import('../views/PhotoAddView.vue')
    },
    {
      path: '/bulletin',
      name: 'bulletin',
      component: () => import('../views/BulletInBoardView.vue')
    }
  ]
})

export default router
