<template>
<transition name="slide">
  <div class="user-center">
    <div class="back">
      <i class="icon-back iconfont" @click="back">&#xe636;</i>
    </div>
    <div class="switches-wrapper">
      <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
    </div>
    <div ref="playBtn" class="play-btn">
      <i class="icon-play iconfont">&#xe641;</i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper" ref="listWrapper"></div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
import Switches from '@/base/switches/switches'
export default {
  data () {
    return {
      currentIndex: 0,
      switches: [
        {name: '我喜欢的'},
        {name: '最近添加'}

      ]
    }
  },
  methods: {
    switchItem (index) {
      this.currentIndex = index
    },
    back () {
      this.$router.back()
    }
  },
  components: {
    Switches
  }
}
</script>
<style scoped>
  .user-center {
    width:100vw;
    height:100vh;
    position: fixed;
    left:0;
    top: 0;
    background-color: #f2f2f2;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all .3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .back{
    position: absolute;
    top: 0;
    left:6px;
    z-index: 50;
  }
  .icon-back{
    display: block;
    padding:10px;
    font-size: 22px;
    color: #bc2f2e;
  }
  .switches-wrapper{
    margin:10px 0 30px 0;
  }
  .play-btn{
    box-sizing:border-box;
    width:135px;
    padding:7px 0;
    margin: 0 auto;
    text-align: center;
    border:1px solid #c3c3c3;
    color: #323232;
    border-radius: 100px;
    font-size: 0;
  }
  .icon-play{
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: 16px;
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
  }
  .list-wrapper{
    position: absolute;
    top:110px;
    bottom:0;
    width:100%;
  }
  .list-scroll{
    height:100%;
    overflow: hidden;
  }
  .list-inner{
    padding:20px 30px;
  }
  .no-result-wrapper{
    position: absolute;
    width:100%;
    top:50%;
    transform: translateY(-50%)
  }
</style>
