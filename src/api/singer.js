import fetch from './tool'
// import { commonParams } from './config'

export function fetchSingerList (callback) {
  // callback设置jsonp函数名
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A10000%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D'
  // const data = Object.assign({}, commonParams, {
  //   format: 'jsonp',
  //   platform: 'yqq',
  //   needNewCode: 0,
  //   data: {
  //     'comm': {'ct': 24, 'cv': 10000},
  //     'singerList': {
  //       'module': 'Music.SingerListServer',
  //       'method': 'get_singer_list',
  //       'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1}
  //     }
  //   }
  // })
  const data = {}
  return fetch.fetchData2(url, data, callback)
}