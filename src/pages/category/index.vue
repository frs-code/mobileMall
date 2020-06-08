<template>
  <div class="category">
    <category-header></category-header>
    <div class="g-content-container">
      <div class="slide-bar">
        <category-tab class="slide-bar" :index="index" @chooseTab="chooseTab"></category-tab>
      </div>
      <div class="main">
        <category-content @pre="pre" @next="next" :length="tabLength" :curId="curId" :index="index"></category-content>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryHeader from './header';
  import CategoryTab from  './tab';
  import CategoryContent from './content';
  export default {
    name: 'Category',
    components:{
      CategoryHeader,
      CategoryTab,
      CategoryContent
    },
    data(){
      return{
        curId: '',
        index: 0,
        tabLength: 0
      }
    },
    methods:{
      chooseTab(id, index, length) {
        this.curId = id;
        this.index = index;
        this.tabLength = length;
      },
      next(index){
        this.index = index;
      },
      pre(index){
        this.index = index;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .g-content-container{
    width: 100%;
    height: 100%;
    display: flex;
  }

  .slide-bar{
    width: 80px;
    height: 100%;
  }

  .main{
    flex-grow: 1;
    height: 100%;
  }
</style>
