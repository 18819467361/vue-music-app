<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon iconfont">&#xe680;</i>
            <span class="text">歌曲列表</span>
            <span class="clear"><i class="icon-clear iconfont">&#xe621;</i> </span>
          </h1>
        </div>
        <scroll ref="scroll" :data="sequenceList" class="list-content">
          <ul>
            <li ref="listItem" class="item" v-for="(item, index) in sequenceList" :key="index"
                @click="selectItem(item, index)">
              <i class="current iconfont" :class="getCurrentIcon(item)">&#xe641;</i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i class="icon-not-favorite icon iconfont">&#xe60c;</i>
              </span>
              <span class="delete">
                <i class="icon-delete iconfont">&#xe61d;</i>
              </span>
            </li>
          </ul>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add icon iconfont">&#xe631;</i>
            <span class="text">添加歌曲到列表</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
import Scroll from '@/base/scroll/scroll'
import {playMode} from '@/common/js/config'
export default {
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    selectItem (item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },
    getCurrentIcon (item) {
      if (item.id === this.currentSong.id){
        return 'playingIcon'
      }
    },
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.scrollToElement(this.currentSong)
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    scrollToCurrent (current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      this.$refs.scroll.scrollToElement(this.$refs.listItem[index], 300)
    },
    ...mapMutations(
      {
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayingState: 'SET_PLAYING_STATE'
      }
    )
  },
  computed: {
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode'
    ])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      this.scrollToCurrent(newSong)
    }
  },
  components: {
    Scroll
  }
}
</script>
<style scoped>
.playlist{
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index: 200;
  background-color: rgba(201, 201, 201, 0.43);
}
  .list-fade-enter-active,.list-fade-leave-active{
    transition: opacity .3s;
  }
.list-fade-enter-active .list-wrapper, .list-fade-leave-active .list-wrapper{
    transition: all .3s;
  }
  .list-fade-enter, .list-fade-leave-to{
    opacity: 0;
  }
  .list-fade-enter .list-wrapper, .list-fade-leave-to .list-wrapper{
    transform: translate3d(0, 100px, 0);
  }
  .list-wrapper{
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
    background: #ffffff;
    height: 400px;
  }
  .list-header{
    position: relative;
    padding:20px 30px 10px 30px;
  }
  .add{
    border:1px solid #bc2f2e;
    border-radius: 12px;
    height: 25px;
    line-height: 25px;
    margin-top: -4px;
  }
  .add .icon{
    font-size: 20px;
  }
  .title{
    display: flex;
    align-items: center;
  }
  .title .text{
    text-align: center;
  }
  .icon{
    margin-top: 10px;
    font-size: 18px;
    color: #b92637;
  }
  .playingIcon{
    color: #bc2f2e !important;
  }
  .text{
    flex:1;
    font-size: 16px;
    color: #434343;
  }
  .clear{
    font-size: 16px;
    color: #434343;
  }
  .icon-clear{
    font-size: 18px;
    color: #bc2f2e;
  }
  .list-content{
    position: relative;
    height:240px;
    overflow: hidden;
  }
  .item{
    display: flex;
    align-items: center;
    height:30px;
    padding:0 30px 0 20px;
    overflow: hidden;
  }
  .current{
    flex: 0 0 20px;
    width:20px;
    font-size: 12px;
    color: rgba(188, 47, 46, 0);
  }
  .text{
    flex:1;
    white-space: nowrap;
    font-size: 14px;
    color: #3a3a3a;
    text-align: left;
  }
  .like{
    margin-right: 15px;
    font-size: 16px;
    color: #3a3a3a;
  }
  .list-operate{
    position: relative;
    width:140px;
    margin:20px auto 50px auto;
  }
  .list-close{
    text-align: center;
    line-height: 50px;
    width: 100vw;
    position: absolute;
    bottom: 0;
    background-color: #bc2f2e;
    font-size: 16px;
    color: #ffffff;
  }
</style>
