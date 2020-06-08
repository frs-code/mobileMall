<template>
  <div class="me-navbar">
    <div class="me-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="me-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="me-navbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <h1 class="me-navbar-title" v-if="title"><span v-text="title"></span></h1>
  </div>
</template>

<script>

  export default {
    name: 'MeNavbar',
    props: {
      title:{
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .me-navbar{
    position: relative;
    height: 50px;
    background-color: white;
    @include flex-between();

    &-left{
      margin-left: 10px;

      ~ .me-navbar-right{
        position: static;
      }
    }

    &-center{
      flex: 1;
      margin: 0 10px;

      ~ .me-navbar-right{
        position: static;
      }
    }

    &-right{
      position: absolute;
      top: 0;
      right: 0;
      @include flex-center();
      height: 100%;
      margin-right: 10px;
    }

    &-title{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      right: 20%;
      @include flex-center();
      font-size: 18px;

      span{
        @include ellipsis();
        line-height: 1.5;
        text-align: center;
      }
    }
  }

</style>
