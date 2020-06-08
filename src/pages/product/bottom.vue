<template>
    <div class="bottom">
      <div class="bottom-item">
        <i class="iconfont icon-dianpu"></i>
        <span>店铺</span>
      </div>
      <div class="bottom-item">
        <i class="iconfont icon-kefu"></i>
        <span>客服</span>
      </div>
      <div class="cart">
        <div class="addCart btn" @click="addCart">加入购物车</div>
        <div class="buy btn">立即购买</div>
      </div>
    </div>
</template>

<script>
  import storage from "@/assets/js/storage";
  export default {
    name: "bottom",
    data(){
      return{
        cartArr: []
      }
    },
    props:{
      product:{
        type: Object
      }
    },
    methods:{
      addCart(){
        let flag = true;
        if(this.cartArr.length > 0){
          for(let i in this.cartArr){
            if(this.cartArr[i] != null){
              if(this.product.id === this.cartArr[i].id){
                //有相同的产品，不重复添加到购物车
                flag = false;
              }
            }
          }
        }
        if(flag){
          this.cartArr.push(this.product);
        }
        storage.set('cart',this.cartArr);
      }
    },
    created(){
      if(storage.get('cart')){
        this.cartArr = storage.get('cart');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .bottom{
    width: 100%;
    display: flex;
    height: $tabbar-height;
    background-color: white;

    &-item{
      width: 20%;
      @include flex-center(column);
    }
    .cart{
      flex: 1;
      @include flex-center(row);

      .btn{
        border-radius: 5px;
        font-size: $font-size-l;
        padding: 5px 10px;
        color: white;
      }

      .addCart{
        background-color: #f23030;
      }

      .buy{
        background-color: orange;
      }

    }
  }


</style>
