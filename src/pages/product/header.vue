<template>
  <div class="product-header">
    <nav-bar class="header">
      <i class="iconfont icon-fanhui" @click="goBack" slot="left"></i>
      <div slot="center">
        <me-search flag @query="getQuery" @click.native="getToSearch"></me-search>
      </div>
      <i class="iconfont icon-xx" slot="right"></i>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/base/navbar';
  import MeSearch from '@/base/search';
  export default {
    name: 'ProductHeader',
    components:{
      NavBar,
      MeSearch
    },
    methods:{
      getQuery(query){
        console.log(query);
      },
      getToSearch(){
        this.$router.push('/search');
      },
      goBack(){
        this.$router.back();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .product-header{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .header{
    &.me-navbar{
      background-color: rgba(255, 0, 0, 0.9);
    }

    .iconfont{
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>

