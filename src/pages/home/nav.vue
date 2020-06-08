<template>
  <div class="nav">
   <ul class="nav-list">
     <li class="nav-item" v-for="(item,index) in navList" :key="index">
       <a :href="item.linkUrl" class="nav-link">
         <img :src="item.picUrl" alt="pic-img" class="nav-pic">
         <span>{{item.text}}</span>
       </a>
     </li>
   </ul>
  </div>
</template>

<script>
  import {navList} from "./config";

  export default {
    name:'homeNav',
    data(){
      return{
        navList
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .nav{
    width: 100%;
    padding-top: 8px;
    background-color: white;

    &-list{
      display: flex;
      flex-wrap: wrap;
    }

    &-item{
      width: 20%;
      margin-bottom: 8px;
    }

    &-link{
      @include flex-center(column);
    }

    &-pic{
      width: 50%;
      margin-bottom: 8px;
    }
  }

</style>
