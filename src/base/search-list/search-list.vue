<template>
  <div class="search-list" v-show="searches.length">
    <ul class="search-content">
      <li @click="selectItem(item)" class="search-item" :key="index" v-for="(item, index) in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete iconfont">&#xe61d;</i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searches: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>
<style scoped>
  .search-content{
    box-sizing: border-box;
    width:100vw;
    padding:0 15px;
  }
.search-item{
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 16px;
  color: #4c4c4c;
  margin-bottom: 18px;
}
</style>
