import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePhotoStore = defineStore('photo', () => {
  const photoList = reactive([])
  function freshPhotoList() {
    let apiRes = null
    if (photoList.values.length === 0) {
      apiRes = api.get('https://list-image-wedding-service-xugrxextbe.cn-hangzhou.fcapp.run/list')
    } else {
      const oldestTime = photoList.values[-1].time
      apiRes = api.get(
        `https://list-image-wedding-service-xugrxextbe.cn-hangzhou.fcapp.run/list?time=${oldestTime}`
      )
    }
    apiRes
      .then((res) => {
        for (const photoname of res.data.data) {
          photoList.push({
            filename: photoname,
            time: photoname.slice(0, 14),
            horizontal: photoname.slice(21, 22) === 'H'
          })
        }
      })
      .catch(() => {
        return false
      })
  }
  function uploadPhoto(photo) {
    const formData = new FormData()
    formData.append('photo', photo)
    return api.post(
      'https://upload-image-wedding-service-adrpqvhysj.cn-hangzhou.fcapp.run/upload',
      formData
    )
  }
  return { photoList, freshPhotoList, uploadPhoto }
})
