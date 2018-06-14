<template>
  <div class="song-list">
    <ul>
      <li v-for="(song,index) in songs" :key="index" @click="selectItem(song,index)" class="item">
        <div class="rank" :class="getRankCls(index)" v-show="rank">
          <span >{{getRankText(index)}}</span>
        </div>
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
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer} ,${song.album}`
    },
    selectItem (item, index) {
      this.$emit('select', item, index)
    },
    getRankCls (index) {
      if (index <= 2) {
        return 'imageRank' + index
      } else {
        return 'textRank'
      }
    },
    getRankText (index) {
      if (index <= 2) {
        return ''
      } else {
        return index + 1
      }
    }
  }
}
</script>
<style scoped>
  .song-list{
    width: 100vw;
  }
  .item{
    width: 100%;
    box-sizing: border-box;
    padding:10px 20px;
    display: flex;
    align-items: center;
  }
  .content{
    flex:auto;
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
  .rank{
    margin-right: 10px;
    flex:none;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
  .imageRank0{
    background-size: contain;
    background-image: url("./list0.png");
  }
  .imageRank1{
    background-size: contain;
    background-image: url("./list1.png");
  }
  .imageRank2{
    background-size: contain;
    background-image: url("./list2.png");
  }
  .textRank {
    font-size: 14px;
    color: #545454;
  }
</style>
