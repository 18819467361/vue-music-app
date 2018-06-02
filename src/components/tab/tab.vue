<template>
  <div class="tab">
    <router-link tag="div" active-class="active" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" active-class="active" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" active-class="active" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" active-class="active" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped>
  .tab {
    width: 100%;
    background-color: #fafafc;
    display: flex;
    justify-content: space-around;
    margin-bottom: 4px;
  }

  .tab-item {
    font-size: 16px;
    color: #000000;
    font-family: "Microsoft Himalaya",sans-serif;
  }

  .active {
    color: #bc2f2e;
    border-bottom: 1px solid #bc2f2e;
  }
</style>
