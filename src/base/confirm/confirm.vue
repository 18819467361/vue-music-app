<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click="hide">
      <div class="confirm-wrapper">
        <div class="confirm-content content-box">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>
<style scoped>
  .confirm{
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index: 998;
    background-color: rgba(255, 255, 255, 0.35);
  }
  .confirm-fade-enter-active{
    animation: confirm-fadein .3s;
  }
  .confirm-fade-enter-active .content-box{
    animation: confirm-zoom .3s;
  }
  .confirm-wrapper{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  .confirm-content {
    width:270px;
    border-radius: 13px;
    background-color: #9c9c9c;
  }
  .text {
    padding:19px 15px;
    line-height: 22px;
    text-align: center;
    font-size: 18px;
    color: #3f3f3f;
  }
  .operate{
    display: flex;
    align-items:center;
    text-align: center;
    font-size: 18px;
    color: #3f3f3f;
  }
  .operate-btn {
    flex:1;
    line-height: 22px;
    padding:10px 0;
    border-top: 1px solid #d9d9d9;
  }
  .left{

  }
  @keyframes confirm-fadein {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes confirm-zoom {
    0%{
      transform: scale(0);
    }
    50%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }
</style>
