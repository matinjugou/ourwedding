import { defineStore } from 'pinia'
import api from '@/services/api'

export const useChatroomStore = defineStore('chatroom', () => {
  function getChatroomQrcode() {
    return api.get('/chatroom/qrcode')
  }
  return { getChatroomQrcode }
})
