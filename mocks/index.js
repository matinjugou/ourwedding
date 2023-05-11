function validateScenarioId(scenarioId) {
  if (!scenarioId) {
    return false
  }
  // check if scenarioId starts with 's'
  if (scenarioId[0] !== 's') {
    return false
  }
  // check if scenarioId's length is 6
  if (scenarioId.length !== 6) {
    return false
  }
}

function delayReturn(timeout, resData) {
  return async (_, res) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined)
      }, timeout)
    })
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(resData))
  }
}

const moduleState = {
  chatroom: {
    enable: true,
    until: '2021-08-01 12:00:00'
  }
}

export default [
  {
    url: '/api/guest/verify',
    type: 'get',
    response: (req) => {
      console.log(req.query.username)
      if (req.query.uniqueId === '123456' && req.query.username === '黄超') {
        return {
          code: 0,
          data: {
            name: '黄超',
            avatar: 'https://avatars.githubusercontent.com/u/20502762?v=4',
            uniqueId: '123456',
            wxId: 'wx123456',
            seatImg: 'https://avatars.githubusercontent.com/u/20502762?v=4'
          },
          msg: ''
        }
      } else {
        return {
          code: -1,
          data: {},
          msg: '验证失败'
        }
      }
    }
  },
  {
    url: '/api/guest/checkedin',
    type: 'get',
    rawResponse: delayReturn(2000, {
      code: -1,
      data: {
        status: false,
        time: '2021-08-01 12:00:00',
        index: 1
      },
      msg: ''
    })
  },
  {
    url: '/api/guest/checkin',
    type: 'post',
    rawResponse: async (req, res) => {
      let reqBody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqBody += chunk
        })
        req.on('end', () => {
          setTimeout(() => {
            resolve(undefined)
          }, 2000)
        })
      })
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      if (!validateScenarioId(JSON.parse(reqBody).scenarioId)) {
        res.end(
          JSON.stringify({
            code: -1,
            data: {},
            msg: '这不是一个有效的场景码，请重新扫描'
          })
        )
        return
      }
      res.end(
        JSON.stringify({
          code: 0,
          data: {
            status: true,
            time: '2021-08-01 12:00:00',
            index: 1
          },
          msg: ''
        })
      )
    }
  },
  {
    url: '/api/chatroom/qrcode',
    type: 'get',
    rawResponse: delayReturn(2000, {
      code: 0,
      data: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      msg: ''
    })
  },
  {
    url: '/api/module/state',
    type: 'get',
    response: (req) => {
      return {
        code: 0,
        data: req.query.moduleName ? moduleState[req.query.moduleName] : {},
        msg: ''
      }
    }
  },
  {
    url: '/api/photo/list',
    type: 'get',
    response: (req) => {
      return {
        data: ['202305111647374SLPF5_H.jpeg', '20230511164654LSAL7X_V.jpeg'],
        status: 'success'
      }
    }
  },
  {
    url: '/api/photo/upload',
    type: 'post',
    response: (req) => {
      return {
        code: 0,
        data: {
          id: '1'
        },
        msg: ''
      }
    }
  }
]
