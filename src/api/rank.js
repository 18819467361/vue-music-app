import fetch from './tool'
import {commonParams} from './config'

export function fetchTopList () {
  // https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    g_tk: '5381',
    needNewCode: '1',
    notice: 0,
    format: 'jsonp',
    uin: 0,
    _: '1528643432945'
  })
  return fetch.fetchData4(url, data)
}

export function fetchTopMusic (listId) {

  const url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg`
  const data = Object.assign({}, commonParams, {
    tpl: 3,
    page: 'detail',
    topid: listId,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'h5',
    needNewCode: 1,
    _: 1528608215304
  })
  return fetch.fetchData4(url, data)
}

