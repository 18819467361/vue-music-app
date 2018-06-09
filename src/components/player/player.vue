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
        <div class="middle mid-animation"
             @touchstart.prevent="middleTouchStart"
              @touchmove.prevent="middleTouchMove"
              @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image" />
              </div>
            </div>
          </div>
          <div class="scroll-wrapper middle-r">
            <scroll  ref="lyricList" :data="currentLyric && currentLyric.lines">
              <div class="lyric-wrapper">
                <div class="lyric" v-if="currentLyric">
                  <p ref="lyricLine"
                     class="text"
                     :class="{'current': currentLineNum === index}"
                     v-for="(line, index) in currentLyric.lines" :key="index">{{line.txt}}</p>
                </div>
              </div>
            </scroll>
          </div>
        </div>
        <div class="bottom bot-animation">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div  class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence iconfont" @click="changeMode" v-html="icomMode"></i>
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
          <progress-circle :percent="percent" :radius="radius">
          <i @click.stop="togglePlay" class="icon-playlist icon-mini iconfont" v-html="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="contorl">
          <i class="icon-playlist iconfont">&#xe6a9;</i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @ended="end" @canplay="ready" @error="error" @timeupdate="updateTime" ></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import {prefixStyle} from '../../api/dom'
import ProgressBar from '@/base/progress-bar/progress-bar'
import ProgressCircle from '@/base/progress-circle/progress-circle'
import {playMode} from '@/common/js/config.js'
import {shuffle} from '@/common/js/util.js'
import Lyric from 'lyric-parser'
import Scroll from '@/base/scroll/scroll'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd'
    }
  },
  computed: {
    icomMode () {
      return this.mode === playMode.sequence ? '&#xe68f;' : this.mode === playMode.loop ? '&#xe630;' : '&#xe615;'
    },
    palyIcon () {
      return this.playing ? '&#xe60b;' : '&#xe817;'
    },
    miniIcon () {
      return this.playing ? '&#xe60b;' : '&#xe641;'
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
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  created () {
    this.touch = {}
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.getLyric()
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
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
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
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
        return
      }
      this.nextSong()
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
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
    getLyric () {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      console.log(lineNum, 'number')
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    onProgressBarChange (percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent
      if (!this.playing) {
        this.togglePlay()
      }
    },
    middleTouchStart (e) {
      console.log('touch-start')
      this.touch.initiated = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove (e) {
      console.log('touch-move')
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd () {
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.7) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
    }
  },

  components: {
    ProgressBar,
    ProgressCircle,
    Scroll
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

      .middle-r{
        display: inline-block;
        width:100vw;
        position: relative;
        margin-top: 8px;
        height:100%;
      }
        .lyric{

        }
        .text{
          width: 100vw;
          text-align: center !important;
          font:normal 14px/1.5em "Microsoft YaHei UI",sans-serif;
          color: rgba(72, 72, 72, 0.67);
        }
        .current{
          color: #000000;
          font-weight: bold;
        }
    .bottom{
      position: absolute;
      bottom:50px;
      width:100%;
    }
      .progress-wrapper{
        text-align: center;
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
        line-height: 20px;
        font-size: 14px;
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
          border-radius: 4px;
          background-color: #bc2f2e;
        }
        .active {
          width: 16px;
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
