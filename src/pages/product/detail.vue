<template>
  <div class="detail">
    <div class="pic-wrapper">
      <img v-lazy="picUrl" alt="img" class="pic-img">
    </div>
    <div class="price">￥<span>{{price}}</span></div>
    <div class="discount">
      <div class="discount-left"><p>淘金币可抵0.66元</p></div>
      <div class="discount-center"><p>商品卷满40减2</p></div>
      <div class="discount-right">
        <span>领劵</span>
        <i class="iconfont icon-iconfontjiantou3"></i>
      </div>
    </div>
    <div class="info">
      <p v-html="info"></p>
      <div class="share">
        <i class="iconfont icon-fenxiang"></i>
        <span>分享</span>
      </div>
    </div>
    <div class="btn">
      <div class="recommend-btn">
        <i class="iconfont icon-xiai"></i>
        <span>推荐</span>
      </div>
      <div class="help-btn">
        <i class="iconfont icon-xuanzhong"></i>
        <span>帮我选</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "detail",
      props:{
        picUrl:{
          type: String
        },
        price:{
          type: String
        },
        info:{
          type: String
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import 'src/assets/scss/mixins';
  .detail{
    width: 100%;
    background-color: white;
    margin-top: 55px;
  }

  .back{
    font-size: $font-size-l + 8;
    padding: 8px 8px 8px 0;
  }

  .pic-wrapper{
    width: 100%;

    .pic-img{
      width: 100%;
    }
  }

  .price{
    font-size: $font-size-base;
    color: #f23030;
    padding: 8px;
    span{
      font-size: $font-size-l + 8;
    }
  }

  .discount{
    @include flex-between();
    font-size: $font-size-base;
    color: #f23030;
    padding: 0 8px 8px;

    div{
      padding-right: 8px;
    }

    .discount-right{
      flex-grow: 1;
      text-align: right;
      padding-right: 0;
    }

    p{
      background-color: rgba(204, 204, 204, 0.6);
      border-radius: 5px;
      padding: 4px;
    }
  }

  .info{
    @include flex-between();

    p{
      width: 85%;
      font-size: $font-size-l + 2;
      font-weight: bold;
    }

    .share{
      border-radius: 5px;
      background-color: rgba(204, 204, 204, 0.44);
      font-size: $font-size-base;
      color: #999999;
      padding: 2px;
    }
  }

  .btn{
    width: 100%;
    @include flex-center(row);
    text-align: center;
    margin-top: 8px;
    padding: 0 8px 8px;
    color: #cccccc;
    .recommend-btn{
      width: 50%;
    }

    .help-btn{
      width: 50%;
    }
  }

</style>
