<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      defalut: '正在载入...'
    }
  }
}
</script>
<style scoped>
  .loading{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: translateY(50%);
    align-items: center;
  }
  img{
    width: 50px;
    height:50px;
  }
</style>
