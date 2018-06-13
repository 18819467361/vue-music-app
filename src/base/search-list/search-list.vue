<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul" class="search-content">
      <li @click="selectItem(item)" class="search-item" :key="item" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete iconfont">&#xe61d;</i>
        </span>
      </li>
    </transition-group>
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
  padding-left: 10px;
}
  .list-enter-active, .list-leave-active{
    transition: all .4s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }
</style>
