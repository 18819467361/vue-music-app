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
//        //https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?
// picmid=1
// &rnd=0.7587579602587418&
// g_tk=5381&
// jsonpCallback=getPlaylist&
// loginUin=0&hostUin=0&
// format=jsonp&
// inCharset=utf8&
// outCharset=utf-8&
// notice=0&
// platform=yqq&
// needNewCode=0&
// categoryId=10000000&
// sortId=5&
// sin=0&
// ein=29

export function fetchDiscList (callback) {
  const url = '/api/fetchDiscList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    lan: 'all',
    format: 'json',
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve((res.data))
  })
}
