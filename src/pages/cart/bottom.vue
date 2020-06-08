<template>
  <div class="bottom">
    <div class="center">
      <div class="total">合计：￥{{total}}</div>
      <div class="account">结算</div>
    </div>
    <div class="right" @click.stop="clear">清空购物车</div>
  </div>
</template>

<script>
  import storage from "@/assets/js/storage";
  export default {
    name: 'bottom',
    data() {
      return {
        checked: false,
        sum: 0
      }
    },
    props:{
      total:{
        type: Number,
        default: 0
      }
    },
    watch:{
      total(val){
        this.sum = val;
      }
    },
    methods: {
      clear(){
        storage.remove('cart');
        this.$emit('clear');
      }
    },
    created(){
      console.log(this.total);
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .bottom{
    width: 100%;
    height: 50px;
    background-color: white;
    @include flex-between();
    div{
      @include flex-center(row);
    }
  }
  .center{
    flex: 1;
  }

  .total{
    font-size: $font-size-l;
    margin-right: 4px;
  }

  .account, .right{
    width: 60px;
    height: 40px;
    background-color: orange;
    border-radius: 20px;
    color: white;
    font-size: $font-size-l+2;
    text-align: center;
    line-height: 40px;
  }

  .right{
    width: 100px;
    background-color: red;
  }

</style>
