<template>
  <div class="search">
   <div class="search-box-wrapper">
     <search-box ref="searchBox" @query="onQueryChange"></search-box>
   </div>
   <div class="shortcut-wrapper" v-show="!query">
     <div class="shortcut">
       <div class="hot-key">
         <h1 class="title">热门搜索</h1>
         <ul class="item-wrapper">
           <li @click="addQuery(item.k)" v-for="(item, index) in hotKey" :key="index" class="item">
             <span>{{item.k}}</span>
           </li>
         </ul>
       </div>
     </div>
   </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from '@/base/search-box/search-box'
import { fetchHotKey } from '@/api/search'
import {ERR_OK} from '@/api/config'
import Suggest from '@/components/suggest/suggest'
export default {
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  components: {
    SearchBox,
    Suggest
  },
  methods: {
    onQueryChange (query) {
      this.query = query
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    _fetchHotKey () {
      fetchHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
          console.log(this.hotKey, 'hotkey')
        }
      })
    }
  },
  created () {
    this._fetchHotKey()
  }
}
</script>

<style scoped>
.title{
  text-align: left;
  padding-left: 15px;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: #333333;
}
.item-wrapper{
  margin-left: 15px;
}
.item{
  float: left;
  padding:2px 5px;
  border:1px solid #7a7a7a;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 4px;
  background-color: rgba(223, 223, 223, 0.56);
  font-size: 14px;
}
  .search-result{
    position: absolute;
    top: 22vh;
    padding-top: 20px;
    width:100vw;
    height:72vh;
  }
</style>
