<template>
  <div class="cart">
    <cart-header></cart-header>
    <div class="detail-container">
      <cart-detail @total="getSum" :cartList="cartList" ref="detail"></cart-detail>
    </div>
    <cart-bottom class="bottom" :total="sum" @clear="update"></cart-bottom>
  </div>
</template>

<script>
  import CartHeader from './header';
  import CartDetail from './detail';
  import CartBottom from './bottom';
  import storage from "@/assets/js/storage";
  export default {
    name: 'Cart',
    components:{
      CartHeader,
      CartDetail,
      CartBottom
    },
    data(){
      return {
        cartList: [],
        sum: 0
      }
    },
    methods:{
      update(){
        this.getCartList();
      },
      getCartList(){
        this.cartList = storage.get('cart');
      },
      getSum(data){
        this.sum = data;
      }
    },
    created(){
      this.getCartList();
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .cart{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .detail-container{
    overflow: auto;
    height: 80%;
  }

  .bottom{
    position: fixed;
    left: 0;
    bottom: 50px;
    border-bottom: 1px solid $border-color;
  }
</style>
