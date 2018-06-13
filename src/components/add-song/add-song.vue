<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click.stop="hide">
          <i class="icon-close iconfont">&#xe61b;</i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll ref="songList" class="list-scroll" v-if="currentIndex===0" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
          <scroll ref="searchList" :refreshDelay="refreshDelay" class="list-scroll" v-if="currentIndex === 1" :data="searchHistory">
            <div class="list-inner">
              <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :showSinger="showSinger" :query="query" @select="selectSuggest" @listScroll="blurInput"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok iconfont">&#xe632;</i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import SearchBox from '@/base/search-box/search-box'
import Suggest from '@/components/suggest/suggest'
import {searchMixin} from '@/common/js/mixin'
import Switches from '@/base/switches/switches'
import Scroll from '@/base/scroll/scroll'
import {mapGetters, mapActions} from 'vuex'
import SongList from '@/base/song-list/song-list'
import Song from '@/api/song'
import SearchList from '@/base/search-list/search-list'
import TopTip from '@/base/top-tip/top-tip'
export default {
  mixins: [searchMixin],
  data () {
    return {
      showFlag: false,
      showSinger: false,
      currentIndex: 0,
      switches: [
        {name: '最近播放'},
        {name: '搜索历史'}
      ],
    }
  },
  computed: {
    ...mapGetters(
      ['playHistory']
    )
  },
  methods: {
    showTip () {
      this.$refs.topTip.show()
    },
    selectSong (song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))
      }
      this.showTip()
    },
    switchItem (index) {
      this.currentIndex = index
    },
    selectSuggest () {
      this.saveSearch()
    },
    show () {
      this.showFlag = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    ...mapActions(
      ['insertSong']
    )
  },
  components: {
    SearchBox,
    Suggest,
    Switches,
    Scroll,
    SongList,
    SearchList,
    TopTip
  }
}
</script>
<style scoped>
.add-song{
  position: fixed;
  top:0;
  bottom: 0;
  width:100%;
  z-index: 200;
  background-color: #e7e7e7;
}
.slide-enter-active, .slide-leave-active {
  transition:all .3s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0)
}
.header{
  position: relative;
  height: 44px;
  text-align: center;
}
  .title{
    line-height: 44px;
    font-size: 20px;
    color: #484848;
  }
  .close{
    position: absolute;
    top:0;
    right:8px;
  }
  .icon-close{
    display: block;
    padding:12px;
    font-size: 20px;
    color: #bc2f2e;
  }
.search-box-wrapper{
  margin:20px;
}
.shortcut{
}
.search-result{
  position: fixed;
  top:124px;
  bottom:0;
  width:100%;
}
  .tip-title{
    text-align: center;
    padding:18px 0;
    font-size: 0;
  }
  .list-wrapper{
    position: absolute;
    top: 24vh;
    height: 76vh;
    width:90%;
    margin:0 auto;
  }
  .icon-ok{
    color: #ffffff;
    padding-right: 15px;
  }
  .tip-title .text{
    color: #ffffff;
    font-size: 14px;
  }

</style>
