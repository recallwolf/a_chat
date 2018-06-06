<template>
  <scroll class="news-list" ref="scroll" v-on:scrollToEnd="searchMore" v-on:scrollToStart="searchRefresh">
    <div>
      <loading></loading>
      <div v-for="(value, index) in newsList" v-bind:key="index">
        <a v-bind:href="value.article_url">
          <div class="news-box"  v-show="newsList[index].title!=undefined">
            <p class="news-text">{{value.title}}</p>
              <div class="news-pic">
                <div class="pic-box" v-for="(img, index) in value.image_list" v-bind:key="index">
                  <img v-bind:src="img.url" width="110px" height="78px">
                </div>
              </div>
              <div class="news-info">
                <p class="news-source">{{value.source}}</p>
                <p class="news-source">评论 {{value.comment_count}}</p>
              </div>
          </div>
        </a>
      </div>
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {getNews} from 'api/news'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        newsList: []
      }
    },
    components: {
      Scroll,
      Loading
    },
    created() {
      let category = this.$route.query.category
      this._getNews(category)
      this.$nextTick(() => {
        this.$refs.scroll.scrollTop() 
      })
    },
    watch: {
      '$route'(to, from) {
        let category = this.$route.query.category
        this._getNews(category)
        this.$refs.scroll.scrollTop() 
        this.$refs.scroll.refresh()
      }
    },
    methods: {
      _getNews(category) {
        getNews(category).then((res) => {
          let parseData = []
          for (let i in res.data) {
            parseData[i] = JSON.parse(res.data[i].content)
          }
          this.newsList = parseData
        })
      },
      searchMore() {
        let category = this.$route.query.category
        let parseData = []
        getNews(category).then((res) => {
          for (let i in res.data) {
            parseData[i] = JSON.parse(res.data[i].content)
          }
          this.newsList =  this.newsList.concat(parseData)
          this.$refs.scroll.refresh()
        })
      },
      searchRefresh() {
         let category = this.$route.query.category
         getNews(category).then((res) => {
          let parseData = []
          for (let i in res.data) {
            parseData[i] = JSON.parse(res.data[i].content)
          }
          this.newsList = parseData
          this.$refs.scroll.refresh()
        })
      }
    }
  }
</script>

<style scoped>
  .news-list {
    position: fixed;
    z-index: -1;
    top: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(255,255,255);
    overflow: hidden;
  }
  .news-box {
    border-bottom: 1px solid rgba(194, 217, 240, 0.3);
    padding: 15px 12px;
  }
  .news-text {
    position: relative;
    line-height: 24px;
    font-size: 18px;
  }
  .news-pic {
    width: 350px;
    position: relative;
    top: 10px;
    display: flex;
  }
  .pic-box {
    width: 33%;
  }
  .news-info {
    position: relative;
    top: 10px;
  }
  .news-source {
    display: inline-block;
    font-size: 12px;
    color: rgba(7, 17, 27, 0.6);
  }
  a {
    color:rgb(7, 17, 27);
    text-decoration: none;
  }
</style>