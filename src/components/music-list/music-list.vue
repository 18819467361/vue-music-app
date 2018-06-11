<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back iconfont" @click="returnDetail">&#xe636;</i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="filter" ref="filter"></div>
    </div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :rank="rank" :songs="songs" @select="selectItem"></song-list>
        <div ref="fixScroll"></div>
        <div ref="fixHeight"></div>
      </div>
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" @click="random">
          <i class="icon-play iconfont">&#xe680;</i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-if="!songs.length">
      <loading title="正在加载中..."></loading>
    </div>
  </div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import {prefixStyle} from '@/api/dom'
import Loading from '@/base/loading/loading'
import {mapActions} from 'vuex'
import {playlistMixin} from '@/common/js/mixin'
const transform = prefixStyle('transform')
// const backdrop = prefixStyle('backdrop-filter')
export default {
  mixins: [playlistMixin],
  data () {
    return {
      scrollY: 0
    }
  },
  props: {
    rank: {
      type: Boolean,
      defalut: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      defalut: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  components: {
    Scroll,
    SongList,
    Loading
  },
  mounted () {
    this.imgHeight = this.$refs.bgImg.clientHeight
    let padTop = this.imgHeight - 45
    let fixBot = padTop + this.imgHeight
    this.$refs.list.$el.style.paddingTop = `${padTop}px`
    this.$refs.list.$el.style.top = `45px`
    this.$refs.fixScroll.style.height = `${fixBot}px`
  },
  methods: {
    handlePlaylist (playlist) {
      const fixHeight = playlist.length > 0 ? 60 : ''
      this.$refs.fixHeight.style.height = `${fixHeight}px`
      this.$refs.list.refresh()
    },
    returnDetail () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
    },
    random () {
      console.log('random')
      this.randomPlay({
        list: this.songs
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  watch: {
    scrollY (newY) {
      this.imgHeight = this.$refs.bgImg.clientHeight
      let scale = 1
      // let blur = 0
      if (newY > 0) {
        scale = 1 + newY / this.imgHeight
      } else {
        scale = 1
        // let blur = Math.min(20 * newY / this.imgHeight, 20)
      }
      // this.$refs.filter.style[backdrop] = `blur({$blur}px)`
      this.$refs.bgImg.style[transform] = `scale(${scale})`
    }
  }
}
</script>
<style scoped>
  .music-list{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ffffff;
  }
  .back{
    position: absolute;
    padding:0 5px;
    top:2vh;
    left:4vw;
    z-index: 1;
  }
  .icon-back{
    font-size:25px;
    color: #d83e00;
  }
  .title{
    color: #ebebeb;
    position: absolute;
    margin-top: 2vh;
    width: 100vw;
    font:normal 20px/20px "Microsoft YaHei UI",sans-serif;
    pointer-events: none;
    text-shadow: 1px 1px 2px #2e2e2e;
    z-index: 1;
  }
.bg-image{
  width:100vw;
  padding-top: 70%;
  position: relative;
  top: 0;
  left:0;
  background-size: cover;
  /*pointer-events: none;*/
  transform-origin: top;
}
  .play-wrapper{
    position: absolute;
    top: 160px;
    bottom: 4vh;
    left:50%;
    width:150px;
    height:25px;
    font:normal 20px/25px "Microsoft YaHei UI",sans-serif;
    margin-left: -75px;
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid #bc2f2e;
    color: #c7c7c7;
    /*text-shadow: 1px 1px 1px #bdbdbd;*/
    z-index: -1;
  }
  .play{
    background-color: rgba(195, 195, 195, 0.37);
  }
  .icon-play{
    color: #bc2f2e;
    font-size:20px;
    font-weight: bold;
  }
  .text{
    color: #dd0500;
  }
  .filter{
    width:100%;
    height:100%;
    background-color: rgba(169, 217, 255, 0.14);
  }
  .scroll-wrapper{
    overflow: visible;
  }
  .list{
    position: fixed;
    top: 0;
    left: 0;
    z-index:20;
  }
  .song-list-wrapper{
    background-color: #ffffff;
  }
  .loading-container{
    position: absolute;
    top:38vh;
    left:0;
    width: 100vw;
    height: 62vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    pointer-events: none;
  }

</style>
