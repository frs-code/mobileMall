<template>
  <div class="version">
    <div class="service">
      <div class="service-title">服务</div>
      <div class="service-text">15天退货-1次破损补费-运费险</div>
      <i class="iconfont icon-iconfontjiantou3"></i>
    </div>
    <div class="parameter">
      <div class="parameter-title">参数</div>
      <div class="parameter-text">品牌 型号...</div>
      <i class="iconfont icon-iconfontjiantou3"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "version"
    }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";

  .version{
    width: 100%;
    background-color: white;
    margin-top: 8px;
  }

  .service{
    @include flex-center(row);
    padding: 8px;
    font-size: $font-size-base;

    &-title{
      color: #999999;
    }

    &-text{
      flex-grow: 1;
      padding-left: 8px;
    }
  }

  .parameter{
    @include flex-center(row);
    padding: 8px;
    font-size: $font-size-base;

    &-title{
      color: #999999;
    }

    &-text{
      flex-grow: 1;
      padding-left: 8px;
    }
  }

</style>
