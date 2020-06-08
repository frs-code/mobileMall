<template>
  <div class="home">
    <home-header ref="header" class="g-header-container" :class="{'header-transition': isHeaderTransition}"></home-header>
    <me-scroll :info="recommendArr" pullDown pullUp
               @pullUp="pullToLoad" @pullDown="pullToRefresh"
               @pullDownTransitionEnd="pullDownTransitionEnd"
               @scrollEnd="scrollEnd" @scroll='scroll' ref="scroll">
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loaded="updateScroll" ref="recommend"></home-recommend>
    </me-scroll>

    <div class="g-backtop-container">
      <back-top @backTop="backToTop" :visible="backTopShowFlag"></back-top>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
import HomeHeader from './header';
import HomeSlider from './slider';
import MeScroll from  '@/base/scroll';
import HomeNav from './nav';
import HomeRecommend from './recommend';
import BackTop from '@/base/backTop';
  export default {
    name: 'Home',
    components:{
      HomeHeader,
      HomeSlider,
      MeScroll,
      HomeNav,
      HomeRecommend,
      BackTop
    },
    data(){
      return{
        recommendArr:[],
        backTopShowFlag: false,
        isHeaderTransition: false
      }
    },
    methods:{
      updateScroll(recommendArr){
        this.recommendArr = recommendArr;
      },
      pullToRefresh(end){
        this.$refs.slider.update().then(end);
      },
      pullToLoad(end){
        this.$refs.recommend.update().then(end).catch(err => {
          if(err){
            console.log(err);
          }
          end();
        });
      },
      backToTop() {//返回顶部
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      scroll(translate){
        this.changeHeader(translate);
      },
      scrollEnd(translate, scroll,pullFlag){//下拉刷新结束
        //显示回到顶部按钮
        this.backTopShowFlag = translate < 0 && -translate > scroll.height;//向下拉并且距离大于一屏
        //改变header
        if(!pullFlag){//解决正在下拉刷新时，translate就变为0，header就显示的问题
          this.changeHeader(translate);
        }

      },
      changeHeader(translate){//改变header
        if(translate > 0){//正在下拉，隐藏导航条
          this.$refs.header.hide();
        } else{
          this.$refs.header.show();
          this.isHeaderTransition = -translate > 200;//滑动距离大于200，改变header样式
        }
      },
      pullDownTransitionEnd(){//下拉刷新结束
        this.$refs.header.show();
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
  .home{
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
