<template>
  <div class="me-loading" :class="{'me-loading-inline': inline}">
    <div class="me-loading-indicator" v-if="indicator === 'on'">
      <slot><img src="./loading.gif" alt="loading"></slot>
    </div>
    <div class="me-loading-text" v-if="text">{{loadingText}}</div>
  </div>
</template>

<script>
  export default {
    name: 'MeLoading',
    props:{
      indicator:{
        type: String,
        default: 'on',
        validate(val){
          return ['on','off'].indexOf(val) > -1;
        }
      },
      text:{
        type: String,
        default: 'loading...'
      },
      inline:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        loadingText: this.text
      }
    },
    methods:{
      setText(text){
        this.loadingText = text;
      }
    },
    watch:{
      text(text){
        this.loadingText = text;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/mixins";
  .me-loading{
    overflow: hidden;
    width: 100%;
    height: 100%;
    @include flex-center(column);
    &.me-loading-inline{
     flex-direction: row;
      .me-loading-indicator ~ .me-loading-text{
        margin-top: 0;
        margin-left: 8px;
      }
    }
  }

  .me-loading-indicator ~ .me-loading-text{
    margin-top: 8px;
  }
</style>
