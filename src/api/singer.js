import fetch from './tool'
import { commonParams } from './config'

export function fetchSingerList (area, index, callback) {
  // callback设置jsonp函数名
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    data: encodeURIComponent(`{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":${area},"sex":-100,"genre":-100,"index":${index},"sin":0,"cur_page":1}}}`)
  })
  return fetch.fetchData2(url, data, callback)
}
