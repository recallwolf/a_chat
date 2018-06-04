<template>
  <div class="railway">
    <div class="railway-box">
      <div class="header">
        <span v-on:click="back" class="icon-back-pos icon-back"></span>
      </div>
      <div class="station">
        <div class="station-box">
          <div class="start" v-on:click="toStation('start')">{{startStation.station}}</div>
          <span class="icon-exchange-pos icon-exchange" v-on:click="exchange"></span>
          <div class="end" v-on:click="toStation('end')">{{endStation.station}}</div>
        </div>
      </div>
      <div class="time" v-on:click="toCalendar">{{time}}</div>
      <div class="search" v-on:click="toTicket">查询</div>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'startStation',
        'endStation',
        'time'
      ]),
      fullContent() {
        if (this.startStation.station!='出发地' && this.endStation.station!='目的地' && this.time!='选择出发时间' && this.startStation.station!='目的地' && this.endStation.station!='出发地') {
          return true
        }
        else {
          return false
        }
      }
    },
    methods: {
      back() {
        this.$router.push('/home')
      },
      toStation(location) {
        this.$router.push({
          path: '/home/railway/station',
          query: {
            station: location
          }
        })
      },
      toCalendar() {
        this.$router.push('/home/railway/calendar')
      },
      toTicket() {
        if (this.fullContent) {
          this.$router.push('/home/railway/ticket')
        }
      },
      ...mapMutations({
        set_startStation: 'SET_START_STATION',
        set_endStation: 'SET_END_STATION',
      }),
      exchange() {
        let start = this.startStation
        let end = this.endStation
        this.set_endStation(start)
        this.set_startStation(end)
      }
    }
  }
</script>

<style scoped>
  .railway {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .railway-box {
    position: fixed;
    z-index: 1;
    top: 60px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(255,255,255);
    width: 100%;
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
    width: 100%;
  }
  .station-box {
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
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>