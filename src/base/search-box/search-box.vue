<template>
  <div class="search-box">
    <i class="icon-search iconfont">&#xe669;</i>
    <input v-model="query" :placeholder="placeholder" class="box"/>
    <i v-show="query" @click="clear" class="icon-dismiss iconfont">&#xe622;</i>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      query: ''// v-model 双向绑定
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    }
  },

  created () {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
}
</script>
<style scoped>
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100vw;
  padding:0 6px;
  height: 5vh;
  background: #ffffff;
  border:1px solid #9b9b9b;
  border-radius: 6px;
}
  .icon-search{
    font-size: 24px;
    color: #bc2f2e;
  }
  .box{
    flex:1;
    margin: 0 5px;
    line-height: 18px;
    background-color: #ffffff;
    color: #323232;
    font-size: 16px;
    border: none;
  }
  .box:focus {
    border: 1px solid #bc2f2e;
    box-shadow: 0 0 4px #bc2f2e;
  }
  .icon-dismiss{
    font-size: 16px;
    column-rule: #7a7a7a;
  }
</style>
