<template>
  <div class="home-header" v-show="visible">
    <me-navbar class="header">
      <i class="iconfont icon-saoyisao" slot="left"></i>
      <div slot="center">
        <me-search flag @query="getQuery" @click.native="getToSearch"></me-search>
      </div>
      <i class="iconfont icon-xx" slot="right"></i>
    </me-navbar>
  </div>
</template>

<script>
import NavBar from '@/base/navbar';
import MeSearch from '@/base/search';
  export default {
    name: 'HomeHeader',
    components:{
     'me-navbar': NavBar,
      MeSearch
    },
    data(){
      return {
        visible: true
      }
    },
    methods: {
      show(){
        this.visible = true;
      },
      hide(){
        this.visible = false;
      },
      getQuery(query){
        console.log(query);
      },
      getToSearch(){
        this.$router.push('./search');
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
  .header{
    &.me-navbar{
      background-color: transparent;
    }

    .iconfont{
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
  //下拉到一定位置，添加.header-transition，使导航背景色变红
  .header-transition{
    background-color: rgba(255, 0, 0, 0.9);
  }
</style>
