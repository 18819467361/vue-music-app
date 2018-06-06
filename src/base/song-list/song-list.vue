<template>
  <div class="song-list">
    <ul>
      <li v-for="(song,index) in songs" :key="index" @click="test" class="item">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    songs: {
      type: Array
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer} ,${song.album}`
    }
  }
}
</script>
<style scoped>
  .item{
    width: 100vw;
    padding:10px 10px;
  }
.name{
  font:bold 16px/1em "Microsoft YaHei UI",sans-serif;
  color: #1a1a1a;
  text-align: left;
  padding-bottom: 4px;
}
.desc{
  font:normal 14px/1em "Microsoft YaHei UI",sans-serif;
  color: #676767;
  text-align: left;
  padding-bottom: 4px;
  border-bottom: 1px solid #e2e2e2;
}
</style>
