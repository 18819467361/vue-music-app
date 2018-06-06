import fetch from './tool'
import { commonParams } from './config'

export function fetchSingerList (area, idObj, index, callback) {
  // callback设置jsonp函数名
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    data: encodeURIComponent(`{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":${area},"sex":-100,"genre":-100,"index":${idObj.id},"sin":0,"cur_page":1}}}`)
  })
  return fetch.fetchData2(url, data, idObj.name, index, callback)
}
export function fetchSingerDetail (singerId, callback) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1215922553,
    loginUin: '251961612',
    inCharset: 'utf8',
    hostUin: '0',
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: '0',
    singermid: singerId,
    order: 'listen',
    begin: '0',
    num: '30',
    songstatus: 1
  })
  return fetch.fetchData1(url, data, callback)
}
