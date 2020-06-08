<template>
  <div>
    <div class="headerImg">
      <img src="@/assets/logo.png" alt="img">
    </div>
    <ul>
      <li class="item" v-for="(item, index) in list" :key="index">
        <div>{{item.label}}</div>
        <i class="iconfont icon-iconfontjiantou3"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Personal',
    data(){
      return {
        list: [
          {label:'商品收藏'},
          {label:'我的足迹'},
          {label:'店铺收藏'},
          {label:'我的订单'},
          {label:'退出'},
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
  .headerImg{
    width: 100%;
    height:100px;
    @include flex-center(row);
    background-color: rgba(255, 165, 0, 0.15);
    img{
      width: 100px;
      height: 100px;
    }
  }

  .item{
    @include flex-between();
    height: 44px;
    background-color: white;
    padding: 8px;
    margin-bottom: 2px;
    text-align: center;
    line-height: 44px;
  }
</style>
