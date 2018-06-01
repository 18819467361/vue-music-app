import fetch from './tool'
import {commonParams} from './config'

export function fetchRecommend (callback) {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return fetch.fetchData(url, data, callback)
}
