<template>
  <div class="recommend">
    <scroll ref="scrollList" class="recommend-content"  :data="discList">
      <div>
        <div class="slider-wrapper">
          <slider :slideData=recommends.slider @img-load="loadImage"></slider>
        </div>
        <div v-if='discList.length' class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul class="mv-wrapper">
            <li @click="selectItem(item)" v-for="(item, index) in discList" class="mv-list" :key="index">
              <div class="mv-content" >
                <img class="mv-img" v-lazy="item.imgurl"/>
                <h3 class="mv-title">{{item.dissname}}</h3>
              </div>
            </li>
          </ul>
        </div>
        <div ref="fixHeight"></div>
        <div v-show="!discList.length" class="loading-container">
        <loading title="正在载入..."></loading>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {fetchRecommend, fetchDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from '../../base/slider/slider.vue'
import Scroll from '../../base/scroll/scroll.vue'
import Loading from '@/base/loading/loading'
import {playlistMixin} from '@/common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      recommends: [],
      discList: [],
      checkLoad: false,
      discSongs: [],
      item: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created () {
    this._fetchRecommend()
    setTimeout(() => {
      this._fetchDiscList()
    }, 1000)
  },
  methods: {
    handlePlaylist (playlist) {
      setTimeout(() => {
        const fixHeight = playlist.length > 0 ? 60 : ''
        this.$refs.fixHeight.style.height = `${fixHeight}px`
        this.$refs.scrollList.refresh()
      }, 50)
    },
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _fetchRecommend () {
      fetchRecommend(this.setComponents)
    },
    _fetchDiscList () {
      fetchDiscList(this.setDiscList).then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    setComponents (data) {
      if (data.code === ERR_OK) {
        this.recommends = data.data
      }
    },
    setDiscList (data) {
      if (data.code === ERR_OK) {
        this.discList = data.data
      }
    },
    loadImage () {
      if (!this.checkLoad) {
        this.$refs.scrollList.refresh()
        this.checkLoad = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style scoped>
  .recommend{
    position: relative;
    height: 86vh;
    box-sizing: border-box;
  }
.list-title{
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #000;
  background-color: transparent;
}

.mv-wrapper{
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
}
  .mv-list{
    width:49%;
    overflow: hidden;
    box-shadow: 1px 1px 6px #868686;
    margin-bottom: 4px;
  }
  .mv-img{
    width:100%;
  }
  .mv-title{
    font:14px/1.5 normal,"Microsoft YaHei UI",sans-serif;
  }
  .loading-container{
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
  }
</style>
