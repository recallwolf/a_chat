<template>
  <div class="ticket">
    <div class="header">
      <span v-on:click="back" class="icon-back-pos icon-back"></span>
      <div class="station">
        <p class="start">{{startStation.station}}</p>
        <span class="icon-to"></span>
        <p class="end">{{endStation.station}}</p>
      </div>
    </div>
    <div class="tab">
      <div class="last">
        <span class="icon-back icon-last-pos"></span>
        <p class="last-text">前一天</p>
      </div>
      <div class="date" v-on:click="toCalendar">
        <p>{{time}}</p>
      </div>
      <div class="next">
        <p class="next-text">后一天</p>
        <span class="icon-back icon-next-pos"></span>
      </div>
    </div>
    <div class="content"></div>
    <div class="bottom">
      <p class="bottom-text">高级筛选</p>
      <p class="bottom-text">出发时间</p>
      <p class="bottom-text">旅行耗时</p>
      <p class="bottom-text">所需票价</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'startStation',
        'endStation',
        'time'
      ])
    },
    methods: {
      back() {
        this.$router.push('/home/railway')
      },
      toCalendar() {
        this.$router.push('/home/railway/calendar')
      }
    }
  }
</script>

<style scoped>
  .ticket {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .header {
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgba(7,17,27,0.1);
    background-image: url('~common/image/nav.jpg');
    text-align: center;
  }
  .icon-back-pos {
    position: absolute;
    z-index: 1;
    color: rgb(255,255,255);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    left: 10px;
  }
  .station {
    position: relative;
    top: 20px;
    font-size: 20px;
    color: rgb(255,255,255);
  }
  .start {
    display: inline-block;
  }
  .end {
    display: inline-block;
  }
  .tab {
    width: 100%;
    height: 40px;
    background-image: url('~common/image/nav.jpg');
    display: flex;
  }
  .last {
    width: 33.3%;
    height: 40px;
    position: relative;
    color: rgb(255,255,255);
  }
  .icon-last-pos {
    display: inline-block;
    line-height: 40px;
    position: relative;
    font-size: 18px;
    left: 10px;
  }
  .last-text {
    display: inline-block;
    position: absolute;
    left: 30px;
    line-height: 40px;
  }
  .date {
    margin-top: 8px;
    width: 33.3%;
    height: 25px;
    background-color: white;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
    font-size: 16px;
    color: rgb(9,159,222);
  }
  .next {
    width: 33.3%;
    height: 40px;
    flex: 1;
    color: rgb(255,255,255);
  }
  .next-text {
    display: inline-block;
    position: absolute;
    right: 30px;
    line-height: 40px;
  }
  .icon-next-pos {
    float: right;
    line-height: 40px;
    position: relative;
    font-size: 18px;
    right: 10px;
    transform: rotate(-180deg);
  }
  .bottom {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: rgba(40,56,71,.9);
  }
  .bottom-text {
    margin-top: 10px;
    text-align: center;
    flex: 1;
    height: 20px;
    color: rgba(255,255,255,0.8);
    font-size: 14px;
    line-height: 20px;
    border-right: 1px solid rgba(255,255,255,0.8);
  }
  .bottom-text:last-child {
    margin-top: 10px;
    text-align: center;
    flex: 1;
    height: 20px;
    color: rgba(255,255,255,0.8);
    font-size: 14px;
    line-height: 20px;
    border: none;
  }
</style>