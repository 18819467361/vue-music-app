export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${musicData.singer[0].mid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.strMediaMid}.m4a?guid=7363997116&vkey=AC38A9854CBF72F85928ACEAD6B784153788DD87A865DA26F20ACCE37AF4484B9D76449830D0DED23BF2E5F3006AA9812643B614B62516C9&uin=268&fromtag=38`

  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
