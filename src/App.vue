<template>
  <div id="app">
    <div class="header">
      <m-header></m-header>
      <tab></tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab.vue'
export default {
  components: {
    MHeader,
    Tab
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
  body,h1,h2,h3,span,ul,li,ol{
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
</style>
