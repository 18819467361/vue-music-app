<template>
  <transition name="slide">
    <music-list :songs="songList" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
import MusicList from '@/components/music-list/music-list'
import {mapGetters} from 'vuex'
import {fetchTopMusic} from '@/api/rank'
import { createSong } from '@/api/song'
import addUrl from '@/api/songUrl'

export default {
  data () {
    return {
      songList: []
    }
  },
  created () {
    this._fetchTopMusic(this.topList.id)
  },
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImage () {
      return this.songList ? this.songList[0].image : this.topList.picUrl
    },
    ...mapGetters([
      'topList',
      'currentSong'
    ])
  },
  components: {
    MusicList
  },
  methods: {
    _fetchTopMusic (id) {
      fetchTopMusic(id).then((res) => {
        if (res.code === 0) {
          this.songList = this._normalizeSongs(res.songlist)
        }
        addUrl(this.songList)
        console.log(res, 'top list')
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {data} = item
        if (data.strMediaMid && data.singer[0].mid) {
          ret.push(createSong(data))
        }
      })
      return ret
    }
  }
}
</script>
<style>
.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
