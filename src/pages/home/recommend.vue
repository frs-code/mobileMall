<template>
  <div class="recommend">
    <h3 class="recommend-title">热卖推荐</h3>
    <me-loading class="recommend-loading" v-if="!recommendArr.length"></me-loading>
    <ul class="recommend-list" v-else>
      <li class="recommend-item" v-for="(item,index) in recommendArr" :key="index">
        <router-link
          class="recommend-link"
          :to="{name:'home-product',
          query:{id:item.baseinfo.itemId, picUrl:item.baseinfo.picUrl, price:item.price.actPrice, count:item.remind.soldCount, info:item.name.longName}}">
          <div class="recommend-pic">
            <img v-lazy="item.baseinfo.picUrl" alt="img" class="recommend-img">
          </div>
          <div class="recommend-name">{{item.name.shortName}}</div>
          <div class="recommend-origPrice">
            <del>￥{{item.price.origPrice}}</del>
          </div>
          <div class="recommend-info">
            <span class="recommend-price">￥<strong>{{item.price.actPrice}}</strong></span>
            <span class="recommend-count">{{item.remind.soldCount}}件已售</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getHomeRecommend} from '@/api/home';
  import MeLoading from '@/base/loading'
  export default{
    name:'HomeRecommend',
    data(){
      return{
        recommendArr:[],
        currentPage: 1,
        totalPage: 1
      };
    },
    components:{
      MeLoading
    },
    created(){
     this.getRecommend();
    },
    methods:{
      getRecommend(){
        if(this.currentPage > this.totalPage){
          return Promise.reject(new Error('没有更多了'));
        }
        return getHomeRecommend(this.currentPage).then(data =>{
          return new Promise(reslove =>{
            if(data){
              this.currentPage++;
              this.totalPage = data.totalPage;
              this.recommendArr = this.recommendArr.concat(data.itemList);
              this.$emit('loaded',this.recommendArr);
              reslove();
              console.log(data);
            }
          })
        })
      },
      update(){
        return this.getRecommend();
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
  .recommend{
    &-title{
      position: relative;
      width: 100%;
      padding: 8px 0;
      font-size: $font-size-l;
      text-align: center;

      &:before, &:after{
        content:'';
        position: absolute;
        width: 40%;
        height: 1px;
        background-color: #dddddd;
        top: 50%;
      }

      &:before{
        left: 0;
      }

      &:after{
        right: 0;
      }
    }

    &-list{
      @include flex-between();
      flex-wrap: wrap;
    }

    &-item{
      width: 49%;
      background-color: white;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 8px;
    }

    &-link{
      display: block;
    }

    &-pic{
      position: relative;
      width: 100%;
      padding-top: 100%;
      margin-bottom: 8px;
    }

    &-img{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    &-name{
      height: 36px;
      padding: 0 5px;
      margin-bottom: 8px;
      line-height: 1.5;
      @include multiline-ellipsis()
    }

    &-origPrice{
      padding: 0 5px;
      margin-bottom: 8px;
      color: #cccccc;
    }

    &-info{
      @include flex-between();
      padding: 0 5px;
      margin-bottom: 8px;
    }

    &-price{
      color: #e61414;

      strong{
        font-size: 26px;
      }
    }

    &-count{
      color: #999999;
    }

    &-loading{
      padding-top: 100px;
    }
  }
</style>
