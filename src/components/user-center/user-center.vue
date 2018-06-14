<template>
<transition name="slide">
  <div class="user-center">
    <div class="back">
      <i class="icon-back iconfont" @click="back">&#xe636;</i>
    </div>
    <div class="switches-wrapper">
      <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
    </div>
    <div ref="playBtn" class="play-btn" @click="random">
      <i class="icon-play iconfont">&#xe641;</i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper" ref="listWrapper">
      <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
        <div class="list-inner">
          <song-list :songs="favoriteList" @select="selectSong"></song-list>
          <div ref="fixScroll"></div>
        </div>
      </scroll>
      <scroll ref="playList" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
        <div class="list-inner">
          <song-list :songs="playHistory" @select="selectSong"></song-list>
          <div ref="fixScroll"></div>
        </div>
      </scroll>
    </div>
    <no-result v-show="noResult()" :title="noResultDesc()"></no-result>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
import Switches from '@/base/switches/switches'
import {mapGetters, mapActions} from 'vuex'
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import Song from '@/api/song'
import {playlistMixin} from '@/common/js/mixin'
import NoResult from '@/base/no-result/no-result'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      currentIndex: 0,
      switches: [
        {name: '我喜欢的'},
        {name: '最近添加'}

      ]
    }
  },
  methods: {
    noResult () {
      if (this.currentIndex === 0) {
        return !this.favoriteList
      } else {
        return !this.playHistory
      }
    },
    noResultDesc () {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '暂无听过歌曲'
      }
    },
    handlePlaylist (playlist) {
      const height = playlist.length > 0 ? '60px' : '0'
      this.$refs.fixScroll.style.height = height
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },
    random () {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (list.length === 0) {
        return
      }
      list = list.map((song) => {
        return new Song(song)
      })
      this.randomPlay({list})
    },
    selectSong (song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))
      }
    },
    switchItem (index) {
      this.currentIndex = index
    },
    back () {
      this.$router.back()
    },
    ...mapActions([
      'insertSong',
      'randomPlay'
    ])
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  },
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult
  }
}
</script>
<style scoped>
  .user-center {
    width:100vw;
    height:100vh;
    position: fixed;
    left:0;
    top: 0;
    background-color: #f2f2f2;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all .3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .back{
    position: absolute;
    top: 0;
    left:6px;
    z-index: 50;
  }
  .icon-back{
    display: block;
    padding:10px;
    font-size: 22px;
    color: #bc2f2e;
  }
  .switches-wrapper{
    margin:10px 0 30px 0;
  }
  .play-btn{
    box-sizing:border-box;
    width:135px;
    padding:7px 0;
    margin: 0 auto;
    text-align: center;
    border:1px solid #c3c3c3;
    color: #323232;
    border-radius: 100px;
    font-size: 0;
  }
  .icon-play{
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: 16px;
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
  }
  .list-wrapper{
    position: absolute;
    top:110px;
    bottom:0;
    width:100%;
  }
  .list-scroll{
    height:100%;
    overflow: hidden;
    width:100%;
  }
  .list-inner{
    padding:20px 0;
  }
  .no-result-wrapper{
    position: absolute;
    width:100%;
    top:50%;
    transform: translateY(-50%)
  }
</style>
