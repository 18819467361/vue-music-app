<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content"  :data="discList">
      <div>
        <div class="slider-wrapper">
          <slider :slideData=recommends.slider @img-load="loadImage"></slider>
        </div>
        <div v-if='discList.length' class="recommend-list">
          <h1 class="list-title">热门MV推荐</h1>
          <ul class="mv-wrapper">
            <li v-for="(item, index) in discList" class="mv-list" :key="index">
              <div class="mv-content" >
                <img class="mv-img" v-lazy="item.picurl"/>
                <h3 class="mv-title">{{item.mvtitle}}</h3>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="!discList.length" class="loading-container">
        <loading title="正在载入..."></loading>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {fetchRecommend, fetchDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from '../../base/slider.vue'
import Scroll from '../../base/scroll/scroll.vue'
import Loading from '@/base/loading/loading'
export default {
  data () {
    return {
      recommends: [],
      discList: [],
      checkLoad: false
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
    _fetchRecommend () {
      fetchRecommend(this.setComponents)
    },
    _fetchDiscList () {
      fetchDiscList(this.setDiscList).then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.mvlist
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
        this.$refs.scroll.refresh()
        this.checkLoad = true
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    position: relative;
    height: 86vh;
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
  }
</style>
