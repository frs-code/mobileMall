<template>
  <div class="detail">
    <ul class="cart-list">
      <li class="cart-item" v-for="(item, index) in  getCartList" :key="index">
        <div class="select-circle" :class="{selected:item.isSelect}" @click.stop="select(item)"></div>
        <div class="cart-img">
          <img v-lazy="item.picUrl" alt="img">
        </div>
        <div class="cart-container">
          <div class="cart-name">{{item.info}}</div>
          <div class="cart-info">
            <div class="cart-sold">已销售{{item.count}}</div>
            <div class="cart-count">
              <div class="cart-price">￥{{item.price}}</div>
              <div class="cart-numberControl">
                <div class="cart-btn" @click="delNum(item,index)">-</div>
                <input type="text" ref="number" v-model="item.number" readonly class="cart-number">
                <div class="cart-btn" @click="addNum(item,index)">+</div>
              </div>
            </div>
          </div>
        </div>
        <div class="delete" @click="deleteItem(item)">
          <i class="iconfont icon-shanchu"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import storage from "@/assets/js/storage";
  export default {
    name: "detail",
    props:{
      cartList:{
        type: Array
      }
    },
    data(){
      return{
        cartArr: [],
        sum: 0,
        allSelected: false
      }
    },
    watch:{
      cartList(val){
        this.cartArr = val;
      },
      sum(val){
        this.$emit('total',val);
      }
    },
    computed:{
      getCartList:{
        get:function () {
          return this.cartArr;
        }
      },
      getSum:{
        get: function () {
          return this.sum;
        }
      }
    },
    methods:{
      select(item){
        if(this.allSelected){
          item.isSelect = true
        }
        item.isSelect = !item.isSelect;
        if(item.isSelect === true){
          this.sum = Number(this.sum )+ Number((item.price * item.number));
          this.sum = this.floor(this.sum);
        }else{
          this.sum = this.sum - (item.price * item.number);
          this.sum = this.floor(this.sum);
        }
        console.log(this.sum,item.isSelect);
      },
      deleteItem(item){
        item.isSelect = false;
        this.cartArr = this.cartArr.filter(val => val!=item);
        storage.set('cart',this.cartArr);
      },
      delNum(item,index){
        item.number--;
        if(item.isSelect === true){
          if(item.number > 0){
            this.sum = this.sum - item.price;
            this.sum = this.floor(this.sum);
          }
        }
        if(item.number <= 1){
          item.number = 1;
        }
        console.log(this.sum,item.isSelect,item.number);
      },
      addNum(item,index){
        item.number++;
        if(item.isSelect === true){
          this.sum = Number(this.sum) + Number(item.price);
          this.sum = this.floor(this.sum);
        }
        console.log(this.sum,item.isSelect);
      },
      floor(val){
        return Math.floor(val * 100) / 100
      }
    },
    created(){
      this.cartArr = this.cartList;
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .detail{
    width: 100%;
    overflow: auto;
  }

  .cart-item{
    margin-bottom: 2px;
    padding: 8px;
    @include flex-between();
    background-color: rgba(255, 0, 0, 0.12);
  }

  .select-circle{
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    margin-right: 8px;
    border: 1px solid black;
  }

  .selected{
    background-color: red;
  }

  .cart-img{
    width: 20%;
    margin-right: 8px;
    img{
      width: 100%;
    }
  }

  .cart-container{
    flex: 1;
  }

  .cart-name{
    @include multiline-ellipsis();
  }

  .cart-info{
    margin-top: 8px;
  }

  .cart-sold{
    padding-bottom: 8px;
  }

  .cart-count{
    display: flex;
  }

  .cart-price{
    flex: 1;
    font-size: $font-size-l;
    color: red;
  }

  .cart-numberControl{
    display: flex;
  }

  .cart-btn{
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    border-radius: 5px;
    text-align: center;
    line-height: 20px;
    font-size: $font-size-l;
  }

  .cart-number{
    width: 30px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    text-align: center;
    line-height: 20px;
  }

  .delete{
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    border:1px solid $border-color;
    text-align: center;
    line-height: 20px;
    color: red;
  }

</style>
