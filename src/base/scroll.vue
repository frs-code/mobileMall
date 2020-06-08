<template>
  <swiper class="swiper" :options="swiperOptions" ref="swiper">
    <div class="pull-down" v-if="pullDown" >
      <me-loading inline :text="pullDownText" ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
    </div>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import  {Swiper, SwiperSlide} from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css';
  import MeLoading from '@/base/loading';
  export default {
    name: 'MeScroll',
    components:{
      Swiper,
      SwiperSlide,
      MeLoading
    },
    data(){
      return{
        pullFlag: false,//标志是否正在拉
        swiperOptions: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: '.swiper-scrollbar',
            hide: true, //滚动条是否自动隐藏。默认：false，不会自动隐藏。
          },
          on:{
            sliderMove: this.scroll,
            touchEnd: this.touchEnd,
            transitionEnd: this.scrollEnd
          }
        },
        pullDownText: '下拉刷新',
        pullUpText: '上拉加载更多'
      }
    },
    props:{
      info:{
        type:[Array,Object]
      },
      pullDown:{
        type: Boolean,
        default: false
      },
      pullUp:{
        type: Boolean,
        default: false
      },
      nextText:{
        type: String,
        default: '松手开始加载'
      },
      preText: {
        type: String,
        default: '下拉刷新'
      }
    },
    watch:{
      info(){
        this.update();
      },
      nextText(){
        this.scroll();
      }
    },
    methods:{
      update(){
        this.$nextTick(()=>{
          this.$refs.swiper && this.$refs.swiper.$swiper.update();
        });
      },
      scrollToTop(){
        this.$refs.swiper && this.$refs.swiper.$swiper.slideTo(0);
      },
      scrollEnd(){
        let swiper = this.$refs.swiper.$swiper;
        this.$emit('scrollEnd', swiper.translate, this.$refs.swiper.$swiper, this.pullFlag);
      },

      scroll(){
        let swiper = this.$refs.swiper.$swiper;

        this.$emit('scroll', swiper.translate, this.$refs.swiper.$swiper)

        if(this.pullFlag){//正在拉，直接返回
          return;
        }
        if(swiper.translate > 0){//下拉
          if(!this.pullDown){
            return;
          }
          if(swiper.translate > 100){
            this.$refs.pullDownLoading.setText('松手开始加载');
          }else{
            this.$refs.pullDownLoading.setText(this.preText);
          }
        } else if(swiper.isEnd){//拉到底部
          if(!this.pullUp){
            return;
          }
          //是否达到上拉的触发条件
          //swiper的位移加上swiper的高度（617px）-50px的值如果大于当前内容高度
          //swiper.translate这个属性可以获取到wrapper的位移，其实可以理解为滚动条滚动的距离
          //swiper.height这个属性获取swiper容器的高度， 也就是显示区域的高度
          //50px是我们设置的一个值。为了让页面不是到达最低部的时候，可以提前加载内容
          //parseInt(swiper.$wrapperEl.css('height'))是wrapper的HTML元素的height属性， 也就是所有内容的高度
          let totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          let isPullUp = Math.abs(swiper.translate) + swiper.height - 100 > totalHeight;
          if(isPullUp){//上拉
            this.$refs.pullUpLoading.setText(this.nextText);
          } else{
            this.$refs.pullUpLoading.setText('上拉加载更多');
          }
        }
      },
      touchEnd(){
        if(this.pullFlag){//正在拉，直接返回
          return;
        }
        let swiper = this.$refs.swiper.$swiper;
        if(swiper.translate > 0){
          if(!this.pullDown){
            return;
          }
          this.pullFlag = true;
          swiper.allowTouchMove = false; //禁止触摸
          swiper.setTransition(swiper.params.speed); //设置初始速度
          swiper.setTranslate(100); //移动到设定的位置（拖动过度时回到设置的位置）
          swiper.params.virtualTranslate = true; //定住不给回弹
          this.$refs.pullDownLoading.setText('正在刷新中...'); //设置正在刷新中的文字
          this.$emit('pullDown',this.pullDownEnd); //下拉结束，向父组件传递消息和结束下拉的函数
          this.$emit('pre');
        } else if(swiper.isEnd){//底部
          let totalHeight = parseInt(swiper.$wrapperEl.css('height'));//容器的高度
          let isPullUp = Math.abs(swiper.translate) + swiper.height - 50 > totalHeight;//swiper.translate 滑动的高度，swiper.height 可视区的高度
          if(isPullUp){
            if(!this.pullUp){
              return;
            }
            this.pullFlag = true;
            swiper.allowTouchMove = false; //禁止触摸
            swiper.setTransition(swiper.params.speed); //设置初始速度
            swiper.setTranslate(-(totalHeight + 50 - swiper.height)); //移动到设定的位置
            swiper.params.virtualTranslate = true; //定住不给回弹
            this.$refs.pullUpLoading.setText('正在加载中...'); //设置正在加载中的文字
            this.$emit('pullUp',this.pullUpEnd); //上拉加载结束，向父组件传递消息和上拉加载结束的函数
            this.$emit('next');
          }
        }
      },
      pullDownEnd(){
        let swiper = this.$refs.swiper.$swiper;
        this.pullFlag = false;
        this.$refs.pullDownLoading.setText('下拉刷新成功');
        swiper.allowTouchMove = true; //允许触摸
        swiper.params.virtualTranslate = false; //允许回弹
        swiper.setTransition(swiper.params.speed); //设置初始速度
        swiper.setTranslate(0); //移动到初始的位置
        setTimeout(()=>{
          this.$emit('pullDownTransitionEnd');
        },swiper.params.speed);
      },
      pullUpEnd(){
        let swiper = this.$refs.swiper.$swiper;
        this.pullFlag = false;
        this.$refs.pullUpLoading.setText('加载成功');
        swiper.allowTouchMove = true; //允许触摸
        swiper.params.virtualTranslate = false; //允许回弹
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper{
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  .swiper-slide{
    height: auto !important;
  }

  .pull-down{
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: 80px;
  }

  .pull-up{
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 50px;
  }
</style>
