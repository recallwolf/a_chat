<template>
  <div class="express">
    <span class="icon-back-pos icon-back" v-on:click="back"></span>
    <div class="options">
      <input type="text" placeholder="快递单号" class="text-input" v-model="orderNumber">
      <div class="switch" v-on:click="toExpress">
        <p class="express-text">{{delivery}}</p>
        <span class="icon-forward-pos icon-forward"></span>
      </div>
      <div class="button" v-on:click="search">查询</div>
    </div>

    <div class="mask" v-show="isShowExpress" v-on:click="toExpress">
      <div class="express-list">
        <div v-for="(value, key, index) in express" v-on:click="chooseExpress(key)" v-bind:key="index">
          <p class="express-name">{{key}}</p>
        </div>
      </div>
    </div>

    <div class="mask" v-show="isShowDetail" v-on:click="leaveDetail">
      <div class="express-list">
        <div class="error" v-show="details.length===0">抱歉，输入的信息有误</div>
        <div v-for="(value, index) in details" v-bind:key="index">
          <div class="detail-text">
            <div>
              <p>{{value.message}}</p>
              <p class="detail-time">{{value.time}}</p>
            </div>
            <div>
              <p class="detail-event">{{value.context}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Express from 'api/express.json'
  import {getExpress} from 'api/express.js'
  export default {
    data() {
      return {
        express: Express,
        isShowExpress: false,
        isShowDetail: false,
        delivery: '选择快递公司',
        orderNumber: '',
        details: {}
      }
    },
    activated() {
      this.isShowExpress = false
      this.isShowDetail = false
    },
    methods: {
      back() {
        this.$router.back()
      },
      toExpress() {
        this.isShowExpress = !this.isShowExpress
      },
      chooseExpress(key) {
        this.delivery = key
      },
      leaveDetail() {
        this.isShowDetail = !this.isShowDetail
      },
      search() {
        if (this.orderNumber != '' && this.delivery != '选择快递公司') {
          getExpress(this.orderNumber, this.express[this.delivery]).then((res) => {
            this.details = res.data
            this.isShowDetail = true
          })
        }
      }
    }
  }
</script>

<style scoped>
  .express {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url('~common/image/express.jpg');
  }
  .icon-back-pos {
    color: rgba(255,255,255, 0.8);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    margin-left: 10px;
  }
  .options {
    width: 100%;
    position: relative;
    top: 20px;
  }
  .text-input {
    margin: 20px auto;
		display: block;
		width: 90%;
		height: 38px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		outline: none;
		font-size: 18px;
		padding-left:10px;
  }
  .switch {
    margin: 20px auto;
		display: block;
		width: 90%;
		height: 41px;
		border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 18px;
    line-height: 41px;
    padding-left: 10px;
    background-color: rgb(255,255,255);
  }
  .express-text {
    display: inline-block;
  }
  .icon-forward-pos {
    float: right;
    line-height: 41px;
    position: relative;
    right: 10px;
    color: rgba(7,17,27,0.5)
  }
  .button {
    position: relative;
		top: 30px;
		margin: 0 auto;
		display: block;
		width: 94%;
		height: 50px;
		border-radius: 20px;
		background-color: rgb(238,87,0);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.7);
    text-align: center;
    line-height: 50px;
  }
  .mask {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(7,17,27,0.7);
  }
  .express-list {
    text-align: center;
    position: fixed;
    z-index: 1;
    top: 80px;
    left: 10px;
    bottom: 80px;
    right: 10px;
    background-color: rgb(255,255,255);
    overflow: auto;
  }
  .error {
    position: relative;
    font-size: 32px;
    top: 45%;
    color: rgb(96, 98, 102)
  }
  .express-name {
    line-height: 50px;
    font-size: 20px;
    border-bottom: 1px solid rgba(194, 217, 240, 0.5);
    color: rgba(7, 17, 27, 0.9)
  }
  .detail-text {
    display: flex;
    width: 100%;
    border-bottom: 1px solid rgba(149,165,166, 0.5);
  }
  .detail-time {
    line-height: 35px;
    width: 130px;
    font-size: 20px;
    margin-right: -10px;
    font-weight: 400;
    padding-top: 10px;
  }
  .detail-event {
    flex: 1;
    text-align: left;
    font-size: 16px;
    line-height: 30px;
    padding-bottom: 15px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 5px;
    font-weight: 700;
  }
</style>

