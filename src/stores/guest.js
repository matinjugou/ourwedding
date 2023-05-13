import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useGuestInfoStore = defineStore('guestInfo', () => {
  const logined = ref(false)
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
  function init() {
    const guestInfoFromLocalStorage = localStorage.getItem('guestInfo')
    try {
      const gInfo = JSON.parse(guestInfoFromLocalStorage)
      if (verifyUserInfo(gInfo)) {
        userInfo.value = gInfo
      }
      fresh()
      logined.value = true
    } catch (e) {
      localStorage.removeItem('guestInfo')
      return
    }
  }
  function fresh() {
    api
      .get(
        `https://query-user-wedding-service-ffgpllgiuy.cn-beijing.fcapp.run/guest?guest_id=${userInfo.value.id}`
      )
      .then((res) => {
        userInfo.value = res.data.data
      })
  }
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
    return api.get(
      `https://query-user-wedding-service-ffgpllgiuy.cn-beijing.fcapp.run/verify?invite_code=${invite_code}&guest_name=${guest_name}`
    )
  }
  function checkin(scenarioId) {
    const formData = new FormData()
    formData.append('scenarioId', scenarioId)
    formData.append('guestId', userInfo.value.id)
    console.log(formData)
    return api.post(
      'https://query-user-wedding-service-ffgpllgiuy.cn-beijing.fcapp.run/checkin',
      formData
    )
  }
  function getSeatImage() {
    return 'https://avatars.githubusercontent.com/u/20502762?v=4'
  }
  return {
    userInfo,
    logined,
    init,
    login,
    logout,
    verify,
    checkin,
    getSeatImage
  }
})
