<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @leave="leave"
                  @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image"/>
        </div>
        <div class="top top-animation">
          <div class="back" @click="back">
            <i class="icon-back iconfont">&#xe640;</i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle mid-animation">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom bot-animation">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div  class="progress-bar-wrapper">
              <progress-bar :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence iconfont">&#xe630;</i>
            </div>
            <div  @click="preSong" class="icon i-left" :class="disable">
              <i class="icon-prev iconfont">&#xe62e;</i>
            </div>
            <div class="icon i-center" :class="disable">
              <i @click="togglePlay" class="icon-play iconfont" v-html="palyIcon"></i>
            </div>
            <div  @click="nextSong" class="icon i-right" :class="disable">
              <i class="icon-next iconfont">&#xe62c;</i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite iconfont">&#xe60c;</i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" class="small-img" width="40" height="40" :src="currentSong.image"/>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlay" class="icon-playlist iconfont" v-html="miniIcon"></i>
        </div>
        <div class="contorl">
          <i class="icon-playlist iconfont">&#xe6a9;</i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import {prefixStyle} from '../../api/dom'
import ProgressBar from '@/base/progress-bar/progress-bar'
const transform = prefixStyle('transform')
export default {
  data () {
    return {
      songReady: false,
      currentTime: 0
    }
  },
  computed: {
    palyIcon () {
      return this.playing ? '&#xe60b;' : '&#xe817;'
    },
    miniIcon () {
      return this.playing ? '&#xe60b;' : '&#xe817;'
    },
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    disable () {
      return this.songReady ? '' : 'disable'
    },
    percent () {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  watch: {
    currentSong (newSong) {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    // watch playing的变化，控制audio元素的play和pause
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    enter (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`// 相对于元素的当前位置，动画起点位置
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(0,0,0) scale(1)`
        },
        100: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`// 相对于元素的当前位置，动画结束位置
        }
      }
      animations.registerAnimation({
        name: 'move2',
        animation,
        presets: {
          duration: 300,
          easing: 'ease-out'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move2', done)
    },
    afterLeave () {
      console.log('in after leave')
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    _getPosAndScale () {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    // 设置暂停、播放的state=>playing
    togglePlay () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    preSong () {
      if (!this.songReady) {
        return
      }
      if (this.currentIndex > 0) {
        this.setCurrentIndex(this.currentIndex - 1)
      } else {
        this.setCurrentIndex(this.playlist.length - 1)
      }
      if (!this.playing) {
        this.setPlayingState(!this.playing)
      }
      this.songReady = false
    },
    nextSong () {
      if (!this.songReady) {
        return
      }
      if (this.currentIndex < this.playlist.length - 1) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else {
        this.setCurrentIndex(0)
      }
      if (!this.playing) {
        this.setPlayingState(!this.playing)
      }
      this.songReady = false
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    format (interval) {
      interval = interval | 0 // 整数向下取整 相当于float
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  },
  components: {
    ProgressBar
  }
}
</script>
<style scoped>
.player{
  background-color: #76b900;
}
  .normal-player{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    left:0;
    background-color: #ffffff;
    z-index:100;
  }
  .normal-enter-active .bot-animation, .normal-enter-active .top-animation{
    transition: all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
  .normal-enter .bot-animation{
    opacity: 0;
    transform: translate3d(0, 60px,0 );
  }
.normal-enter .top-animation{
  opacity: 0;
  transform: translate3d(0, -60px,0 );
}
.normal-enter-active,.normal-leave-active {
  transition: all .4s ;
}
  .normal-enter,.normal-leave-to {
    opacity:0;
    /*transform: translate3d(0, -100px, 0)*/
  }

  .background{
    position: absolute;
    left: 0;
    top:0;
    width:100%;
    height:100%;
    z-index:-1;
    opacity:0.6;
    filter:blur(20px)
  }
  .top{
    position: relative;
    margin-bottom: 25px;
  }
    .back{
      position: absolute;
      top:0;
      left:6px;
      z-index: 50;
    }
      .icon-back{
        display: block;
        padding: 9px;
        font-size: 20px;
        color: #bc2f2e;
      }
    .title{
      width:70%;
      text-shadow: 1px 1px 2px #fff;
      margin:0 auto;
      line-height: 40px;
      text-align: center;
      white-space: nowrap;
      font-size: 16px;
      color: #000000;
    }
    .subtitle{
      text-shadow: 1px 1px 2px #777777;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #565656;
    }
  .middle{
    position: fixed;
    width:100%;
    top:80px;
    bottom:170px;
    white-space: nowrap;
    font-size: 0;
  }
    .middle-l{
      display: inline-block;
      vertical-align: top;
      position: relative;
      width:100%;
      height:0;
      padding-top: 80%;
    }
      .cd-wrapper{
        position: absolute;
        left:10%;
        top:0;
        width:80%;
        height:100%;
      }
        .cd{
          width:100%;
          height:100%;
          box-sizing: border-box;
          border: 10px solid rgba(255,255,255, 0.1);
          border-radius: 50%;
        }
          .image{
            position: absolute;
            left: 0;
            top:0;
            width:100%;
            height:100%;
            border-radius:50%
          }
          .play{
            animation: rotate 20s infinite linear;
          }
          .pause{
            animation-play-state: paused;
          }
    .bottom{
      position: absolute;
      bottom:50px;
      width:100%;
    }
      .progress-wrapper{
        margin-bottom: 10px;
        display: flex;
      }
      .progress-bar-wrapper{
        position: relative;
        flex: 1 1 40px;
        width: 80vw;
        background-color: #f4f4f4;
        border-radius:10px;
        margin: 5px 8px;
      }
      .time {
        flex: 0 0 40px
      }
      .dot-wrapper{
        text-align: center;
        font-size: 0;
      }
        .dot{
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #76b900;
        }
      .operators{
        display: flex;
        align-items: center;
      }
        .icon{
          flex: 1;
          color: #bc2f2e;
        }
        .i-left{
          text-align: right;
        }
        .i-center{
          padding:0 20px;
          text-align: center;
        }
        i{
          font-size: 40px;
        }
        .disable{
          color: rgba(188, 47, 46, 0.46);
        }
      .i-right{
        text-align: left;
      }
      .icon-favorite{
        color: #000;
      }
  .mini-player{
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background-color: #e7e7e7;
  }
.mini-enter-active,.mini-leave-active {
  transition: all .4s;
}
.mini-enter,.mini-leave-to {
  opacity:0;
  transform: translate3d(0, 50px, 0)
}
  .icon{
    flex:0 0 40px;
    width:40px;
    padding:0 10px 0 20px;
  }
    .small-img{
      border-radius: 50%;
    }
  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    text-align: left;
  }
    .name{
      margin-bottom: 2px;
      font-size: 14px;
      color: #000;
      white-space: nowrap;
    }
    .desc{
      font-size: 12px;
      color: #555555;
      white-space: nowrap;
    }
  .control{
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
  }
  .icon-play-mini, .icon-pause-mini, .icon-playlist{
    padding-right: 6px;
    font-size: 30px;
    color: #bc2f2e;
  }
  .icon-mini{
    font-size: 32px;
    position: absolute;
    left: 0;
    top: 0
  }
  @keyframes rotate {
    0% {transform: rotate(0) }
    100% {transform: rotate(360deg)}
  }
</style>
