<template>
  <div class="search">
    <search-header @query="getQuery"></search-header>
    <me-scroll class="search-wrapper" ref="scroll">
      <search-hot ></search-hot>
      <search-history ref="searchHistory" v-show="!query"
       @removeItem="updateScroll"               @showConfirm="showConfirm"></search-history>
      <search-result :query="query" @resultLoaded="updateScroll" v-show="query"></search-result>
    </me-scroll>
    <me-confirm ref="confirm" msg="确定要清空吗？" @confirm="clearSearchHistory"></me-confirm>
  </div>
</template>

<script>
  import SearchHeader from './header';
  import SearchHot from './hot';
  import SearchHistory from './history';
  import MeConfirm from '@/base/confirm';
  import SearchResult from './result';
  import MeScroll from '@/base/scroll';
  export default {
    name: 'Search',
    components: {
      SearchHeader,
      SearchHot,
      SearchHistory,
      MeConfirm,
      SearchResult,
      MeScroll
    },
    data(){
      return{
        query: ''
      }
    },
    watch:{
      query(query){
        this.getQuery(query);
      }
    },
    methods:{
      showConfirm() {
        this.$refs.confirm && this.$refs.confirm.show();
      },
      clearSearchHistory(){
       this.$refs.searchHistory && this.$refs.searchHistory.clear();
      },
      getQuery(query){
        this.query = query;
      },
      updateScroll(){
        this.$refs.scroll && this.$refs.scroll.update();
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search{
    width: 100%;
    height: 100%;
  }
  .search-wrapper{
    width: 100%;
    height: 90%;
  }
</style>
