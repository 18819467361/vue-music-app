<template>
  <div class="no-result">
    <div class="no-result-icon"><span class="iconfont">&#xe680;</span></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.no-result{
  width: 100vw;
  padding-top: 120px;
}
.no-result-icon{
  font-size: 50px;
  color: #bc2f2e;
  text-align: center;
}
.iconfont{
  font-size: 50px;
}
.no-result-text{
  color: #bc2f2e;
  font-size: 20px;
}
</style>
