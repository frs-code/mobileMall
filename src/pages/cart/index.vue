<template>
  <div class="cart">
    <cart-header></cart-header>
    <div class="detail-container">
      <cart-detail @total="getSum" :cartList="cartList" @showConfirm="showConfirm" @delete="update" ref="detail"></cart-detail>
    </div>
    <cart-bottom class="bottom" :total="sum" @clear="update"></cart-bottom>
    <me-confirm ref="confirm" msg="确定要删除吗？" @confirm="remove"></me-confirm>
  </div>
</template>

<script>
  import CartHeader from './header';
  import CartDetail from './detail';
  import CartBottom from './bottom';
  import storage from "@/assets/js/storage";
  import MeConfirm from '@/base/confirm';
  export default {
    name: 'Cart',
    components:{
      CartHeader,
      CartDetail,
      CartBottom,
      MeConfirm
    },
    data(){
      return {
        cartList: [],
        sum: 0,
        item: []
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
      },
      showConfirm(item){
        this.item = item;
        this.$refs.confirm && this.$refs.confirm.show();
      },
      remove(){
        if(this.$refs.detail){
          this.$refs.detail.deleteFlag = true;
          this.$refs.detail.deleteItem(this.item);
        }
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
    height: 100%;
  }

  .bottom{
    position: fixed;
    left: 0;
    bottom: 50px;
    border-bottom: 1px solid $border-color;
  }
</style>
