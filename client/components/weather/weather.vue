<template>
  <div class="weather">
    <div class="bg">
      <div class="mask">
        <span class="icon-back-pos icon-back" v-on:click="back"></span>
        <loading2 class="loading" v-show="Object.keys(data).length===0"></loading2>
        <scroll class="content" v-show="Object.keys(data).length!=0">
          <div>
            <p class="temp">{{average}}<span class="unit">℃</span></p>
            <p class="date">{{data.date}}</p>
            <img v-if="this.weather[0]!=undefined" v-bind:src="imgUrl" class="weather-pic">
            <span class="temp-text">{{data.cond_txt_d}}</span>
            <p class="city"><span class="icon-placeholder"></span> {{city}}</p>
            <p class="wind">{{data.wind_dir}}</p>
          </div>
        </scroll>
        <div class="tab">
          <div class="left" v-on:click="change(0)">
            <p class="day">今天</p>
            <p class="day-date" v-if="this.weather[0]!=undefined">{{this.weather[0].cond_txt_d}}</p>
          </div>
          <div class="middle" v-on:click="change(1)">
            <p class="day">明天</p>
            <p class="day-date" v-if="this.weather[0]!=undefined">{{this.weather[1].cond_txt_d}}</p>
          </div>
          <div class="right" v-on:click="change(2)">
            <p class="day">后天</p>
            <p class="day-date" v-if="this.weather[0]!=undefined">{{this.weather[2].cond_txt_d}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getWeather} from 'api/weather'
  import Scroll from 'base/scroll/scroll'
  import Loading2 from 'base/loading/loading2'
  export default {
    data() {
      return {
        city: '',
        weather: [],
        data: {}
      }
    },
    components: {
      Scroll,
      Loading2
    },
    computed: {
      average() {
        return Math.floor((this.data.tmp_max/2 + this.data.tmp_min/2))
      },
      imgUrl() {
        return `/static/weather/${this.data.cond_code_d}.png`
      }
    },
    created() {
      this._getWeather()
    },
    methods: {
      back() {
        this.$router.back()
      },
      _getWeather() {
        getWeather().then((res) => {
          this.city = res.HeWeather6[0].basic.location
          this.weather[0] = res.HeWeather6[0].daily_forecast[0]
          this.weather[1] = res.HeWeather6[0].daily_forecast[1]
          this.weather[2] = res.HeWeather6[0].daily_forecast[2]
          this.data = this.weather[0]
        })
      },
      change(index) {
        this.data = this.weather[index]
      }
    }
  }
</script>

<style scoped>
  .weather {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
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
  .loading {
    position: relative;
    top: 35%;
  }
  .content {
    position: fixed;
    z-index: 0;
    top: 10%;
    left: 20px;
    bottom: 200px;
    right: 0;
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
  .weather-pic {
    position: relative;
    top: 30px;
    left: 8px;
    width: 35px;
    height: 35px;
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
  .wind {
    position: relative;
    top: 70px;
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
    background-color: rgba(7, 17, 27, 0.9);
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
  .day-date {
    position: relative;
    top: 30px;
    text-align: center;
    font-size: 18px;
    color: rgba(194, 217, 240, 0.7);
  }
</style>