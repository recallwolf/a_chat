<template>
  <div class="news">
    <div class="header">
      <span v-on:click="back" class="icon-back-pos icon-back"></span>
    </div>
    <div class="menu-list" ref="menuList">
      <div class="menu-box" ref="menuBox">
        <div v-for="(value, key, index) in news" v-bind:key="index" class="menu-text" v-on:click="scrollX(index)">
          <router-link :to="{path: '/home/news/content', query: {category: value}}" active-class="menu-text-active" exact>
            {{key}}
          </router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
     
<script type="text/ecmascript-6">
  import news from 'api/news.json'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        news: news
      }
    },
    created() {
      this.$router.push({
        path: '/home/news/content', 
        query: {
          category: this.news['热点']
        }
      })
      
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    activated() {
      this.$router.push({
        path: '/home/news/content', 
        query: {
          category: this.news['热点']
        }
      })
      
       this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      _initScroll() {
        let count = Object.keys(this.news).length
        let width = count * 55
        this.$refs.menuBox.style.width = width + 'px'
        this.menuScroll = new BScroll(this.$refs.menuList, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      },
      back() {
        this.$router.push('/home')
      },
      scrollX(index) {
        let width = this.$refs.menuList.clientWidth
        let menuWidth = index * 55
        let reduceWidth = menuWidth - width/2
        if (reduceWidth > -23 && reduceWidth < 88) {
          this.menuScroll.scrollTo(-reduceWidth-20, 0)
        }
      }
    }
  }
</script>

<style scoped>
  .news {
    position: fixed;
    z-index: 1;
    top: 0;
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
  .menu-list {
    position: fixed;
    top: 60px;
    width: 100%;
    height: 35px;
    background-color: rgb(238,238,238);
    overflow-x: hidden;
    white-space: nowrap;
    border-top: 1px solid rgba(194, 217, 240, 0.3);
    border-bottom: 1px solid rgba(194, 217, 240, 0.3);
  }
  .menu-box {
    width: 440px;
  }
  .menu-text {
    display: inline-block;
    width: 55px;
    text-align: center;
    line-height: 35px;
    text-decoration: none;
  }
  .menu-text-active {
    color: rgb(248,89,89);
  }
  a {
    color:rgba(7, 17, 27, 0.6);
    text-decoration: none;
  }
</style>