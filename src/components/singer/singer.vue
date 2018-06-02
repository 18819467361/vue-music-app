<template>
  <div class="m-header">
   歌手页面
  </div>
</template>

<script type="text/ecmascript-6">
import {fetchSingerList} from '../../api/singer.js'
export default {
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._fetchSingerList(this.setSingers)
  },
  methods: {
    _fetchSingerList (callback) {
      fetchSingerList(callback)
    },
    setSingers (data) {
      this.singers = data
      console.log(this.singers, 'singers')
    }
  }
}
</script>

<style scoped>

</style>
