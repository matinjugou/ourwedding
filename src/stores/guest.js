import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useGuestInfoStore = defineStore('guestInfo', () => {
  const logined = ref(false)
  const verifying = ref(false)
  const userInfo = ref({
    id: 0,
    name: '',
    invite_code: 0,
    seat_type: 0,
    checkin: false,
    checkin_time: '',
    checkin_index: 0
  })
  function verifyUserInfo(userInfo) {
    return (
      userInfo.id !== undefined &&
      userInfo.id !== 0 &&
      userInfo.name !== undefined &&
      userInfo.name !== ''
    )
  }

  function adminCheck() {
    return api.get(
      `https://query-user-wedding-service-ffgpllgiuy.cn-beijing.fcapp.run/admin_check?guest_id=${userInfo.value.id}`
    )
  }

  function init() {
    const guestInfoFromLocalStorage = localStorage.getItem('guestInfo')
    try {
      const gInfo = JSON.parse(guestInfoFromLocalStorage)
      if (verifyUserInfo(gInfo)) {
        return verify(gInfo.invite_code, gInfo.name)
      } else {
        return Promise.reject(new Error('invalid guest info'))
      }
    } catch (e) {
      localStorage.removeItem('guestInfo')
      return Promise.reject(e)
    }
  }
  /*
  function fresh() {
    api
      .get(
        `https://query-user-wedding-service-ffgpllgiuy.cn-beijing.fcapp.run/guest?guest_id=${userInfo.value.id}`
      )
      .then((res) => {
        userInfo.value = res.data.data
      })
  }
  */
  function login(gInfo) {
    userInfo.value = gInfo
    logined.value = true
    localStorage.setItem('guestInfo', JSON.stringify(gInfo))
  }
  function logout() {
    userInfo.value = {
      id: 0,
      name: '',
      invite_code: 0,
      seat_type: 0,
      checkin: false,
      checkin_time: '',
      checkin_index: 0
    }
    logined.value = false
    localStorage.removeItem('guestInfo')
  }
  function verify(invite_code, guest_name) {
    verifying.value = true
    return api
      .get(
        `https://query-user-wedding-service-ffgpllgiuy.cn-beijing.fcapp.run/verify?invite_code=${invite_code}&guest_name=${guest_name}`
      )
      .then((res) => {
        verifying.value = false
        return res
      })
      .catch((err) => {
        verifying.value = false
        return Promise.reject(err)
      })
  }
  function checkin(scenarioId) {
    const formData = new FormData()
    formData.append('scenarioId', scenarioId)
    formData.append('guestId', userInfo.value.id)
    return api.post(
      'https://query-user-wedding-service-ffgpllgiuy.cn-beijing.fcapp.run/checkin',
      formData
    )
  }
  function getSeatImage() {
    const imageName = `/seat_images/${userInfo.value.seat_type}.png`
    if (process.env.NODE_ENV === 'development') {
      return `https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/image?filename=${imageName}`
    } else {
      return imageName
    }
  }
  return {
    userInfo,
    logined,
    verifying,
    init,
    login,
    logout,
    verify,
    checkin,
    adminCheck,
    getSeatImage
  }
})
