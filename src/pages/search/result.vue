<template>
  <div class="result">
    <div class="loading-container" v-show="loadingVisible">
      <me-loading inline></me-loading>
    </div>
   <h4 class="result-header" v-show="!loadingVisible">搜索结果</h4>
    <ul class="result-list" v-show="!loadingVisible && result.length">
      <li class="result-item" v-for="(item, index) in result"
          :key="index" @click="search(item[0])">
        <span class="result-text" v-html="item[0]"></span>
      </li>
    </ul>
    <div class="no-result" v-show="!loadingVisible && !result.length">没有结果</div>
  </div>
</template>

<script>
  import MeLoading from '@/base/loading';
  import {selectItem} from "@/api/mixins";
  import {getSearchResult} from '@/api/search';
  export default {
    name: 'SearchResult',
    components:{
      MeLoading
    },
    data(){
      return{
        result: [],
        loadingVisible: false
      }
    },
    props:{
      query: {
        type: String,
        default: ''
      }
    },
    watch: {
      query(query){
        this.getResults(query);
      }
    },
    methods:{
      getResults(keyWord){
        if(!keyWord){
          return;
        }
        this.loadingVisible = true;
        getSearchResult(keyWord).then(data =>{
          if(data){
            this.result = data;
            console.log(data);
            setTimeout(()=>{
              this.loadingVisible = false;
              this.$emit('resultLoaded');
            },100);
          }
        });
      },
      search(item){
        selectItem(item);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .result{
    width: 100%;
    background-color: white;

    &-header{
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: $font-size-l;
    }

    &-list{
      padding-left: 8px;

      &:after{
        content: '';
        display: block;
        width: 100%;
        height: 100px;
      }
    }

    &-item{
      @include flex-between();
      overflow: hidden;
      height: 44px;
      padding-right: 8px;
      border-bottom: 1px solid $border-color;
      color: #686868;

      &:last-child{
        border-bottom: none;
      }
    }

    &-text{
      flex-grow: 1;
      line-height: 1.5;
      @include ellipsis();
    }
  }

  .no-result{
    @include flex-between();
    overflow: hidden;
    height: 44px;
    padding: 8px;
    color: #686868;
  }
</style>
