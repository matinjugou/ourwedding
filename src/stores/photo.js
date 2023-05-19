import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePhotoStore = defineStore('photo', () => {
  const photoList = ref([])
  let lock = false
  function convertResToPhotoList(res) {
    const resPhotoList = []
    for (const photoname of res.data.data) {
      resPhotoList.push({
        filename: photoname,
        time: photoname.slice(14, 28),
        horizontal: photoname.slice(35, 36) === 'H'
      })
    }
    return resPhotoList
  }
  function getNewestPhoto(done) {
    if (lock) {
      return
    } else {
      lock = true
    }
    const newestTime = photoList.value.length > 0 ? photoList.value[0].time : ''
    api
      .get(
        `https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/list_guest_images?time=${newestTime}`
      )
      .then((res) => {
        const tmpPhotoList = convertResToPhotoList(res).reverse()
        for (const photo of tmpPhotoList) {
          photoList.value.unshift(photo)
        }
        lock = false
        if (done) {
          done()
        }
      })
  }
  function getOlderPhoto(done) {
    if (lock) {
      return
    } else {
      lock = true
    }
    const oldestTime = photoList.value.length > 0 ? photoList.value.slice(-1)[0].time : ''
    api
      .get(
        `https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/list_guest_images?time=${oldestTime}`
      )
      .then((res) => {
        const tmpPhotoList = convertResToPhotoList(res)
        for (const photo of tmpPhotoList) {
          photoList.value.push(photo)
        }
        lock = false
        if (done) {
          done()
        }
      })
  }
  function freshPhotoList() {
    photoList.value = []
    getNewestPhoto()
  }
  function uploadPhoto(photo) {
    const formData = new FormData()
    formData.append('photo', photo)
    formData.append('prefix', '/unreviewed_guest_images')
    return api.post(
      'https://upload-image-wedding-service-adrpqvhysj.cn-beijing.fcapp.run/upload',
      formData
    )
  }
  function getUnreviewedPhotoList() {
    return api.get(
      'https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/list_unreviewed_guest_images'
    )
  }
  function reviewPhoto(filename, legal) {
    const formData = new FormData()
    formData.append('filename', filename)
    formData.append('legal', legal)
    return api.post(
      'https://fetch-image-wedding-service-lbsvieakmw.cn-beijing.fcapp.run/review_guest_image',
      formData
    )
  }
  return {
    photoList,
    freshPhotoList,
    uploadPhoto,
    getNewestPhoto,
    getOlderPhoto,
    getUnreviewedPhotoList,
    reviewPhoto
  }
})
