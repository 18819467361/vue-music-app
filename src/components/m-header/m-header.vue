<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">YJY Music</h1>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine iconfont">&#xe633;</i>
    </router-link>
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
  flex-grow: 2;
}
.icon{
  flex:1 1 auto;
  width:40px;
  height:44px;
  background: transparent url("logo@3x.png") no-repeat top right;
  background-size: contain;
}
  h1{
    color: #ffffff;
    font-size: 20px;
    flex:none;
    margin-right: -50px;
  }
  .mine{
    float: right;
    flex:1 1 auto;
    text-align: right;
    padding-right: 20px;
  }
  .icon-mine{
    color: #ffffff;
    font-size: 26px;
  }
</style>
