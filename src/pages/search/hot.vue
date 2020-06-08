<template>
  <div class="hot">
    <h4 class="hot-title">热门搜索</h4>
    <div class="loading-container" v-if="!hotArr.length">
      <me-loading></me-loading>
    </div>
    <ul class="hot-list" v-else>
      <li class="hot-item" v-for="(item, index) in hotArr"
          :key="index" @click="search(item.hotWord)">
        {{item.hotWord}}
      </li>
    </ul>
  </div>
</template>

<script>
  import MeLoading from '@/base/loading';
  import {getHot} from '@/api/search';
  import {selectItem} from '@/api/mixins';
  export default {
    name: 'SearchHot',
    components:{
      MeLoading
    },
    data(){
      return {
        hotArr: []
      }
    },
    props:{
      selectItem:{
        type: Function
      }
    },
    methods:{
     getHot(){
       return getHot().then(data => {
         return new Promise(resolve => {
           if(data){
             this.hotArr = data;
             resolve();
           }
         })
       })
     },
      search(item){
        selectItem(item);
      }
  },
    created(){
      this.getHot().then(()=>{
        this.$emit('loaded');
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .hot{
    width: 100%;
    padding-left: 8px;
    background-color: white;
    border-bottom: 1px solid $border-color;
    margin-bottom: 8px;
    overflow: auto;

    &-title{
      width: 100%;
      height: 34px;
      line-height: 34px;
      font-size: $font-size-l;
      font-weight: bold;
      border-bottom: 1px solid $border-color;
    }

    &-list{
      display: flex;
      flex-wrap: wrap;
      padding-top: 8px;
    }

    &-item{
      padding: 8px;
      background-color: #cccccc;
      border-radius: 8px;
      margin: 0 8px 8px 0;
      color: #686868;
      font-size: $font-size-l;
    }

    .loading-container{
      padding-top: 8px;
    }
  }
</style>
