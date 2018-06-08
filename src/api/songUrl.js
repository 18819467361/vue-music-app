import fetch from './tool'
// 发送抓取vkey请求
function fetchSongVKey (item, callback) {
  let url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=872989112&loginUin=11297258&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=11297258&songmid=${item.mid}&filename=C400${item.mid}.m4a&guid=9136027940`
  let data = {
    format: 'jsonp'
  }
  fetch.fetchData3(url, data, callback, item)
}
// 抓取vkey成功回调
function setSongUrl (rep, item) {
  item.url = `http://dl.stream.qqmusic.qq.com/C100${item.mid}.m4a?vkey=${rep.data.items[0].vkey}&guid=7363997116&uin=0&fromtag=66`
}

// 循环 songlist增加url属性
export default function addUrl (songList) {
  songList.forEach((item) => {
    fetchSongVKey(item, setSongUrl)
  })
}
