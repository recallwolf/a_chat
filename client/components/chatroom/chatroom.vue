<template>
  <transition name="slide">
    <div class="chatroom">
      <div class="headers">
        <span v-on:click="back" class="icon-pos icon-back"></span>
      </div>
      <div class="footer">
        <input class="input" type="text" v-model="message">
        <div class="input-icon">
          <span class="icon-happy"></span>
          <transition name="display">
            <span class="icon-plus" v-show="!message"></span>
          </transition>
          <transition name="display">
            <span class="icon-envelope" v-show="message"></span>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        message: '',
        showBtn: false
      }
    },
    methods: {
      back() {
        this.$router.push('/chat');
      }
    }
  }
</script>

<style scoped>
  .chatroom {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .headers {
    position: absolute;
    display: flex;
    top: 0px;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.8);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .icon-pos {
    color: rgb(255,255,255);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    margin-left: 10px;
  }
  .footer {
    display: flex;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 55px;
    background-color: rgb(248,248,255);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .input {
    flex: 3;
    position: relative;
    top: 10px;
    left: 10px;
    width: 70%;
    height: 30px;
    font-size: 16px;
    border: 1px solid rgba(194, 217, 240, 0.6);
    outline: none;
  }
  .input-icon {
    flex: 1;
    position: relative;
    line-height: 60px;
    font-size: 25px;
    left: 20px;
    color: rgba(7,17,27,0.8);
  }
  .display-enter-active, .display-active-active {
    opacity: 1;
    transition-duration: 0.5s;
    transition-delay: 0.1s;
  }
  .display-enter, .display-leave {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>