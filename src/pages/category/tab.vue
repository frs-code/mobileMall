<template>
  <div class="category-tab">
    <ul class="tab">
      <li class="tab-item" :class="{'tab-item-active':item.id===curId}"
          @click="chooseTab(item.id, index)" v-for="(item, index) in tabArr"
          :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  // import MeScroll from '@/base/scroll';
  import {categoryNames} from './config';
  export default {
    name: 'CategoryTab',
    // components:{
    //   MeScroll
    // },
    data(){
      return{
        tabArr: categoryNames,
        curId: '',
        length: 37
      }
    },
    props:{
      index: {
        type: Number,
        default: 0
      }
    },
    watch:{
      index(index){
        this.chooseTab(this.tabArr[index].id, index);
      }
    },
    methods:{
      chooseTab(id, index){
        this.curId=id;
        this.$emit("chooseTab", id, index, this.length);//派发事件，传递id
      }
    },
    created(){
      this.chooseTab(this.tabArr[0].id);
      this.length = this.tabArr.length;
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .category-tab{
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .tab{
    width: 100%;

    &:after{
      content: '';
      display: block;
      width: 100%;
      height: 46px;
    }
    &-item{
      width: 80px;
      height: 46px;
      background-color: white;
      line-height: 46px;
      font-size: $font-size-l;
      font-weight: bold;
      color: #080808;
      text-align: center;
      border-bottom: 1px solid $border-color;
      border-right: 1px solid $border-color;
      @include ellipsis();
      &:last-child{
        border-bottom: none;
      }
    }

    &-item-active{
      color: #e61414;
      border-right: none;
      background: none;
    }
  }
</style>
