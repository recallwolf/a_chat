<template>
  <div class="calendar">
    <div class="header">
      <span class="time">选择出发日期</span>
    </div>
    <div class="calendar-box">
      <ul class="week">
        <li class="week-text">日</li>
        <li class="week-text">一</li>
        <li class="week-text">二</li>
        <li class="week-text">三</li>
        <li class="week-text">四</li>
        <li class="week-text">五</li>
        <li class="week-text">六</li>
      </ul>
      <div class="current">
        <span class="icon-back-pos icon-back" v-on:click="last"></span>
        <p class="current-day">{{currentDay}}</p>
        <span class="icon-forward-pos icon-back" v-on:click="next"></span>
      </div>
      <ul class="day-box">
        <li v-for="(day, index) in days" 
            v-bind:key="index" class="day-text"
            v-on:click="uploadDate(index)"
            v-bind:class="{'day-color': isCurrent[index]}">{{day}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        days: [],
        isCurrent: [],
        today: [],
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      }
    },
    computed: {
      currentDay() {
        return `${this.year}年${this.month + 1}月`
      }
    },
    created() {
      this._initDate()
    },
    watch: {
      month() {
        this._initDate()
      }
    },
    methods: {
      ...mapMutations({
        setTime: 'SET_TIME'
      }),
      uploadDate(index) {
        let firstDay = new Date()
        firstDay.setDate(1) 
        firstDay.setMonth(this.month) 
        let beforeEl = firstDay.getDay()
        if (index >= beforeEl) {
          this.setTime(`${this.year}-${this.month + 1}-${index - beforeEl + 1}`)
          this.$router.back()
        }
      },
      next() {
        if (this.month >= 0 && this.month <= 10) {
          this.month = this.month + 1
        }
        else {
          this.month = 0
          this.year = this.year + 1
        }
      },
      last() {
        if (this.month > 0) {
          this.month = this.month - 1
        }
        else {
          this.year = this.year - 1
          this.month = 11
        }
      },
      _initDate() {
        //月份 0 - 11  星期 0 - 6
        this.days = []
        let firstDay = new Date() //初始化日期
        firstDay.setDate(1) //设置当月第一天
        firstDay.setFullYear(this.year)
        firstDay.setMonth(this.month) //设置当月
        let index = firstDay.getDay() //获取当月第一天星期

        //如果之前星期存在 上月日期填充
        if (index >= 1) {
          let lastMonthDay
          if (this.month === 0) {
            lastMonthDay = new Date(this.year - 1, this.month, 0).getDate()
          }
          else {
            lastMonthDay = new Date(this.year, this.month, 0).getDate()
          }
          
          for (let i = 0; i < index; i++) {
            this.days[index- i -1] = lastMonthDay - i
            this.isCurrent[index- i- 1] = true
          }
        }

        //本月
        let day = new Date(this.year, this.month + 1, 0).getDate() //获取本月天数
        for (let i = 0; i < day; i++) {
          this.days[index] = i + 1
          this.isCurrent[index] = false
          index++
        }
      }
    }
  }
</script>


<style scoped>
  .calendar {
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
    height: 60px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    text-align: center;
  }
  .time {
    line-height: 60px;
    font-size: 20px;
  }
  .calendar-box {
    position: relative;
    top: 1px;
  }
  .week {
    width: 100%;
    display: flex;
    text-align: center;
    background-color: rgb(9,159,222);
  }
  .week-text {
    flex: 1;
    height: 45px;
    line-height: 45px;
  }
  .current {
    height: 45px;
    display: flex;
    text-align: center;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .icon-back-pos {
    width: 45px;
    line-height: 45px;
    font-size: 20px;
    font-weight: 900;
  }
  .current-day {  
    flex: 1;
    line-height: 45px;
    font-size: 18px;
  }
  .icon-forward-pos {
    width: 45px;
    line-height: 45px;
    font-size: 20px;
    font-weight: 900;
    transform: rotate(-180deg);
  }
  .day-box {
    width: 100%;
    display: flex;
    text-align: center;
    flex-flow: wrap;
  }
  .day-text {
    width: 14.28%;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    background-color: rgb(223,223,223);
  }
  .day-color {
    background-color: rgb(255,255,255);
    color: rgba(7,17,27,0.4);
  }
  .today {
    background-color: rgb(9,159,222)!important;
  }
</style>