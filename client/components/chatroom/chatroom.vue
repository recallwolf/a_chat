<template>
  <transition name="slide">
    <div class="chatroom">
      <div class="headers">
        <span v-on:click="back" class="icon-pos icon-back"></span>
      </div>
      <scroll ref="scroll" class="msg-box">
        <div>
          <div v-for="(message,index) in chatmsgs" v-bind:key="index" class="wrapper">
            <div v-bind:class="{'msg-layout-other': message.user==='robot', 'msg-layout': message.user!='robot'}">
              <div v-bind:class="{'pic-pos-other': message.user==='robot', 'pic-pos': message.user!='robot'}">
                <img src="~common/image/avatar.jpg" class="pic" v-show="message.user!='robot'">
                <img src="~common/image/cat.png" class="pic" v-show="message.user==='robot'">
              </div>
              <div v-bind:class="{'text-pos-other': message.user==='robot', 'text-pos': message.user!='robot'}">
                <p v-bind:class="{'text-user-other': message.user==='robot', 'text-user': message.user!='robot'}">{{message.user}}</p>
                <div v-bind:class="{'text-box-other': message.user==='robot', 'text-box': message.user!='robot'}">
                  <p class="text-msg">{{message.msg}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <div class="footer">
        <input class="input" type="text" v-model="message">
        <div class="input-icon">
          <span class="icon-happy"></span>
          <transition name="display">
            <span class="icon-plus" v-show="!message"></span>
          </transition>
          <transition name="display">
            <span class="icon-envelope" v-show="message" v-on:click="send"></span>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {robot} from 'api/robot'
  import Scroll from 'base/scroll/scroll'
  export default {
    data() {
      return {
        message: '',
        showBtn: false,
        chatmsgs: []
      }
    },
    watch: {
      chatmsgs() {
        this.$refs.scroll.refresh()
        setTimeout(() => {
          this.$refs.scroll.scrollTo()
        }, 20)
      }
    },
    components: {
      Scroll
    },
    methods: {
      back() {
        this.$router.push('/chat')
      },
      send() {
        if (this.message != "") {
          this.chatmsgs.push({user: 'jack', msg: this.message})
          robot(this.message).then((robotSay) => {
            this.chatmsgs.push({user: 'robot', msg: robotSay.results[0].values.text});
          })
          this.message = ""
        }
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
  .msg-box {
    margin-top: 70px;
    height: 80%;
    overflow: hidden;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .msg-layout {
    margin-bottom: 25px;
  }
  .msg-layout-other {
    margin-bottom: 35px;
    align-self: flex-end;
  }
  .pic-pos {
    display: inline-block;
    width: 45px;
    height: 45px;
    position: relative;
    left: 10px;
  }
  .pic-pos-other {
    float: right;
    width: 45px;
    height: 45px;
    position: relative;
    right: 10px;
  }
  .pic {
    width: 45px; 
    height: 45px;
    border-radius: 50%;
  }
  .text-pos {
    display: inline-block;
    vertical-align: top;
    position: relative;
    left: 20px;
    top: 5px;
  }
  .text-pos-other {
    float: right;
    position: relative;
    right: 20px;
    top: 5px;
  }
  .text-user {
    font-size: 13px;
    color: rgba(7,17,27,0.7);
  }
  .text-user-other {
    float: right;
    font-size: 13px;
    color: rgba(7,17,27,0.7);
  }
  .text-box {
    position: relative;
    top: 6px;
    max-width: 230px;
    background-color: rgb(220, 220, 220);
    padding: 8px;
    border-radius: 8px;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
  }
  .text-box-other {
    float: right;
    position: relative;
    top: 20px;
    left: 35px;
    max-width: 230px;
    background-color: rgb(220, 220, 220);
    padding: 8px;
    border-radius: 8px;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
  }
  .text-msg {
    line-height: 23px;
    font-size: 16px;
    color: rgb(7,17,27);
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