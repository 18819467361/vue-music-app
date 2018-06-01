<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slider :slideData=recommends.slider></slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {fetchRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from '../../base/slider.vue'
export default {
  data () {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  created () {
    this._fetchRecommend()
  },
  methods: {
    _fetchRecommend () {
      fetchRecommend(this.setComponents)
    },
    setComponents (data) {
      if (data.code === ERR_OK) {
        this.recommends = data.data
      }
      console.log(this.recommends, 'component')
    }
  }
}
</script>

<style scoped>
.list-title{
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
</style>
