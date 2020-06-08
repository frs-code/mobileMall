<template>
  <transition class="me-confirm">
    <div class="me-confirm-wrapper" v-show="visible">
      <div class="me-confirm">
        <div class="me-confirm-title">{{title}}</div>
        <div class="me-confirm-msg">{{msg}}</div>
        <div class="me-confirm-btn-container">
          <div class="me-confirm-btn me-confirm-cancel" @click="cancel">{{cancelBtnText}}</div>
          <div class="me-confirm-btn me-confirm-ok" @click="confirm">{{confirmBtnText}}</div>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
  export default {
    name: 'MeConfirm',
    props: {
      title: {
        type: String,
        default: ''
      },
      msg: {
        type: String,
        default: '确定执行此操作吗？'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data(){
      return {
        visible: false
      }
    },
    methods:{
      show(){
        this.visible = true;
      },
      hide(){
        this.visible = false;
      },
      cancel(){
        this.hide();
        this.$emit('cancel');
      },
      confirm(){
        this.hide();
        this.$emit('confirm');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .me-confirm{
    &-enter-active, &-leave-active{
      transition: opacity 0.5s ease;
    }

    &-enter, &-leave-to{
      opacity: 0;
    }

    &-entet-active{
      .me-confirm{
        animation: bounce-in 0.3s;
      }
    }
  }
  @keyframes bounce-in {
    0%{
      transform: scale(0);
    }
    50%{
      transform: scale(1.2);
    }
    100%{
      transform: scale(1);
    }
  }

  .me-confirm-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: $search-popup-z-index;
    @include flex-center();
    background-color: $modal-bgc;
  }

  .me-confirm{
    overflow: hidden;
    width: 90%;
    background-color: white;
    border-radius: 8px;
    font-size: $font-size-l;

    &-title{
      padding: 20px 15px 0;

      text-align: center;
      @include ellipsis();

      & + .me-confirm-msg{
       padding: 20px 0;
      }
    }

    &-msg{
      padding: 40px 15px;
      text-align: center;
      line-height: 1.5;
    }

    &-btn-container{
      display: flex;
      width: 100%;
      flex-wrap: nowrap;
    }

    &-btn{
      width: 50%;
      flex-grow: 1;
      height: 44px;
      line-height: 44px;
      background: none;
      border: none;
      text-align: center;
    }

    &-cancel{
      border-top: 1px solid #e3e5e9;
    }

    &-ok{
      background-color: #f23030;
      color: white;
    }
  }

</style>
