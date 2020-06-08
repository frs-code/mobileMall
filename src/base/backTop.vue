<template>
  <div>
    <transition class="me-backTop">
      <div class="backTop" @click="backToTop" v-show="visible">
        <i class="iconfont icon-fanhuidingbu"></i>
      </div>
    </transition>

  </div>
</template>

<script>
  export default {
    name: 'backTop',
    methods:{
      backToTop(){
        this.$emit('backTop');
      }
    },
    props:{
      visible: Boolean,
      default: false
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .backTop{
    overflow: hidden;
    @include flex-center();
    width: 45px;
    height:45px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
  }

  .iconfont{
    color: #ffffff;
    font-size: 38px;
  }

  .me-backTop{
    &-enter-active, &-leave-active{
      transition: opacity 0.4s;
    }

    &-enter, &-leave-to{
      opacity: 0;
    }
  }
</style>
