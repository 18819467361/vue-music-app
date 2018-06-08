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
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: 'none'
    // y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000
    // 图片：y.gtimg.cn/music/photo_new/T002R300x300M000000dcZ9I1nzO62.jpg?max_age=2592000
    // y.gtimg.cn/music/photo_new/T002R300x300M000000JOrf02Iy29a.jpg?max_age=2592000
    // 歌曲链接：url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey={this.vKey}&guid=7363997116&uin=0&fromtag=66`
    // 表白气球http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a?vkey=1ECEBCEE95B850C395D2C337B39A6125B502A2A45C6BBAF3E0883ABFB24BC3B468411056D30AFE6CDF5FC6F96352E555598E58B2731BA507&guid=7363997116&uin=0&fromtag=66
    // 青花瓷  http://dl.stream.qqmusic.qq.com/C400002qU5aY3Qu24y.m4a?vkey=556CF4801DBBAE62606685480043BC905D617C7B0385E8C480A545FBC6525F9D12F9B317E878D12AC34C500E118406FADFEFF0BFD9B8BA66&guid=7363997116&uin=0&fromtag=66
    // http://dl.stream.qqmusic.qq.com/C4000031TAKo0095np.m4a?vkey=CED2907684413E42C520D2F0BD746610D9A8BD992F64A35396BF92A8C58AC6A2CFD62F0F4699303471FA4185FABC581881EF5D83553A493B&guid=7363997116&uin=0&fromtag=66
    // http://ws.stream.qqmusic.qq.com/101369814.m4a?fromtag=46
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
