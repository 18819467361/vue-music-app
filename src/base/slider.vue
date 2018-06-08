<template>
  <div class="slider">
    <v-touch @click="test" v-on:panleft="panLeft" v-on:panright="panRight">
      <div v-if="isLoad" class="slider-group">
        <a  class="slider-link" :href="slideData[nowIndex].linkUrl">
          <img @load="loadImg" class="clearAbs" :src="slideData[0].picUrl"/>
          <transition :name="slideTrans">
            <img v-if="isShow" class="slider-img needsclick" :src="slideData[nowIndex].picUrl"/>
          </transition>
          <transition :name="slideTransOld">
            <img v-if="!isShow" class="slider-img" :src="slideData[nowIndex].picUrl"/>
          </transition>
        </a>
      </div>
      <div class="dots-wrapper">
        <div v-if="isLoad" class="dots">
          <span v-for="(item, index) in slideData" :key="index"  :class="['dotsKey',{active:index === nowIndex}]"></span>
        </div>
      </div>
    </v-touch>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      nowIndex: 0,
      interval: 3500,
      slideInterval: '',
      isLoad: false,
      isShow: true,
      delay: false,
      slideTrans: 'slide-trans-left',
      slideTransOld: 'slide-trans-left-old'
    }
  },
  props: {
    slideData: Array,
    default: []
  },
  computed: {

  },
  watch: {
    slideData () {
      if (this.slideData !== '') {
        this.isLoad = true
        this.slideShow()
      }
    }
  },
  mounted () {

  },
  methods: {
    // 自动轮播
    slideShow () {
      let len = this.slideData.length
      if (this.slideInterval === null) {
        return
      }
      this.slideInterval = setInterval(() => {
        this.slideTrans = 'slide-trans-left'
        this.slideTransOld = 'slide-trans-left-old'
        this.isShow = false
        setTimeout(() => {
          if (this.nowIndex < len - 1) {
            this.nowIndex++
          } else {
            this.nowIndex = 0
          }
          this.isShow = !this.isShow
        }, 10)
      }, this.interval)
    },
    // 停止轮播
    pauseShow () {
      clearInterval(this.slideInterval)
    },
    // 上一页
    panRight () {
      let that = this
      this.pauseShow()
      if (this.delay === true) {
        setTimeout(() => {
          this.delay = false
        }, 1000)
      } else {
        this.delay = true
        fallback()
      }
      this.slideShow()
      function fallback () {
        that.slideTransOld = 'slide-trans-right-old'
        that.isShow = false
        setTimeout(() => {
          that.slideTrans = 'slide-trans-right'
          let len = that.slideData.length
          if (that.nowIndex !== 0) {
            that.nowIndex--
          } else {
            that.nowIndex = len - 1
          }
          that.isShow = true
        }, 10)
      }
    },
    // 下一页
    panLeft () {
      let that = this
      this.pauseShow()
      if (this.delay === true) {
        setTimeout(() => {
          this.delay = false
        }, 1000)
      } else {
        this.delay = true
        ahead()
      }
      this.slideShow()
      function ahead () {
        that.slideTransOld = 'slide-trans-left-old'
        that.isShow = false
        setTimeout(() => {
          that.slideTrans = 'slide-trans-left'
          let len = that.slideData.length
          if (that.nowIndex < len - 1) {
            that.nowIndex++
          } else {
            that.nowIndex = 0
          }
          that.isShow = true
        }, 10)
      }
    },
    loadImg () {
      console.log('slideload')
      this.$emit('img-load')
    },
    test () {
      console.log('click')
    }
  },
  destroyed () {
    clearTimeout(this.slideInterval)
  }
}
</script>

<style scoped>
.slider{
  width:100%;
  position: relative;
  display: flex;
}

.slider-link{
  display: block;
  width:100%;
  white-space: nowrap;
}
.slider-img{
  width:100%;
  position: absolute;
  top:0;
  left:0;
}
  .dots-wrapper{
    position: absolute;
    bottom:10px;
    left:50%;
    display: flex;
    justify-content: center;
  }
  .clearAbs{
    display: block;
    position: relative;
    width:100%;
    visibility: hidden;
    z-index: -1;
  }
  .dots{
    transform:translate(-50%,0) ;
  }
  .dotsKey{
    margin: 0 8px ;
    width:5px;
    height:5px;
    border-radius: 5px;
    background-color: #fbfbfb;
    z-index: 1;
    display: inline-block;
  }
  .active{
    /*background-color: #76b900;*/
  }
  .slide-trans-right-enter-active{
    transition: all .5s;
  }
  .slide-trans-right-enter{
    transform:translate(-100%)
  }
  .slide-trans-right-old-leave-active{
    transition: all .5s;
    transform: translateX(100%);
  }
.slide-trans-left-enter-active{
  transition: all .5s;
}
.slide-trans-left-enter{
  transform:translate(100%)
}
.slide-trans-left-old-leave-active{
  transition: all .5s;
  transform: translateX(-100%);
}
</style>
