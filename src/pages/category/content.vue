<template>
  <div class="category-content">
    <div class="loading" v-if="isLoading">
      <me-loading></me-loading>
    </div>
    <scroll ref="scroll" :pullDown="pullDownFlag" :pullUp="pullUpFlag" @next="pullUp" @pre="pullRefresh"
            preText="切换到上一类"  nextText="切换到下一类" @scrollEnd="scrollEnd" v-else>
      <div class="content">
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img @load="updateScroll" :src="content.banner.picUrl" alt="img" class="pic-img">
          </a>
        </div>
        <div class="section" v-for="(section, index) in content.data" :key="index">
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li class="section-item" v-for="(item, i) in section.itemList" :key="i">
              <a :href="item.linkUrl" class="section-link">
                <div class="section-pic">
                  <img v-lazy="item.picUrl" alt="" class="section-img">
                </div>
                <div class="section-name">{{item.name}}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="g-backtop-container">
      <back-top :visible="backTopVisible" @backTop="backTop"></back-top>
    </div>
  </div>
</template>

<script>
  import MeLoading from '@/base/loading';
  import Scroll from '@/base/scroll';
  import BackTop from '@/base/backTop';
  import storage from '@/assets/js/storage.js';
  import {CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME} from "./config";
  import {getCategory} from "@/api/category";
  export default {
    name: 'CategoryContent',
    components:{
      MeLoading,
      Scroll,
      BackTop
    },
    data(){
      return{
        isLoading: false,
        content: {},
        backTopVisible: false,
        bottomVisible: false,
        i: this.index,
        pullDownFlag: false,
        pullUpFlag: true
      }
    },
    props:{
      curId: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      length: {
        type: Number
      }
    },
    watch:{
     curId(id){
       this.isLoading = true;
         this.getContent(id).then(()=>{
           this.isLoading = false;
           this.backTop();
       })
     },
      index(index){
       this.i = index;
       if(this.i === 0){
          this.pullDownFlag = false;
       }else if(this.i === this.length-1){
         this.pullUpFlag = false
       }else{
         this.pullUpFlag = true;
         this.pullDownFlag = true;
       }
      }
    },
    methods:{
      getContent(id){
        let contents = storage.get(CATEGORY_CONTENT_KEY);
        let updateTime;
        const curTime = new Date().getTime();

        if(contents && contents[id]){
          updateTime = contents[id].updateTime || 0 ;

          if(curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME){
            //未超时
            console.log('从缓存获取');
            return this.getContentByStorage(contents[id]);
          }else{
            console.log('从服务器获取','1');
            return this.getContentByServer(id).then(()=>{
              this.updateStorage(contents, id, updateTime);//更新缓存
            });
          }
        }else{
          console.log('从服务器获取','2');
          return this.getContentByServer(id).then(()=>{
            this.updateStorage(contents, id, curTime);//更新缓存
          });
        }
      },
      getContentByStorage(content){
        this.content = content.data;
        return Promise.resolve();
      },
      getContentByServer(id){
        return getCategory(id).then(data=>{
          return new Promise(resolve =>{
            if(data){
              this.content = data.content;
              resolve();
            }
          })
        })
      },
      updateStorage(contents, id, curTime){
        contents = contents || {};
        contents[id] = {};
        contents[id].data = this.content;
        contents[id].updateTime = curTime;
        storage.set(CATEGORY_CONTENT_KEY, contents);
      },
      updateScroll() {
        this.$refs.scroll && this.$refs.scroll.update();
      },
      scrollEnd(translate, swiper, pullFlag){//下拉刷新结束
        //显示返回顶部按钮
        this.backTopVisible = translate< 0 && -translate > swiper.height;
      },
      backTop(){
        this.$refs.scroll && this.$refs.scroll.scrollToTop();//回到顶部
      },
      pullRefresh(end){
        if( this.i > 0){
          this.i = this.i - 1;
        }
        this.$emit('pre', this.i);
      },
      pullUp(){
        if( this.i < this.length -1){
          this.i = this.i + 1;
        }
        this.$emit('next', this.i);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .category-content{
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
  }

  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .g-backtop-container{
    position: fixed;
    z-index: $backtop-z-index;
    right: 8px;
    bottom: 50px;
  }

  .bottom{
    width: 100%;
    height: 28px;
    color: #080808;
    font-weight: bold;
    font-size: $font-size-l;
    position: relative;
    left: 0;
    bottom: 0;
    padding-top: 50px;
    text-align: center;

    &:before, &:after{
      content:'';
      position: absolute;
      width: 40%;
      height: 1px;
      background-color: #dddddd;
      top: 50%;
    }

    &:before{
      left: 0;
    }

    &:after{
      right: 0;
    }
  }

  .content{
    width: 100%;
    height: 100%;

    &:after{
      content: '';
      display: block;
      width: 100%;
      height: 60px;
    }
  }

  .pic{
    margin-bottom: 8px;

    &-link{
      display: block;
    }

    &-img{
      width: 100%;

    }
  }

  .section{
    margin-bottom: 8px;

    &:last-child{
      margin-bottom: 0;
    }

    &-title{
      width: 100%;
      height: 28px;
      color: #e61414;
      font-weight: bold;
      font-size: $font-size-l;
      position: relative;
      padding: 8px 0;
      text-align: center;

      &:before, &:after{
        content:'';
        position: absolute;
        width: 40%;
        height: 1px;
        background-color: #dddddd;
        top: 50%;
      }

      &:before{
        left: 0;
      }

      &:after{
        right: 0;
      }
    }

    &-list{
      display: flex;
      flex-wrap: wrap;
      padding: 10px 10px 0;
      background-color: white;
    }

    &-item{
      width: (100%/3);
    }

    &-link{
      display: block;
    }

    &-pic{
      position: relative;
      width: 80%;
      padding-bottom: 80%;
      margin: 0 auto;
    }

    &-img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &-name{
      width: 100%;
      text-align: center;
      @include ellipsis();
    }
  }

</style>
