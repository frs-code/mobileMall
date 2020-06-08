<template>
  <div class="product">
    <div class="product-container">
      <product-header></product-header>
      <detail :picUrl="product.picUrl" :price="product.price" :info="product.info"></detail>
      <addr :count="product.count"></addr>
      <version></version>
    </div>
    <bottom class="bottom" :product="product"></bottom>
  </div>
</template>

<script>
  import ProductHeader from './header'
  import Addr from './addr';
  import Detail from './detail';
  import Version from "./version";
  import Bottom from "./bottom";
  export default {
    name: 'Product',
    components: {
      Detail,
      Version,
      Addr,
      ProductHeader,
      Bottom
    },
    data(){
      return{
        product: {}
      }
    },
    methods:{

    },
    created(){
      this.product.id = this.$route.query.id;
      this.product.picUrl = this.$route.query.picUrl;
      this.product.price = this.$route.query.price;
      this.product.info = this.$route.query.info;
      this.product.count = this.$route.query.count.toString();
      this.product.number = 1;
      this.product.isSelect = false;
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .product{
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }

  .product-container{
    overflow: auto;
    height: 100%;
  }

  .bottom{
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
