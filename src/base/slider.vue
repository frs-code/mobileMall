<template>
  <swiper :options="swiperOptions" :key="keyId">
   <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import {Swiper} from 'vue-awesome-swiper';
  export default {
    name:'MeSlider',
    components:{
      Swiper
    },
    props:{
      direction:{
        type: String,
        default: 'horizontal',
        validator(value){
          return [
            'horizontal',
            'vertical'
          ].indexOf(value) > -1;
        }
      },
      interval: {
        type: Number,
        default: 1000,
        validator(value) {
          return value >0;
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Boolean,
        default: true
      },
      data:{
        type: Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return{
        keyId: Math.random(),
        swiperOptions:{
          watchOverflow: true,//只有一个slide,swiper会失效
          direction: this.direction,
          autoplay: this.interval ?{
            delay: this.interval,
            disableOnInteraction: false
          } : false,
          sliderPreView: 1, //设置slider容器能够同时显示的slider数量
          loop:  this.data.length <= 1 ? false : this.loop,
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        }
      }
    },
    watch:{
      data(newData){
        if(newData.length === 0){
          return;
        }
        this.swiperOptions.loop = newData.length <= 1 ? false : this.loop;
        this.keyId = Math.random();
      }

    }
  }
</script>

<style lang="scss" scoped>
  .swiper-container{
    width: 100%;
    height: 100%;
  }
</style>
