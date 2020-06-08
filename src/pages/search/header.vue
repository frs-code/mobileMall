<template>
  <div class="search-header">
    <nav-bar class="header">
      <i class="iconfont icon-fanhui" @click="goBack" slot="left"></i>
      <div slot="center">
        <me-search @query="getQuery"></me-search>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/base/navbar';
  import MeSearch from '@/base/search';
  export default {
    name: 'SearchHeader',
    components:{
      NavBar,
      MeSearch
    },
    methods:{
      getQuery(query){
        this.$emit('query',query);
      },
      goBack(){
        this.$router.back();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .header{

    .iconfont{
      color: $icon-color;
      font-size: $icon-font-size;
    }
  }
</style>
