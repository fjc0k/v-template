import axios from 'axios'
import qs from 'qs'

const api = axios.create({
  baseURL: 'http://ydxy.huichifangqiu.com:8080/mobile/',
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

const fetch = (path, data) => {
  return new Promise((resolve, reject) => {
    return api({
      method: 'POST',
      data: qs.stringify(data),
      url: path
    }).then(
      ({ status, data }) => {
        if (status === 200 && data) {
          switch (data.code) {
            case -101:
              location.href = data.code_url
              break
            case 0:
              resolve(data.data)
              break
            default:
              reject(data)
              break
          }
        } else {
          reject(data)
        }
      },
      reject
    )
  })
}

// 省市区数据 todo
export function fetchDivisionData() {
  return fetch('')
}

// 考号列表
export function fetchPhoneCardNumberList(payload) {
  return fetch('cardType/getCardByArea', payload)
}

// 卡详情
export function fetchPhoneCardDetail(payload) {
  return Promise
    .all([
      fetch('cardType', payload),
      fetch('cardType/getImgs', payload)
    ])
    .then(([content, images]) => ({
      content,
      images
    }))
}

// 卡预定
export function reservePhoneCard(payload) {
  return fetch('appointment/card', payload)
}

// 套餐列表
export function fetchComboList() {
  return fetch('postage')
}

// 棉被列表
export function fetchQuiltList() {
  return fetch('quilt')
}

// 棉被预定
export function reserveQuilt(payload) {
  return fetch('appointment/quilt', payload)
}

// 宽带列表
export function fetchBroadbandList() {
  return fetch('broadBand')
}

// 宽带详情
export function fetchBroadbandDetail(payload) {
  return fetch('broadBand/detail', payload)
}

// 宽带预定
export function reserveBroadband(payload) {
  return fetch('appointment/broadBand', payload)
}

// 预定状态
export function fetchReserveStatus(payload) {
  return fetch('appointment/status', payload)
}

// 获取个人信息 todo
export function fetchProfile() {
  return fetch('http://2uq1829622.iok.la/userInfo')
}

// 修改个人信息
export function updateProfile(payload) {
  return fetch('user/upUserInfo', payload)
}
