import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'

import { useGuestInfoStore } from './stores/guest'
const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

const guestInfo = useGuestInfoStore()

let initInvoked = false

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !initInvoked) {
    guestInfo
      .init()
      .then((res) => {
        ElMessage.success('登录成功')
        guestInfo.login(res.data.data)
        router.push('/')
      })
      .catch((err) => {
        guestInfo.logout()
        router.push('/')
        try {
          ElMessage.error(err.response.data.message)
        } catch {
          // ElMessage.error(err)
        }
      })
  }
  initInvoked = true
  next()
})

app.mount('#app')
