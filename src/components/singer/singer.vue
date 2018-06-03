<template>
  <div class="singers-wrapper">
    <top-nav @change-area="resetArea"></top-nav>
    <view-list :data="singers"></view-list>
    <side-nav @change-index="resetIndex"></side-nav>
  </div>
</template>

<script type="text/ecmascript-6">
import {fetchSingerList} from '../../api/singer.js'
import {ERR_OK} from '@/api/config'
import SideNav from './singerNav/singerSideNav.vue'
import TopNav from './singerNav/singerTopNav.vue'
import ViewList from '@/base/listview/listview.vue'
export default {
  data () {
    return {
      singers: [],
      areaId: -100,
      index: -100
    }
  },
  components: {
    SideNav,
    TopNav,
    ViewList
  },
  created () {
    this._fetchSingerList(this.setSingers)
  },
  methods: {
    _fetchSingerList (callback) {
      fetchSingerList(this.areaId, this.index, callback)
    },
    setSingers (data) {
      if (data.code === ERR_OK) {
        data.singerList.data.singerlist.splice(20)
        this.singers = data.singerList.data.singerlist
        console.log(this.singers, 'singers')
      }
      console.log(data, 'data')
    },
    resetArea (areaId) {
      this.areaId = areaId
    },
    resetIndex (index) {
      this.index = index
    }
  },
  watch: {
    areaId () {
      this._fetchSingerList(this.setSingers)
    },
    index () {
      this._fetchSingerList(this.setSingers)
    }
  }
}
</script>

<style scoped>
.singers-wrapper{
  position: relative;
  height: 84vh;
}

</style>
