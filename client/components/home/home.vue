<template>
  <div>
    <tab></tab>
    <scroll class="home">
      <div>
        <div class="func-list" v-on:click="toWeather">
          <div class="func-pic">
            <img src="~common/image/doc.png" height="32px" width="32px;">
          </div>
          <div class="func-text">
            <p class="text">天气</p>
          </div>
        </div>

        <div class="func-list">
          <div class="func-pic">
            <img src="~common/image/jpg.png" height="32px" width="32px;">
          </div>
          <div class="func-text">
            <p class="text">车票</p>
          </div>
        </div>

        <div class="func-list">
          <div class="func-pic">
            <img src="~common/image/html.png" height="32px" width="32px;">
          </div>
          <div class="func-text">
            <p class="text">每日一图</p>
          </div>
        </div>

        <div class="func-list" v-on:click="toExpress">
          <div class="func-pic">
            <img src="~common/image/pdf.png" height="32px" width="32px;">
          </div>
          <div class="func-text">
            <p class="text">快递</p>
          </div>
        </div>

        <div class="func-list">
          <div class="func-pic">
            <img src="~common/image/mp3.png" height="32px" width="32px;">
          </div>
          <div class="func-text">
            <p class="text">新闻</p>
          </div>
        </div>
      </div>
    </scroll>
    <transition name="slide">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'
  import Scroll from 'base/scroll/scroll'
  import {Mixin} from 'common/js/mixin'
  export default {
    mixins: [Mixin],
    components: {
      Tab,
      Scroll
    },
    methods: {
      toWeather() {
        this.$router.push('home/weather')
      },
      toExpress() {
        this.$router.push('home/express')
      }
    }
  }
</script>

<style scoped>
  .home {
    position: fixed;
    z-index: -1;
    top: 58px;
    left: 0;
    bottom: 58px;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .func-list {
    display: flex;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .func-pic {
    margin-left: 10px;
    margin-top: 12px;
    flex: 1;
  }
  .func-text {
    flex: 7;
  }
  .text {
    line-height: 60px;
    font-size: 18px;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
