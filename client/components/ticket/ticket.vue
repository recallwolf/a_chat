<template>
  <div class="ticket">
    <div class="ticket-box">
      <div class="header">
        <span v-on:click="back" class="icon-back-pos icon-back"></span>
      </div>
      <div class="station">
        <div class="start">{{startStation}}</div>
        <span class="icon-exchange-pos icon-exchange"></span>
        <div class="end">{{endStation}}</div>
      </div>
      <div class="time">{{time}}</div>
      <div class="search">查询</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        startStation: '出发地',
        endStation: '目的地',
        time: '选择出发时间'
      }
    },
    methods: {
      back() {
        this.$router.push('/home')
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
  .ticket-box {
    position: fixed;
    z-index: 1;
    top: 60px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .header {
    position: fixed;
    display: flex;
    top: 0px;
    width: 100%;
    height: 60px;
    background-image: url('~common/image/nav.jpg');
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .icon-back-pos {
    color: rgb(255,255,255);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    margin-left: 10px;
  }
  .station {
    position: relative;
    top: 15px;
    display: flex;
    width: 90%;
    margin: 0 auto;
  }
  .start {
    flex: 1;
    width: 108px;
    height: 43px;
    border-bottom: 1px solid rgb(209,209,209);
    line-height: 43px;
    font-size: 20px;
    text-align: center;
  }
  .icon-exchange-pos {
    text-align: center;
    width: 80px;
    font-size: 25px;
    line-height: 43px;
    color: rgba(7,17,27,0.5);
  }
  .end {
    flex: 1;
    width: 108px;
    height: 43px;
    border-bottom: 1px solid rgb(209,209,209);
    line-height: 43px;
    font-size: 20px;
    text-align: center;
  }
  .time {
    position: relative;
    top: 20px;
    margin: 0 auto;
    width: 90%;
    height: 40px;
    border-bottom: 1px solid rgb(209,209,209);
    font-size: 20px;
    line-height: 40px;
    text-align: center;
  }
  .search {
    position: relative;
		top: 100px;
		margin: 0 auto;
		display: block;
		width: 92%;
		height: 45px;
		border-radius: 10px;
		background-color: rgb(64,158,255);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.9);
    text-align: center;
    line-height: 45px;
  }
</style>

