<template>
  <div class="addr">
    <div class="deliver">
      <div class="deliver-title">发货</div>
      <div class="deliver-address">
        <i class="iconfont icon-weizhi"></i>
        <span class="deliver-text">河北邢台</span>
      </div>
      <div class="deliver-express">快递：免运费</div>
      <div class="deliver-sales">已售{{count}}</div>
    </div>
    <div class="activity">
      <div class="activity-title">活动</div>
      <div class="activity-text">红包省钱卡，开本卡立减！</div>
      <i class="iconfont icon-iconfontjiantou3"></i>
    </div>
  </div>
</template>

<script>
    export default {
      name: "addr",
      props:{
      count:{
        type: String
      }
      }
    }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";

  .addr{
    width: 100%;
    background-color: white;
    margin-top: 8px;
  }

  .deliver{
    @include flex-center(row);
    padding: 8px;
    font-size: $font-size-base;

    &-title{
      color: #999999;
    }

    &-address{
      padding: 0 8px;
      border-right: 1px solid $border-color;
    }

    &-express{
      flex-grow: 1;
      padding-left: 8px;
    }

    &-sales{
      color: #999999;
    }

  }

  .activity{
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
