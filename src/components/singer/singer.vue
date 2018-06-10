<template>
  <div class="singers-wrapper">
    <top-nav @change-area="resetArea"></top-nav>
    <view-list @select="selectSinger" :data="singersFull"></view-list>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {fetchSingerList} from '../../api/singer.js'
import {ERR_OK, singersNav} from '@/api/config'
import TopNav from './singerNav/singerTopNav.vue'
import ViewList from '@/base/listview/listview.vue'
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      singers: [],
      areaId: -100,
      index: singersNav.index

    }
  },
  components: {
    TopNav,
    ViewList
  },
  computed: {
    singersFull: function () {
      if (this.singers.length === 28) {
        return this.singers
      }
    }
  },
  created () {
    this._fetchSingerList(this.setSingers, this.index)
  },
  methods: {
    _fetchSingerList (callback, index) {
      for (let i = 0; i < index.length; i++) {
        fetchSingerList(this.areaId, index[i], i, callback)
      }
    },
    setSingers (data, name, index) {
      if (data.code === ERR_OK) {
        data.singerList.data.singerlist.splice(20)
        Vue.set(this.singers, index, {'name': '', 'data': ''})
        this.singers[index]['name'] = name
        this.singers[index]['data'] = data.singerList.data.singerlist
      }
    },
    resetArea (areaId) {
      this.areaId = areaId
    },
    resetIndex (index) {
      this.index = index
    },
    selectSinger (singer) {
      this.setSinger(singer)
      this.$router.push({
        path: `/singer/${singer.singer_id}`
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  watch: {
    areaId () {
      this._fetchSingerList(this.setSingers, this.index)
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
