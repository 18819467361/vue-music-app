<template>
  <div id="app">
    <div class="header">
      <m-header></m-header>
      <tab></tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab.vue'
import Player from 'components/player/player.vue'
export default {
  components: {
    MHeader,
    Tab,
    Player
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body,h1,h2,h3,span,ul,li,ol,p{
    padding:0;
    margin:0;
  }
  ul,li{
    list-style: none;
  }
  .header{
    height:14vh;
    display: flex;
    flex-direction: column;
  }
@font-face {
  font-family: 'iconfont';  /* project id 697934 */
  src: url('//at.alicdn.com/t/font_697934_ezrkz29z07ywg66r.eot');
  src: url('//at.alicdn.com/t/font_697934_ezrkz29z07ywg66r.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_697934_ezrkz29z07ywg66r.woff') format('woff'),
  url('//at.alicdn.com/t/font_697934_ezrkz29z07ywg66r.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_697934_ezrkz29z07ywg66r.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;}
</style>
