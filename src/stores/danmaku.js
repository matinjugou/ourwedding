import { defineStore } from 'pinia'
import api from '@/services/api'

export const useDanmakuStore = defineStore('danmaku', () => {
  const fetchDanmakuList = (startId = 0, count = 20, legal = 'all', authorId = null) => {
    return api.get('https://bulletin-board-wedding-service-pbffkjgajx.cn-beijing.fcapp.run/list', {
      params: {
        start_id: startId,
        count,
        legal,
        author_id: authorId
      }
    })
  }

  const getNewestDanmakuList = () => {
    const res = new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          content: '这是一条弹幕',
          author_id: 1,
          author_name: '张三',
          legal: '1',
          create_time: '2021-01-01 00:00:00'
        },
        {
          id: 2,
          content: '这是一条弹幕',
          author_id: 1,
          author_name: '张三',
          legal: '1',
          create_time: '2021-01-01 00:00:00'
        }
      ])
    })
    return res
  }

  const createDanmaku = (content, authorId) => {
    const formData = new FormData()
    formData.append('author_id', authorId)
    formData.append('content', content)
    return api.post(
      'https://bulletin-board-wedding-service-pbffkjgajx.cn-beijing.fcapp.run/create',
      formData
    )
  }

  const reviewDanmaku = (id, legal) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('legal', legal)
    return api.post(
      'https://bulletin-board-wedding-service-pbffkjgajx.cn-beijing.fcapp.run/review',
      formData
    )
  }

  return {
    fetchDanmakuList,
    createDanmaku,
    reviewDanmaku,
    getNewestDanmakuList
  }
})
