<template>
  <scroll :pullup="pullup"
          class="suggest"
          :data="result"
          :beforeScroll="beforeScroll"
          ref="suggest"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon" :class="getIconCls(item)" :style="bgStyle(item)">
          <i class="iconfont" v-html="getIcon(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <div class="loading-wrapper">
        <loading v-show="hasMore" title=""></loading>
      </div>
      <div v-show="!hasMore && !result.length" class="no-result-wrapper">
        <no-result :title="noResultText" v-show="result.length === 0"></no-result>
      </div>
      <div ref="fixedScroll"></div>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
import {search} from '@/api/search'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/api/song'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import {mapMutations, mapActions} from 'vuex'
import Singer from '@/common/js/singer.js'
import addUrl from '@/api/songUrl'
import NoResult from '@/base/no-result/no-result'
import {playlistMixin} from '@/common/js/mixin'
const TYPE_SINGER = 'singer'
const PERPAGE = 20
export default {
  mixins: [playlistMixin],
  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      noResultText: '找不到歌曲...',
      beforeScroll: true
    }
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '70px' : '10px'
      this.$refs.fixedScroll.style.height = bottom
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    bgStyle (item) {
      let url = `https://y.gtimg.cn/music/photo_new/T001R68x68M000${item.singermid}.jpg?max_age=2592000`
      if (item.type === TYPE_SINGER) {
        return `background-image:url(${url})`
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    search () {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._getResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, false, PERPAGE).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._getResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    _checkMore (data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
        this.hasMore = false
      }
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getIcon (item) {
      if (item.type === TYPE_SINGER) {
      } else {
        return '&#xe680;'
      }
    },
    _getResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSong(data.song.list))
      }
      addUrl(ret)
      return ret
    },
    _normalizeSong (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    listScroll () {
      this.$emit('listScroll')
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])

  },
  watch: {
    query () {
      this.search()
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>
<style scoped>
  .suggest{
    height:100%;
    overflow: hidden;
    width:100vw;
  }
    .suggest-list{
      padding:0 30px;
    }
      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
    .icon-music{
      flex: 0 0 30px;
      width:30px;
      font-size: 14px;
      color: #bc2f2e;
    }
    .icon-mine{
      margin-left: 10px;
      flex: 0 0 50px;
      width:50px;
      height:50px;
      background-size: contain;
    }
    .name{
      flex:1;
      font-size: 14px;
      color: #000;
      overflow: hidden;
    }
    .text{
      text-align: left;
      white-space: nowrap;
      padding-left: 10px;
    }
  .no-result-wrapper{
    position: absolute;
    width: 100vw;
    top:50%;
    left:0;
    /*transform：translateY(-50%)*/
  }
  .loading-wrapper{
    width: 100vw;
    margin-left: -30px;
  }
</style>
