<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon iconfont" @click="changeMode" v-html="icomMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear"><i class="icon-clear iconfont" @click="showConfirm">&#xe621;</i> </span>
          </h1>
        </div>
        <div class="scroll-wrapper">
          <scroll ref="scroll" :refreshDelay="refreshDelay" :data="sequenceList" class="list-content">
            <transition-group name="list" tag="ul">
              <li ref="listItem" class="item" v-for="(item, index) in sequenceList" :key="item.id"
                  @click="selectItem(item, index)">
                <i class="current iconfont" :class="getCurrentIcon(item)">&#xe641;</i>
                <span class="text">{{item.name}}</span>
                <span class="like">
                <i class="icon-not-favorite icon iconfont" @click.stop="toggleFavorite(item)" v-html="getFavoriteIcon(item)"></i>
              </span>
                <span class="delete">
                <i class="icon-delete iconfont" @click.stop="deleteOne(item)">&#xe61d;</i>
              </span>
              </li>
            </transition-group>
          </scroll>
        </div>
        <div class="list-operate">
          <div class="add" @click.stop="addSong">
            <i class="icon-add icon iconfont">&#xe631;</i>
            <span class="text">添加歌曲到列表</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapMutations, mapActions} from 'vuex'
import Scroll from '@/base/scroll/scroll'
import {playMode} from '@/common/js/config'
import Confirm from '@/base/confirm/confirm'
import {playerMixin} from '@/common/js/mixin'
import AddSong from '@/components/add-song/add-song'

export default {
  mixins: [playerMixin],
  data () {
    return {
      showFlag: false,
      refreshDelay: 100
    }
  },
  methods: {
    addSong () {
      this.$refs.addSong.show()
    },
    confirmClear () {
      this.deleteSongList()
      this.hide()
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
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
      if (item.id === this.currentSong.id) {
        return 'playingIcon'
      }
    },
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.scroll.refresh()
        if (this.currentSong) {
          this.scrollToElement(this.currentSong)
        }
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
    deleteOne (item) {
      this.deleteSong(item)
      if (!this.playlist.length) {
        this.hide()
      }
    },
    ...mapMutations(
      {
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayingState: 'SET_PLAYING_STATE'
      }
    ),
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ])
  },
  computed: {
    modeText () {
      return this.mode ===playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    }
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
    Scroll,
    Confirm,
    AddSong
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
  .item .text{
    flex:1;
    font-size: 16px;
    color: #434343;
    max-width: 230px;
    overflow: hidden;
  }
  .clear{
    font-size: 16px;
    color: #434343;
  }
  .icon-clear{
    font-size: 18px;
    color: #bc2f2e;
  }
  .scroll-wrapper{
    position: absolute;
    top: 65px;
    height:240px;
    width:100%;
    overflow: hidden;
  }
  .list-content{
    width: 100%;
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
    position: absolute;
    bottom: 55px;
    left:50%;
    width:140px;
    margin:20px auto 0 -70px;
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
  .list-enter-active, .list-leave-active{
    transition: all 0.1s
  }
  .list-enter, .list-leave-to{
    height: 0
  }
</style>
