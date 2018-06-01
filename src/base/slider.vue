<template>
  <div class="slider">
    <v-touch v-on:panleft="panLeft" v-on:panright="panRight">
      <div v-if="isLoad" class="slider-group">
        <a  class="slider-link" :href="slideData[nowIndex].linkUrl">
          <transition name="slide-trans">
            <img v-if="isShow" class="slider-img" :src="slideData[nowIndex].picUrl"/>
          </transition>
          <transition name="slide-trans-old">
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
      delay: false
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
    slideShow () {
      let len = this.slideData.length
      if (this.slideInterval === null) {
        return
      }
      this.slideInterval = setInterval(() => {
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
    pauseShow () {
      clearTimeout(this.slideInterval)
    },
    panLeft () {
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
        console.log('fallback')
        that.isShow = false
        setTimeout(() => {
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
    panRight () {
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
        console.log('onahead')
        that.isShow = false
        setTimeout(() => {
          let len = that.slideData.length
          if (that.nowIndex < len - 1) {
            that.nowIndex++
          } else {
            that.nowIndex = 0
          }
          that.isShow = true
        }, 10)
      }
    }
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
  height:140px;
}
.slider-img{
  width:100%;
  position: absolute;
}
  .dots-wrapper{
    position: absolute;
    bottom:10px;
    left:50%;
    display: flex;
    justify-content: center;
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
    background-color: #76b900;
  }
  .slide-trans-enter-active{
    transition: all .5s;
  }
  .slide-trans-enter{
    transform:translate(-100%)
  }
  .slide-trans-old-leave-active{
    transition: all .5s;
    transform: translateX(100%);
  }
</style>
