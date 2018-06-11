<template>
  <scroll :pullup="pullup"
          class="suggest"
          :data="result"
          ref="suggest"
          @scrollToEnd="searchMore">
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
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
import {search} from '@/api/search'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/api/song'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import Singer from '@/api/singer'
import {mapMutations} from 'vuex'
const TYPE_SINGER = 'singer'
const PERPAGE = 20
export default {
  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    }
  },
  methods: {
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({ ////有问题
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      }
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
      console.log(ret, '处理后的数据')
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
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })

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
    Loading
  }
}
</script>
<style scoped>
  .suggest{
    height:100%;
    overflow: hidden;
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
    width:100%;
    top:50%;
    /*transform：translateY(-50%)*/
  }
  .loading-wrapper{
    width: 100vw;
    margin-left: -30px;
  }
</style>
