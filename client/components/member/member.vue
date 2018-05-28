<template>
  <div class="member">
    <div class="headers">
      <span v-on:click="back" class="icon-back-pos icon-back"></span>
    </div>
    <div class="content">
      <div class="userinfo" v-for="(member, index) in members" v-bind:key="index">
        <div class="user-pic" v-on:click="showDetail(member.username)">
          <img v-bind:src="member.avatar" class="avatar">
        </div>
        <p class="username">{{member.username}}</p>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      roomid: {
        type: String
      },
      socket: {
        type: Object
      }
    },
    data() {
      return {
        members: []
      }
    },
    mounted() {
      let self = this
      this.socket.on('onlineUser', function(members) {
        self.members = members
      })
    },
    methods: {
      back() {
        this.$emit('close')
      },
      showDetail(username) {
        this.$router.push({
          path: '/setting',
          query: {
            username: username
          }
        })
      },
    }
  }
</script>

<style scoped>
  .member {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color:rgb(255,255,255);
  }
  .headers {
    position: absolute;
    display: flex;
    top: 0px;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.8);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .icon-back-pos {
    color: rgb(255,255,255);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    margin-left: 10px;
  }
  .content {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 60px;
    right: 0;
    background-color:rgb(255,255,255);
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5px;
    overflow: auto;
  }
  .userinfo {
    position: relative;
    top: 15px;
    width: 20%;
    height: 90px;
    margin-bottom: -5px;
  }
  .user-pic {
    margin: 0 auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .username {
    margin: 0 auto;
    width: 50px;
    position: relative;
    top: 10px;
    text-align: center;
    font-size: 14px;
    color: rgba(7, 17, 27, 0.8);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .footer {
    position: fixed;
    display: flex;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: rgb(0, 0, 0);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
</style>