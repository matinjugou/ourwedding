import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePhotoStore = defineStore('photo', () => {
  const photoList = reactive([])
  function freshPhotoList() {
    let apiRes = null
    if (photoList.values.length === 0) {
      apiRes = api.get('/photo/list?index=0')
    } else {
      apiRes = api.get(`/photo/list?index=${photoList.values[-1].index}`)
    }
    apiRes
      .then((res) => {
        if (res.data.code === 0) {
          for (const photo of res.data.data) {
            photoList.push(photo)
          }
          return true
        } else {
          return false
        }
      })
      .catch(() => {
        return false
      })
  }
  function uploadPhoto(photo) {
    const formData = new FormData()
    formData.append('photo', photo)
    return api.post('/photo/upload', formData)
  }
  return { photoList, freshPhotoList, uploadPhoto }
})
