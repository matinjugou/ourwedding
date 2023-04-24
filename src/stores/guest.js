import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useGuestInfoStore = defineStore('guestInfo', () => {
  const name = ref('')
  const uniqueId = ref('')
  const wxId = ref('')
  const avatar = ref('')
  const logined = ref(false)
  const checkedin = ref(false)
  const seatImg = ref('')
  function init() {
    const guestInfoFromLocalStorage = localStorage.getItem('guestInfo')
    if (guestInfoFromLocalStorage) {
      login(JSON.parse(guestInfoFromLocalStorage))
    }
  }
  function login(gInfo) {
    name.value = gInfo.name
    avatar.value = gInfo.avatar
    uniqueId.value = gInfo.uniqueId
    wxId.value = gInfo.wxId
    seatImg.value = gInfo.seatImg
    logined.value = true

    localStorage.setItem('guestInfo', JSON.stringify(gInfo))
  }
  function logout() {
    name.value = ''
    avatar.value = ''
    uniqueId.value = ''
    wxId.value = ''
    seatImg.value = ''
    logined.value = false
    checkedin.value = false

    localStorage.removeItem('guestInfo')
  }
  function verify(uniqueId, username) {
    return api.get(`/guest/verify?uniqueId=${uniqueId}&username=${username}`)
  }
  function getCheckedInStatus() {
    return api.get('/guest/checkedin?uniqueId=' + uniqueId.value)
  }
  function checkin(scenarioId) {
    return api.post('/guest/checkin', { scenarioId: scenarioId, uniqueId: uniqueId.value })
  }

  return {
    name,
    uniqueId,
    wxId,
    logined,
    avatar,
    checkedin,
    seatImg,
    init,
    login,
    logout,
    verify,
    getCheckedInStatus,
    checkin
  }
})
