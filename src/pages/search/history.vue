<template>
  <div class="history" v-if="historyArr.length">
    <h4 class="history-title">历史搜索</h4>
    <ul class="history-list">
      <li class="history-item" v-for="(item, index) in historyArr"
          @click="search(item)" :key="index">
        <span class="list-text">{{item}}</span>
        <i class="iconfont icon-shanchu" @click.stop="removeItem(item)"></i>
      </li>
      <li class="history-btn" @click="showConfirm">
        <i class="iconfont icon-lajitong"></i>
        清空历史搜索
      </li>
    </ul>
  </div>
</template>

<script>
  import {selectItem} from '@/api/mixins';
  import storage from "@/assets/js/storage";
  import {SEARCH_HISTORY_KEYWORD_KEY} from "./config";

  export default {
    name: 'SearchHistory',
    data(){
      return{
        historyArr: []
      }
    },
    props:{
      selectItem:{
        type: Function
      }
    },
    created(){
      this.getHistoryVal();
    },
    methods:{
      getHistoryVal(){
        this.historyArr = storage.get(SEARCH_HISTORY_KEYWORD_KEY,[]);
        this.$emit('loaded');
      },
      removeItem(item){
        this.historyArr = this.historyArr.filter(val => val != item);
        storage.set(SEARCH_HISTORY_KEYWORD_KEY, this.historyArr);
        //动画加载时间是100ms,所以更新滚动条也有100ms的延迟
        setTimeout(()=>{
          this.$emit('removeItem');
        },100)

      },
      search(item){
        selectItem(item);
      },
      showConfirm(){
        this.$emit('showConfirm');
      },
      clear(){
        storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
        this.getHistoryVal();
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
  .history{
    width: 100%;
    padding-bottom: 30px;
    background-color: white;
    overflow: auto;
    &-title {
      height: 34px;
      line-height: 34px;
      padding: 0 8px;
      font-size: $font-size-l;
      font-weight: bold;
    }

    &-list{
      border-top: 1px solid $border-color;
      margin-bottom: 8px;

      &:after{
        content: '';
        display: block;
        width: 100%;
        height: 100px;
      }
    }

    &-item{
      width: 100%;
      height: 34px;
      line-height: 34px;
      border-bottom: 1px solid $border-color;
      font-size: $font-size-l;
      padding-left: 8px;
    }

    .list-text{
      display: inline-block;
      width: 90%;
    }

    .iconfont{
      margin-right: 8px;
    }

    &-btn{
      height: 34px;
      margin: 8px 30px 0;
      border: 1px solid $border-color;
      border-radius: 8px;
      text-align: center;
      line-height: 34px;
      font-size: $font-size-l;
      background-color: #cccccc;

    }
  }


</style>
