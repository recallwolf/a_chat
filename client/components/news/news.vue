<template>
  <div class="news">
    <div class="header">
      <span v-on:click="back" class="icon-back-pos icon-back"></span>
    </div>
    <div class="menu-list">
      <p v-for="(value, key, index) in news" 
          v-bind:key="index" 
          v-on:click="_getNews(value)"
          class="menu-text">
        {{key}}
      </p>
    </div>
    <div class="news-list" >
      <div  v-for="(value, index) in parseNews" v-bind:key="index">
        <p>{{value.content.abstract}}</p>
      </div>
    </div>
  </div>
</template>
     
<script type="text/ecmascript-6">
  import {getNews} from 'api/news'
  import news from 'api/news.json'
  export default {
    data() {
      return {
        news: news,
        newsList: []
      }
    },
    computed: {
      parseNews() {
        for (let i in this.newsList) {
          this.newsList[i].content = JSON.parse(this.newsList[i].content)
        }
        return this.newsList
      }
    },
    created() {
      this._getNews(news[0])
    },
    methods: {
      _getNews(category) {
        getNews(category).then((res) => {
          this.newsList = res.data
          console.log(this.newsList[1])
        })
      },
      back() {
        this.$router.back()
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
    overflow-x: auto;
    white-space: nowrap;
    border-top: 1px solid rgba(194, 217, 240, 0.3);
    border-bottom: 1px solid rgba(194, 217, 240, 0.3);
  }
  .menu-text {
    display: inline-block;
    width: 55px;
    text-align: center;
    line-height: 35px;
    color: rgba(7, 17, 27, 0.6);
  }
  .news-list {
    position: fixed;
    top: 95px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(255,255,255);
  }
</style>

