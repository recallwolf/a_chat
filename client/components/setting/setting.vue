<template>
  <div>
		<tab></tab>
    <scroll class="info">
      <div class="info-content">
        <div class="banner">
          <img src="~common/image/bg.jpg" class="responsive">
        </div>
        <div class="modal"></div>
        <div class="avatar">
          <img v-bind:src="data.avatar" class="avtar-img">
        </div>
        <div>
          <div class="part">
            <p class="title">账号</p>
            <p class="content">{{data.username}}</p>
          </div>

          <div class="part">
            <p class="title">邮箱</p>
            <p class="content">{{data.email}}</p>
          </div>

          <div class="logout" v-on:click="logout" v-show="!$route.query.username">
            <p class="logout-text">一键注销</p>
          </div>
          <div class="send" v-on:click="toUser(data.username)" v-show="$route.query.username && $route.query.username != userinfo.username">
            <p class="logout-text">发消息</p>
          </div>
          <div class="return" v-on:click="back" v-show="$route.query.username">
            <p class="logout-text">返回</p>
          </div>
        </div>
      </div>
    </scroll>
	</div>
</template>

<script type="text/ecmascript-6">
  import  Tab from 'components/tab/tab'
  import {mapGetters} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import {Mixin} from 'common/js/mixin'
  import axios from 'axios'
  export default {
    mixins: [Mixin],
    data() {
      return {
        data: {}
      }
    },
    mounted() {
      this.getUserinfo()
    },
    activated() {
      this.getUserinfo()
    },
    computed: {
       ...mapGetters([
        'userinfo'
      ])
    },
    components: {
      Tab,
      Scroll
    },
    methods: {
      getUserinfo() {
        if (this.$route.query.username != undefined)
          axios('/api/userinfo', {
            params: {
              username: this.$route.query.username || this.userinfo.username
            }
          }).then((res) => {
            this.data = res.data
          })
        else {
          this.data = this.userinfo
        }
      },
      logout() {
        localStorage.removeItem('userinfo')
        this.$router.push('/login')
      },
      back() {
        this.$router.back()
      },
      toUser(username) {
        this.$router.push(`/private/${username}`)
      }
    }
  }
</script>

<style scoped>
  .info {
    position: fixed;
    z-index: -1;
    top: 58px;
    left: 0;
    bottom: 58px;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .info-content {
    z-index: 1;
  }
  .banner {
    width: 100%;
    height: 220px;
    overflow: hidden;
  }
  .modal {
    position: absolute;
    width: 100%; 
    height: 220px;
    left: 0; 
    top: 0;
    background-color: rgba(7, 17, 27, 0.3);
  }
  .responsive {
    width: 100%;
  }
  .avatar {
    position: relative;
    top: -50px;
    left: 10px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 1px solid rgba(194, 217, 240, 0.6);
  }
  .avtar-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .part {
    position: relative;
    top: -30px;
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(194, 217, 240, 0.6);
  }
  .title {
    font-size: 15px;
    color: rgba(7,17,27,0.7);
    position: absolute;
    top: 6px;
    left: 20px;
  }
  .content {
    font-size: 18px;
    position: absolute;
    top: 34px;
    left: 20px;
  }
  .logout {
    position: relative;
    top: 13px;
    height: 50px;
    width: 100%;
    background-color:rgba(3, 12, 20, 0.6);
  }
  .logout-text {
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgba(255,255,255,0.9);
  }
  .send {
    position: relative;
    top: -10px;
    height: 50px;
    width: 100%;
    background-color:rgb(64,158,255);
  }
  .return {
    position: relative;
    top: -9px;
    height: 50px;
    width: 100%;
    background-color:rgb(64,158,255);
  }
</style>
