<template>
  <transition name="slide">
   <music-list :songs="songList" :title="title" :bg-image="bgImage"></music-list>
  </transition>

</template>
<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {fetchSingerDetail} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import { createSong } from '@/api/song'
import MusicList from '@/components/music-list/music-list'
export default {
  data () {
    return {
      songList: []
    }
  },
  computed: {
    title () {
      return this.singer.singer_name
    },
    bgImage () {
      return this.singer.singer_pic
    },
    ...mapGetters([
      'singer'
    ])
  },
  components: {
    MusicList
  },
  created () {
    console.log(this.singer, 'singer')
    this._fetchSingerDetail(this.singer['singer_mid'], this.getDetailData)
  },
  methods: {
    _fetchSingerDetail (singerID, callback) {
      if (!this.singer['singer_mid']) {
        this.$router.push('/singer')
        return
      }
      fetchSingerDetail(singerID, callback)
    },
    getDetailData (res) {
      if (res.code === ERR_OK) {
        this.songList = this._normalizeSongs(res.data.list)
        console.log(this.songList, 'songlist')
      }
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        // console.log(musicData, 'musicdata')
        if (musicData.strMediaMid && musicData.singer[0].mid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }

}
</script>
<style scoped>
  div{
    width:100vw;
    height:100vh;
    position: fixed;
    top:0;
    left:0;
    background-color: #ffffff;
    z-index: 100;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all .3s
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0);
  }
</style>
