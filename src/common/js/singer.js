export default class Singer {
  constructor ({id, name}) {
    this.singer_mid = id
    this.singer_name = name
    this.singer_pic = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
