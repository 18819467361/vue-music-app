<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">YJY Music</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped>
.m-header{
  display: flex;
  flex-wrap: nowrap;
  justify-content:center;
  align-items: center;
  background-color: #bc2f2e;
}
.icon{
  width:40px;
  height:44px;
  background: transparent url("logo@3x.png");
  background-size: contain;
  float: left;
}
  h1{
    color: #ffffff;
    font-size: 20px;
  }
</style>
