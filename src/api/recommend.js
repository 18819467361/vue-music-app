import fetch from './tool'
import {commonParams} from './config'
import axios from 'axios'

export function fetchRecommend (callback) {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp'
  })
  return fetch.fetchData1(url, data, callback)
}

export function fetchDiscList (callback) {
  const url = '/api/fetchDiscList'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cmd: 'shoubo',
    lan: 'all',
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve((res.data))
  })
}
