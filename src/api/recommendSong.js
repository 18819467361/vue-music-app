import {commonParams} from './config'
import axios from 'axios'

export function fetchDiscSong (dissId) {
  const url = '/api/fetchDiscSong'
  const data = Object.assign({}, commonParams, {
    // https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
    uin: '0',
    new_format: '1',
    pic: '500',
    disstid: dissId,
    type: '1',
    json: '1',
    utf8: '1',
    onlysong: '0',
    picmid: '1',
    nosign: '1',
    song_begin: '0',
    song_num: '50',
    _: '1528624370404'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve((res.data))
  })
}
