<template>
  <div class="station">
    <div class="header">
      <p class="title">选择车站</p>
    </div>
    <scroll class="station-list" ref="scroll" v-on:scroll="getPos">
      <div>
        <div v-for="(value, key, index) in station" v-bind:key="index">
          <p class="category" ref="category">{{key}}</p>
          <div v-for="(code, station, index) in value" v-bind:key="index">
            <p class="station-code" v-on:click="select(station, code)">{{station}}</p>
          </div>
        </div>
      </div>
      <div class="code">
        <div v-for="(value, key, index) in station" v-bind:key="index" class="code-pos">
          <p v-on:click="press(index)" v-bind:class="{'code-color': index == currentIndex}">{{key}}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import station from 'api/station.json'
  import Scroll from 'base/scroll/scroll'
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        station: station,
        currentIndex: 0,
        height: [],
        scrollPos: 0
      }
    },
    components: {
      Scroll
    },
    mounted() {
      this.height.push(0)
      let length
      let arr = []
      let temp = 0
      for (let i in this.station) {
        length = Object.keys(this.station[i]).length 
        let stationHeight = ( 43 * length ) + 35
        arr.push(stationHeight)
      }
      for (let i in arr) {
        temp = arr[i] + temp
        this.height.push(temp)
      }
    },
    watch: {
      scrollPos() {
        let newY = this.scrollPos

        if (newY > 0) {
          this.currentIndex = 0
          return
        }

        for (let i = 0; i < this.height.length - 1; i++) {
          let height1 = this.height[i]
          let height2 = this.height[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            return
          }
        }

        this.currentIndex = this.height.length - 2
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      ...mapMutations({
        set_startStation: 'SET_START_STATION',
        set_endStation: 'SET_END_STATION',
      }),
      select(station, code) {
        if (this.$route.query.station === 'start') {
          this.set_startStation({station: station, code: code})
        }
        else if (this.$route.query.station === 'end') {
          this.set_endStation({station: station, code: code})
        }
        this.$router.push('/home/ticket')
      },
      press(index) {
        let el = this.$refs.category[index]
        this.$refs.scroll.scrollTo_El(el)
        this.currentIndex = index
      },
      getPos(pos) {
        this.scrollPos = pos.y
      }
    }
  }
</script>

<style scoped>
  .station {
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
  .title {
    display: inline-block;
    line-height: 60px;
    font-size: 20px;
  }
  .station-list {
    position: fixed;
    z-index: 1;
    top: 61px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(255,255,255);
    overflow: hidden;
  }
  .category {
    padding-left: 15px;
    width: 100%;
    height: 35px;
    background-color: rgb(233,233,233);
    line-height: 35px;
    border-bottom: 1px solid rgba(194, 217, 240, 0.3);
  }
  .station-code {
    padding-left: 15px;
    width: 100%;
    height: 42px;
    background-color: rgb(255, 255, 255);
    line-height: 42px;
    border-bottom: 1px solid rgba(194, 217, 240, 0.3);
  }
  .code {
    position: fixed;
    z-index: 1;
    top: 90px;
    bottom: 30px;
    right: 0;
    background-color: rgba(0,0,0,0.4);
    width: 20px;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
  }
  .code-pos {
    flex: 1;
  }
  .code-color {
    color: rgb(238, 27, 55);
  }
</style>

