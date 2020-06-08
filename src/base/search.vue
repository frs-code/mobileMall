<template>
  <div class="me-search-box-wrapper">
    <i class="iconfont icon-search" @click="search(query)"></i>
    <div class="me-search-box" v-if="flag">
      {{placeholder}}
    </div>
    <input type="text" class="me-search-box" title="搜索框"
           :placeholder="placeholder" ref="input" v-model="query" v-if="!flag">
    <i class="iconfont icon-guanbi" v-show="query" @click="reset"></i>
    <span class="search" v-show="query" @click="search(query)">搜索</span>
  </div>
</template>

<script>
  import {debounce} from "@/assets/js/util";
  import {selectItem} from "@/api/mixins";

  export default {
    name: 'MeSearch',
    props:{
      placeholder: {
        type: String,
        default() {
          return '请输入搜索的内容';
        }
      },
      flag: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        query: ''
      }
    },
    watch:{
      query: debounce(function () {
        this.$emit('query', this.query);
      },500)
    },
    methods: {
      focus(){
        this.$refs.input && this.$refs.input.focus();
      },
      clear(){
        this.query = '';
      },
      reset(){
        this.clear();
        this.focus();
      },
      search(query){
        let item = query.trim();
        if(item !== '')
        {
          selectItem(item);
        }else{
          alert('搜索内容不能为空');
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .me-search-box-wrapper{
    width: 95%;
    height: $search-box-height;
    @include flex-center();
    padding: 0 8px;
    background-color: white;
    border-radius: $search-box-height/2;
    margin: 0 8px;
  }

  .iconfont{
    color: $icon-color;
    font-size: $icon-font-size-sm;
    font-weight: bold;
  }

  .me-search-box{
    flex: 1;
    background: none;
    border: none;
    margin: 0 8px;
    color: #666666;
    line-height: 1.5;
  }

  .search{
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: $icon-color;
    color: #686868;
    font-size: $font-size-l;
    font-weight: bold;
    text-align: center;
    line-height: 20px;
    border-radius: 5px;
    margin-right: 8px;

  }
</style>
