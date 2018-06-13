<template>
  <ul class="switches">
    <li class="switch-item" :key="index" v-for="(item, index) in switches"
        :class="{'active':currentIndex === index}"
        @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    switches: {
      type: Array,
      defalut: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}
</script>
<style scoped>
  .switches{
    display: flex;
    align-items: center;
    width:240px;
    margin:0 auto;
    border: 1px solid #4c4c4c;
    border-radius: 5px;
  }
  .switch-item{
    flex:1;
  }
  .active{
    color: #fff;
    background-color: #bc2f2e;
  }
</style>
