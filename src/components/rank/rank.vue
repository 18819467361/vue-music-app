<template>
  <div class="rank">
    <scroll class="toplist" :data="topList" ref="topList">
      <div>
        <ul>
          <li v-for="(item, index) in topList" :key="index" class="item" @click="selectItem(item)">
            <div class="icon">
              <img v-lazy="item.picUrl" width="100" height="100"/>
            </div>
            <ul class="songlist">
              <li v-for="(song, index) in item.songList" :key="index" class="song">
                <span>{{index + 1}}</span>
                <span>{{song.songname}}-{{song.singername}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="fixScroll" ref="fixScroll"></div>
      </div>
      <div v-if="topList.length === 0" class="loading-container"><loading title="正在载入"></loading></div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import {fetchTopList} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import {playlistMixin} from '@/common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      topList: []
    }
  },
  created () {
    this._fetchTopList()
  },
  methods: {
    _fetchTopList () {
      fetchTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length ? '60px' : '10px'
      this.$refs.fixScroll.style.height = bottom
      this.$refs.topList.refresh()
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  },
  components: {
    Scroll,
    Loading
  }
}
</script>
<style scoped>
  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }

  .toplist {
    height: 100%;
    overflow: hidden;
    width: 100vw;
  }

  .item {
    display: flex;
    margin: 6px 20px;
    height: 100px;
    box-shadow: 1px 1px 2px #808080;
  }
  .songlist{
    padding:10px 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 14px;
    color: #3e3e3e;
    font-family: "Microsoft YaHei UI",黑体,sans-serif;
    white-space: nowrap;
    overflow: hidden;
  }
  .loading-container{
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
  }
</style>
