<template>
  <div class="daily" >
    <div class="bg" ref="bg">
      <div class="mask">
        <span class="icon-back-pos icon-back" v-on:click="back"></span>
        <div class="bottom">
          <p class="text">{{text}}</p>
          <a  class="icon-pos" v-bind:href="imageUrl" download="image.jpg">
            <span class="icon-download-pos icon-download" ></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getImage, getText} from 'api/daily'
  export default {
    data() {
      return {
        imageUrl: '',
        text: ''
      }
    },
    created() {
      this._getImage()
      this._getText()
    },
    methods: {
      _getImage() {
        getImage().then((res) => {
          this.imageUrl = res.data.url
          this.$refs.bg.style.backgroundImage = `url(${this.imageUrl})`
        })
      },
      _getText() {
        getText().then((res) => {
          this.text = res.data.hp_content
        })
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .daily {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(7, 17, 27);
    width: 100%;
    height: 100%;
  }
  .bg {
    width: 100%;
    height: 100%;
  }
  .mask {
    position:absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(7, 17, 27, 0.3);
  }
  .icon-back-pos {
    color: rgba(255,255,255, 0.8);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    margin-left: 10px;
  }
  .bottom {
    display: flex;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100px;
    background-color: rgba(7, 17, 27, 0.4);
    border-top: 0.5px solid rgba(194, 217, 240, 0.3);
  }
  .text {
    flex: 1;
    padding-top: 15px;
    padding-left: 20px;
    font-size: 18px;
    line-height: 24px;
    color: rgba(194, 217, 240, 0.8)
  }
  .icon-pos {
    width: 80px;
  }
  .icon-download-pos {
    position: relative;
    top: 22px;
    right: 20px;
    float: right;
    font-size: 40px;
    font-weight: 700;
    color: rgba(194, 217, 240, 0.7);
  }
</style>
