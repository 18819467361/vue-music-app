<template>
  <div class="search">
   <div class="search-box-wrapper">
     <search-box ref="searchBox" @query="onQueryChange"></search-box>
   </div>
   <div class="shortcut-wrapper" v-show="!query">
     <scroll class="shortcut" :data="shortcut" ref="shortcut">
       <div>
         <div class="hot-key">
           <h1 class="title">热门搜索</h1>
           <ul class="item-wrapper">
             <li @click="addQuery(item.k)" v-for="(item, index) in hotKey" :key="index" class="item">
               <span>{{item.k}}</span>
             </li>
           </ul>
         </div>
         <div class="search-history" v-show="searchHistory.length">
       </div>
         <h1 class="title">
           <span class="text">搜索历史</span>
           <span class="clear" @click.stop="showConfirm">
             <i class="icon-clear iconfont">&#xe621;</i>
           </span>
         </h1>
         <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
         <div ref="fixedScroll"></div>
       </div>
     </scroll>
   </div>
   <div class="search-result" v-show="query">
      <suggest @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div>
   <confirm ref="confirm" :text="'是否清空所有搜索历史'" :confirmBtnText="'清空'" @confirm="clearSearchHistory"></confirm>
   <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from '@/base/search-box/search-box'
import { fetchHotKey } from '@/api/search'
import {ERR_OK} from '@/api/config'
import Suggest from '@/components/suggest/suggest'
import SearchList from '@/base/search-list/search-list'
import {mapActions, mapGetters} from 'vuex'
import Confirm from '@/base/confirm/confirm'
import Scroll from '@/base/scroll/scroll'
import {playlistMixin} from '@/common/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : '10px'
      this.$refs.fixedScroll.style.height = bottom
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
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
        }
      })
    },
    blurInput () {
      this.$refs.searchBox.blur()
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  created () {
    this._fetchHotKey()
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ]),
    shortcut () {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style scoped>
  .shortcut-wrapper{
    position: relative;
    width:100vw;
    height:78vh;
    margin-top: 10px;
  }
.title{
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding:0 15px;
  font-size: 16px;
  margin-top: 0;
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
  margin-bottom: 10px;
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
  .hot-key{
    position: relative;
    height: 100px;
  }
  .search-history{
    position: relative;
    padding-top: 15px;
  }
</style>
