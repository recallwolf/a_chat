<template>
  <div class="weather">
    <div class="bg">
      <div class="mask">
        <span class="icon-back-pos icon-back" v-on:click="back"></span>
        <div class="content">
          <p class="temp">23<span class="unit">℃</span></p>
          <p class="date">2018-05-28</p>
          <span class="icon-sun-pos icon-sun"></span>
          <span class="temp-text">晴</span>
          <p class="city"><span class="icon-placeholder"></span> 长沙</p>
        </div>
        <div class="tab">
          <div class="left">
            <p class="day">今天</p>
          </div>
          <div class="middle">
            <p class="day">明天</p>
          </div>
          <div class="right">
            <p class="day">后天</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .weather {
    position: fixed;
    z-index: 1;
    top: 0px;
    left: 0;
    bottom: 0px;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .bg {
    position:absolute;
    height: 100%;
    width: 100%;
    background-image: url('~common/image/weatherBg.jpg');
    background-position: top;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: cover;
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
  .content {
    position: relative;
    left: 20px;
  }
  .temp {
    font-size: 150px;
    font-weight: 200;
    color: rgba(255,255,255, 0.8);
  }
  .unit {
    font-size: 40px;
    font-weight: 200;
    color: rgba(255,255,255, 0.8);
  }
  .date {
    position: relative;
    top: 10px;
    left: 12px;
    font-size: 20px;
    font-weight: 300;
    color: rgba(255,255,255, 0.8);
  }
  .icon-sun-pos {
    position: relative;
    top: 30px;
    left: 8px;
    font-size: 35px;
    color: rgba(255,255,255, 0.8);
  }
  .temp-text {
    position: relative;
    top: 24px;
    left: 10px;
    font-size: 20px;
    color: rgba(255,255,255, 0.8);
  }
  .city {
    position: relative;
    top: 50px;
    left: 13px;
    font-size: 22px;
    color: rgba(255,255,255, 0.8);
  }
  .tab {
    display: flex;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100px;
    background-color: rgba(7, 17, 27, 0.4);
    border-top: 0.5px solid rgba(194, 217, 240, 0.3);
  }
  .left {
    flex: 1;
  }
  .middle {
    flex: 1;
    border-left: 0.5px solid rgba(194, 217, 240, 0.3);
    border-right: 0.5px solid rgba(194, 217, 240, 0.3);
  }
  .right {
    flex: 1;
  }
  .day {
    position: relative;
    top: 10px;
    text-align: center;
    font-size: 18px;
    color: rgba(194, 217, 240, 0.7);
  }
</style>

