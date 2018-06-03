<template>
  <div class="contain">
    <scroll class="singer-list-wrapper" :data="data">
      <ul class="list-content">
        <li v-for="(item, index) in data" :key="index">
          <div class="singer-list">
            <div class="img-wrapper">
              <img class="singer-img" :src="item.singer_pic"/>
            </div>
            <h3 class="singer-name">{{item.singer_name}}</h3>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import { singersNav } from '@/api/config.js'
export default {
  props: {
    data: {
      type: Array,
      defalut: []
    }
  },
  components: {
    Scroll
  }
}
</script>
<style>
  .contain{
    position: relative;
    height:78vh;
    width: 100vw;
  }
 .singer-list-wrapper{
   width: 100vw;
 }
  .singer-list{
    display: flex;
    background-color: #f9f9f9;
    margin:2px 4vh 6px 4px;
    padding: 4px;
    box-shadow: 1px 1px 2px #b6b6b6;
  }
  .img-wrapper{
    width:80px;
    height:80px;
    border-radius: 80px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .singer-img{
    width: 80px;
  }
  .singer-name{
    flex-grow: 1;
    height:80px;
    font: normal 16px/80px "Microsoft YaHei UI",sans-serif;
  }
</style>
