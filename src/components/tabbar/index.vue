<template>
  <div class="g-tabbar">
    <router-link class="g-tabbar-item" to="/home">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/category">
      <i class="iconfont icon-fenlei"></i>
      <span>分类</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/cart">
      <i class="iconfont icon-gouwuche1"></i>
      <span>购物车</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/personal">
      <i class="iconfont icon-gerenzhongxin"></i>
      <span>个人中心</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name:'CTabbar',
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/tabbar";
  .router-link-active{
    color: $link-active-color;
  }
</style>
