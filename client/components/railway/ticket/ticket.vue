<template>
  <div class="ticket">
    <div class="header">
      <span v-on:click="back" class="icon-back-pos icon-back"></span>
      <div class="station">
        <p class="start">{{startStation.station}}</p>
        <span class="icon-to icon-to-pos"></span>
        <p class="end">{{endStation.station}}</p>
      </div>
    </div>
    <div class="tab">
      <div class="last" v-on:click="last">
        <span class="icon-back icon-last-pos"></span>
        <p class="last-text">前一天</p>
      </div>
      <div class="date" v-on:click="toCalendar">
        <p>{{time}}</p>
      </div>
      <div class="next" v-on:click="next">
        <p class="next-text">后一天</p>
        <span class="icon-back icon-next-pos"></span>
      </div>
    </div>
    <scroll class="content" ref="scroll" v-show="ticketInfo!=null">
      <div>
        <div class="ticket-box" v-for="(ticket, index) in ticketInfo" v-bind:key="index">
          <div class="ticket-station-box">
            <div class="ticket-station-left">
              <p class="ticket-text">{{ticket.departDepartTime}}</p>
              <p class="ticket-text">{{ticket.departStationName}}</p>
            </div>
            <div class="ticket-line">
              <p class="train-type">{{ticket.trainNum}}</p>
              <div class="icon-long-pos icon-long-to"></div>
              <p class="train-duration">{{ticket.duration | toHour}}</p>
            </div>
            <div class="ticket-station-right">
              <p class="ticket-text">{{ticket.destArriveTime}}</p>
              <p class="ticket-text">{{ticket.destStationName}}</p>
            </div>
          </div>
          <div class="ticket-price-box">
            <div v-for="(seat, index) in ticket.prices" v-bind:key="index">
              <div v-show="isShowPrice" class="ticket-price">{{seat.seatName}}: ¥{{seat.price}}</div>
              <div v-show="!isShowPrice" class="ticket-price">{{seat.seatName}}: {{seat.leftNumber | ticketNumber}}</div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="content" v-show="ticketInfo===null">
      <div class="error">抱歉，没有找到符合的车次</div>
    </div>
    <div class="bottom">
      <p class="bottom-text" v-bind:class="{'bottom-text-click': click[0]}" v-on:click="sortByStartTime(0)">出发时间</p>
      <p class="bottom-text" v-bind:class="{'bottom-text-click': click[1]}" v-on:click="sortByEndTime(1)">到达时间</p>
      <p class="bottom-text" v-bind:class="{'bottom-text-click': click[2]}" v-on:click="sortByDuration(2)">旅行耗时</p>
      <p class="bottom-text"  v-bind:class="{'bottom-text-click': click[3]}" v-on:click="showTicket(3)">列车余票</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {getTicket} from 'api/ticket.js'
  import Scroll from 'base/scroll/scroll'
  export default {
    data() {
      return {
        ticketInfo: [],
        isShowPrice: true,
        click: [false, false, false, false]
      }
    },
    created() {
      this._getTicket()
    },
    mounted() {
      if (this.fullContent) {
        this.$router.push('/home/railway')
      }
    },
    watch: {
      time() {
        this._getTicket()
        this.$refs.scroll.refresh()
        for (let i in this.click) {
          this.click[i] = false
        }
      }
    },
    components: {
      Scroll
    },
    computed: {
      ...mapGetters([
        'startStation',
        'endStation',
        'time'
      ]),
      parseTime() {
        let date = this.time.split("-")
        let year = parseInt(date[0])
        let month = parseInt(date[1])
        let day = parseInt(date[2])
        return {year: year, month: month, day: day}
      },
      fullContent() {
        if (this.startStation.station!='出发地' && this.endStation.station!='目的地' && this.time!='选择出发时间' && this.startStation.station!='目的地' && this.endStation.station!='出发地') {
          return false
        }
        else {
          return true
        }
      }
    },
    filters: {
      toHour(value) {
        let hour = Math.floor(value/60)
        let min = value % 60
        return `${hour}小时${min}分钟`
      },
      ticketNumber(value) {
        if (value === 99) {
          return '充足'
        }
        else if (value === 0) { 
          return '无'
        }
        else {
          return `${value} 张`
        }
      }
    },
    methods: {
      sortByStartTime(index) {
        if (this.ticketInfo != null) {
          this.ticketInfo = this.ticketInfo.sort((x,y) => {
            let parseX = x.departDepartTime.split(':')
            let parseY = y.departDepartTime.split(':')
            let xSecond = parseInt(parseX[0]) * 60 + parseInt(parseX[1])
            let ySecond = parseInt(parseY[0]) * 60 + parseInt(parseY[1])
            return xSecond - ySecond
          })
        }
        this.showClick(index)
      },
      sortByEndTime(index) {
        if (this.ticketInfo != null) {
          this.ticketInfo = this.ticketInfo.sort((x,y) => {
            let parseX = x.destArriveTime.split(':')
            let parseY = y.destArriveTime.split(':')
            let xSecond = parseInt(parseX[0]) * 60 + parseInt(parseX[1])
            let ySecond = parseInt(parseY[0]) * 60 + parseInt(parseY[1])
            return xSecond - ySecond
          })
        }
        this.showClick(index)
      },
      sortByDuration(index) {
        if (this.ticketInfo != null) {
          this.ticketInfo =  this.ticketInfo.sort((x,y) => {
            return x.duration - y.duration
          })
        }
        this.showClick(index)
      },
      showTicket(index) {
        if (this.ticketInfo != null) {
          this.isShowPrice = !this.isShowPrice
        }
        this.showClick(index)
      },
      showClick(index) {
        for (let i in this.click) {
          if (parseInt(i) === index) {
            this.click[i] = true
          }
          else {
            this.click[i] = false
          }
        }
      },
      back() {
        this.$router.push('/home/railway')
      },
      toCalendar() {
        this.$router.push('/home/railway/calendar')
      },
      _getTicket() {
        getTicket(this.startStation, this.endStation, this.time).then((res) => {
          this.ticketInfo = res.data.list
        })
      },
      last() {
        let year = this.parseTime.year
        let month = this.parseTime.month
        let day = this.parseTime.day
        let count = new Date(year, month, 0).getDate()
        if (day > 1 && day <= count) {
          day = day - 1
        }
        else {
          if (month <= 1) {
            month = 12
            year = year - 1
            count = new Date(year, month, 0).getDate()
            day = count
          }
          else {
            month = month - 1
            count = new Date(year, month, 0).getDate()
            day = count
          }
        }
        this.setTime(`${year}-${month}-${day}`)
      },
      next() {
        let year = this.parseTime.year
        let month = this.parseTime.month
        let day = this.parseTime.day
        let count = new Date(year, month, 0).getDate()
        if (day >= 1 && day < count) {
            day = day + 1
        }
        else {
          if (month >= 12) {
            year = year + 1
            month = 1
            day = 1
          }
          else {
            month = month + 1
            day = 1
          }
        }
        this.setTime(`${year}-${month}-${day}`)
      },
      ...mapMutations({
        setTime: 'SET_TIME'
      }),
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
  .content {
    position: fixed;
    z-index: -1;
    top: 90px;
    bottom: 40px;
    left: 0;
    right: 0;
    background-color: rgb(238,238,238);
  }
  .ticket-box {
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 98%;
    height: 120px;
    background-color: rgb(255, 255, 255);
  }
  .ticket-station-box {
    position: relative;
    top: 15px;
    display: flex;
    width: 100%;
  }
  .ticket-station-left {
    position: relative;
    left: 4%;
    text-align: left;
    flex: 1;
  }
  .ticket-station-right {
    text-align: center;
    flex: 1;
  }
  .ticket-line {
    flex: 1;
    position: relative;
    top: 4px;
    left: 4%;
  }
  .train-type {
    width: 80px;
    font-size: 16px;
    text-align: center;
    position: relative;
    bottom: 2px;
  }
  .train-duration {
    width: 80px;
    font-size: 14px;
    text-align: center;
    position: relative;
    top: -4px;
  }
  .icon-long-pos {
    width: 80px;
    font-size: 50px;
    line-height: 20px;
    text-align: center;
  }
  .ticket-text {
    font-size: 18px;
    line-height: 26px;
  }
  .ticket-price-box {
    position: relative;
    width: 100%;
    left: 4%;
    top: 30px;
    display: flex;
    text-align: left;
    color: rgb(	119,136,153);
  }
  .ticket-price {
    margin-right: 10px;
    flex: 1;
    font-size: 12px;
  }
  .bottom {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: rgba(40,56,71,0.9);
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
  .bottom-text-click {
    margin-top: 10px;
    text-align: center;
    flex: 1;
    height: 20px;
    color:rgb(9,159,222)!important;
    font-size: 14px;
    line-height: 20px;
    border-right: 1px solid rgba(255,255,255,0.8);
  }
  .error {
    position: relative;
    text-align: center;
    top: 30%;
    font-size: 20px;
    color: rgb(96, 98, 102);
  }
  .display-enter-active, .display-leave-active {
    transition: all 0.5s;
  }
  .display-enter, .display-leave-to {
    opacity: 0;
  }
  .move-enter-active, .move-leave-active {
    transition: all 0.3s;
  }
  .move-enter, .move-leave-to {
    transform: translate3d(0, 100%, 0);
  }
</style>