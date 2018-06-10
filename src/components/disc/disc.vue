<template>
  <transition name="slide">
      <music-list :songs="songList" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '@/components/music-list/music-list'
import { mapGetters } from 'vuex'
import {fetchDiscSong} from '@/api/recommendSong'
import addUrl from '@/api/songUrl'
import {createRecommendSong} from '@/api/song'
export default {
  data () {
    return {
      songList: []
    }
  },
  mounted () {

  },
  created () {
    this._fetchDiscSong()
  },
  computed: {
    title () {
      return this.disc.dissname
    },
    bgImage () {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  components: {
    MusicList
  },
  methods: {
    _fetchDiscSong () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      fetchDiscSong(this.disc.dissid).then((res) => {
        this.songList = this._normalizeSongs(res.cdlist[0].songlist)
        addUrl(this.songList) // 设置url
      })
    },
    _normalizeSongs (songList) {
      let ret = []
      songList.forEach((item) => {
        if (item.mid) {
          ret.push(createRecommendSong(item))
        }
      })
      return ret
    }
  }
}
</script>
<style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

</style>
