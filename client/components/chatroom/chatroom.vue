<template>
  <div class="chatroom">
    <div class="headers">
      <span v-on:click="back" class="icon-back-pos icon-back"></span>
      <span class="icon-avatar-pos icon-avatar" v-show="parseInt(id) === 1 || parseInt(id) === 2" v-on:click="showMember"></span>
    </div>
    <scroll ref="scroll" class="msg-box">
      <div>
        <div v-for="(message,index) in chatmsgs" v-bind:key="index" class="wrapper">
          <div v-bind:class="{'msg-layout-other': message.user==='robot' || message.user!=userinfo.username, 'msg-layout': message.user!='robot' && message.user===userinfo.username}">
            <div v-bind:class="{'pic-pos-other': message.user==='robot' || message.user!=userinfo.username, 'pic-pos': message.user!='robot' && message.user===userinfo.username}">
              <img v-on:click="showDetail(message.user)" v-bind:src="message.avatar" class="pic" v-show="message.user!='robot'">
              <img src="~common/image/cat.png" class="pic" v-show="message.user==='robot'">
            </div>
            <div class="text-pos">
              <p v-show="message.toUser === undefined" v-bind:class="{'text-user-other': message.user==='robot' || message.user!=userinfo.username, 'text-user': message.user!='robot' && message.user===userinfo.username}">{{message.user}}</p>
              <p v-show="message.toUser != undefined" class="text-user-other">{{message.user}}(私聊)</p>
              <div v-bind:class="{'text-box-other': message.user==='robot' || message.user!=userinfo.username, 'text-box': message.user!='robot' && message.user===userinfo.username}">
                <p class="text-msg" v-html="message.msg"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="footer" ref="footer">
      <textarea class="input" v-model="message" v-on:focus="display" ref="textarea"></textarea>
      <div class="input-icon">
        <transition name="display">
          <span class="icon-happy" v-on:click="showEmoji" v-show="!(isImage||isFile)"></span>
        </transition>
        <transition name="display">
          <span class="icon-error" v-show="isImage||isFile" v-on:click="clear"></span>
        </transition>
        <transition name="display">
          <span class="icon-plus" v-show="!(message||isFile||isImage)" v-on:click="showUpload"></span>
        </transition>
        <transition name="display">
          <span class="icon-envelope" v-show="message||isFile||isImage" v-on:click="send"></span>
        </transition>
      </div>
    </div>

    <div class="emoji-box" v-show="isShowEmoji">
      <div class="emoji" v-for="(emoji,index) in emojis" v-bind:key="index">
        <p class="emoji-text" v-on:click="insertEmoji(index)">{{emoji}}</p>
      </div>
    </div>

    <div class="upload-box" v-show="isShowUpload">
      <div class="upload-picture">
        <span class="icon-pic-pos icon-picture" v-bind:class="{'highlight': isImage}">
          <input ref="image" type="file"  class="image" v-on:change="image" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
        </span>
      </div>
      <div class="upload-file">
        <span class="icon-file-pos icon-file" v-bind:class="{'highlight': isFile}">
          <input ref="file" type="file" class="file" v-on:change="file">
        </span>
      </div>
    </div>
    <transition name="slide">
      <member v-show="isShowMember" v-on:close="showMember"  v-bind:roomid="id" v-bind:socket="socket"></member>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {robot} from 'api/robot'
  import Scroll from 'base/scroll/scroll'
  import Member from 'components/member/member'
  import io from 'socket.io-client'
  import {mapGetters} from 'vuex'
  import {Mixin} from 'common/js/mixin'
  export default {
    mixins: [Mixin],
    computed: {
      ...mapGetters([
        'userinfo'
      ])
    },
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        message: '',
        chatmsgs: [],
        isShowEmoji: false,
        isShowUpload: false,
        isFile: false,
        isImage: false,
        isShowMember: false,
        username: '',
        avatar: '',
        socket: {},
        emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️'],
      }
    },
    created() {
      this.socket = io(`http://localhost:3000?roomid=${this.id}`)
    },
    watch: {
      chatmsgs() {
        this.$refs.scroll.refresh()
        setTimeout(() => {
          this.$refs.scroll.scrollTo()
        }, 20)
      }
    },
    mounted() {
      let self = this   //socket.on会改变this的指向！！！
      this.username = this.userinfo.username
      this.avatar = this.userinfo.avatar
      this.socket.emit('join', {username: this.username, avatar: this.avatar})
      this.socket.on('chat message', function(msg){
        console.log(msg)
        self.chatmsgs.push(msg)
      })
      this.socket.on('private', function(msg) {
        self.chatmsgs.push(msg)
      })
    },
    components: {
      Scroll,
      Member
    },
    methods: {
      back() {
        if (parseInt(this.id) != 0 && parseInt(this.id) != 1 && parseInt(this.id) != 2) {
          this.$router.go(-2)
        }
        else if (parseInt(this.id) === 1 || parseInt(this.id) === 2) {
          this.socket.emit('leave', {username: this.username, avatar: this.avatar})
          this.$router.back()
        }
        else {
          this.$router.back()
        }
      },
      send() {
        if (this.message != "" && !this.isFile && !this.isImage ) {
          this.message = this.message.replace(/</g, "&lt").replace(/>/g,"&gt")
          if (parseInt(this.id) === 0) {
            this.chatmsgs.push({user: this.username, msg: this.message, avatar: this.avatar})
            robot(this.message).then((res) => {
              this.chatmsgs.push({user: 'robot', msg: res.results[0].values.text})
            })
          }
          else if (parseInt(this.id) === 1 || parseInt(this.id) === 2) {
            this.chatmsgs.push({user: this.username, msg: this.message, avatar: this.avatar})
            this.socket.emit('chat message', {user: this.username, msg: this.message, avatar: this.avatar})
          }
          else {
            this.chatmsgs.push({user: this.username, msg: this.message, avatar: this.avatar})
            this.socket.emit('private', {user: this.username, msg: this.message, avatar: this.avatar, toUser: this.id})
          }
          this.message = ""
        }
        else if (this.isFile) {
          if (this.files.length != 0) {
            let tag = `<a href="http://localhost:3000/upload/${this.files[0].name}" download="http://localhost:3000/upload/${this.files[0].name}"><img src="/static/folder.png" width="50px" height="50px"></a>`
            if (parseInt(this.id) === 1 || parseInt(this.id) === 2) {
              this.socket.emit('send file', {user: this.username, msg: tag, file: this.files[0], filename: this.files[0].name, avatar: this.avatar})
              this.socket.on('send successful', () => {
                this.chatmsgs.push({user: this.username, msg: tag, avatar: this.avatar})
              })
            }
            else {
              this.socket.emit('private file', {user: this.username, msg: tag, file: this.files[0], filename: this.files[0].name, avatar: this.avatar, toUser: this.id})
              this.socket.on('private file successful', () => {
                this.chatmsgs.push({user: this.username, msg: tag, avatar: this.avatar})
              })
            }
          }
        }
        else if (this.isImage) {
          if (this.files.length != 0) {
            let tag = `<img src="http://localhost:3000/upload/${this.files[0].name}" width="120px" height="120px">`
            if (parseInt(this.id) === 1 || parseInt(this.id) === 2) {
              this.socket.emit('send file', {user: this.username, msg: tag, file: this.files[0], filename: this.files[0].name, avatar: this.avatar})
              this.socket.on('send successful', () => {
                this.chatmsgs.push({user: this.username, msg: tag, avatar: this.avatar})
              })
            }
            else {
              this.socket.emit('private file', {user: this.username, msg: tag, file: this.files[0], filename: this.files[0].name, avatar: this.avatar, toUser: this.id})
              this.socket.on('private file successful', () => {
                this.chatmsgs.push({user: this.username, msg: tag, avatar: this.avatar})
              })
            }
          }
        }
      },
      showDetail(username) {
        this.$router.push({
          path: '/setting',
          query: {
            username: username
          }
        })
      },
      showEmoji() {
        if (!this.isShowEmoji) {
          this.$refs.footer.style.bottom = '181px'
          this.isShowEmoji = !this.isShowEmoji
        }
        else if (this.isShowUpload){
          this.isShowUpload = false
        }
        else {
          this.$refs.footer.style.bottom = '0px'
          this.isShowEmoji = !this.isShowEmoji
        }
      },
      showUpload() {
        if (!this.isShowUpload) {
          this.$refs.footer.style.bottom = '181px'
          this.isShowUpload = !this.isShowUpload
        }
        else if (this.isShowEmoji){
          this.isShowEmoji = false
        }
        else {
          this.$refs.footer.style.bottom = '0px'
          this.isShowUpload = !this.isShowUpload
        }
      },
      showMember() {
        this.isShowMember = !this.isShowMember
      },
      display() {
        this.$refs.footer.style.bottom = '0px'
        this.isShowUpload = false
        this.isShowEmoji = false
        this.clear()
      },
      insertEmoji(index) {
        let textarea = this.$refs.textarea
        let cursorPos = textarea.selectionStart
        let beforeText = this.message.substring(0, cursorPos)
        let afterText = this.message.substring(cursorPos)
        this.message = beforeText + this.emojis[index] + afterText
      },
      image(e) {
         this.files = e.target.files
        if(this.files.length != 0) {
          this.isImage = true
          this.isFile = false
          this.$refs.file.value = ""
        }
      },
      file(e) {
        this.files = e.target.files
        if(this.files.length != 0) {
          this.isFile = true
          this.isImage = false
          this.$refs.image.value = ""
        }
      },
      clear() {
        this.isFile = false
        this.isImage = false
        this.$refs.image.value = ""
        this.$refs.file.value = ""
      }
    }
  }
</script>

<style scoped>
  .chatroom {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .headers {
    position: absolute;
    display: flex;
    top: 0px;
    width: 100%;
    height: 60px;
    background-color: rgb(0, 0, 0);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .icon-back-pos {
    color: rgb(255,255,255);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    margin-left: 10px;
  }
  .icon-avatar-pos {
    position: absolute;
    right: 15px;
    color: rgb(255,255,255);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
  }
  .msg-box {
    position: fixed;
    top: 58px;
    left: 0;
    bottom: 58px;
    right: 0;
    background-color: rgb(255,255,255);
    overflow: hidden;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .msg-layout {
    margin-top: 10px;
    margin-bottom: 25px;
  }
  .msg-layout-other {
    margin-top: 10px;
    margin-bottom: 35px;
    align-self: flex-end;
  }
  .pic-pos {
    display: inline-block;
    vertical-align: top;
    width: 45px;
    height: 45px;
    position: relative;
    left: 10px;
  }
  .pic-pos-other {
    float: right;
    width: 45px;
    height: 45px;
    position: relative;
    right: 10px;
  }
  .pic {
    width: 45px; 
    height: 45px;
    border-radius: 50%;
  }
  .text-pos {
    display: inline-block;
    vertical-align: top;
  }
  .text-user {
    position: relative;
    top: 5px;
    left: 20px;
    font-size: 13px;
    color: rgba(7,17,27,0.7);
  }
  .text-user-other {
    float: right;
    width: 100px;
    text-align: right;
    position: relative;
    top: 5px;
    right: 25px;
    font-size: 13px;
    color: rgba(7,17,27,0.7);
  }
  .text-private {
    float: right;
    width: 100px;
    text-align: right;
    position: relative;
    top: 5px;
    right: 20px;
    font-size: 13px;
    color: rgba(7,17,27,0.7);;
  }
  .text-box {
    display: block;
    position: relative;
    left: 20px;
    top: 15px;
    max-width: 200px;
    background-color: rgb(220, 220, 220);
    padding: 8px;
    border-radius: 8px;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
  }
  .text-box-other {
    float: right;
    display: block;
    position: relative;
    top: 25px;
    left: 80px;
    max-width: 200px;
    background-color: rgb(220, 220, 220);
    padding: 8px;
    border-radius: 8px;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
  }
  @media screen and (max-width: 320px) {
    .text-box {
      max-width: 155px;
    }
    .text-box-other {
      max-width: 155px;
    }
  }
  .text-msg {
    line-height: 23px;
    font-size: 16px;
    color: rgb(7,17,27);
  }
  .footer {
    display: flex;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 55px;
    background-color: rgb(248,248,255);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .input {
    flex: 3;
    position: relative;
    top: 10px;
    left: 10px;
    width: 70%;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    border: 1px solid rgba(194, 217, 240, 0.6);
    outline: none;
  }
  .input-icon {
    flex: 1;
    position: relative;
    line-height: 60px;
    font-size: 25px;
    left: 20px;
    color: rgba(7,17,27,0.8);
  }
  .emoji-box {
    display:  flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 180px;
    background-color: rgb(255,255,255);
    overflow: auto;
    border-top: 1px solid rgba(194, 217, 240, 0.6);
  }
  .emoji {
    width: 48px;
    height: 48px;
    background-color: rgb(255,255,255);
  }
  .emoji-text {
    text-align: center;
    line-height: 48px;
    font-size: 20px;
  }
  .upload-box {
    display:  flex;
    flex-wrap: wrap;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 180px;
    background-color: rgb(255,255,255);
    border-top: 1px solid rgba(194, 217, 240, 0.6);
  }
  .upload-picture {
    position: relative;
    top: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    border: 1px solid rgba(173, 173, 173, 0.6);
    text-align: center;
  }
  .image {
    position: absolute;
    left: 0px;
    height: 60px;
    width: 56px;
    opacity: 0;
  }
  .upload-file {
    position: relative;
    top: 20px;
    left: 40px;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    border: 1px solid rgba(173, 173, 173, 0.6);
    text-align: center;
  }
  .file {
    position: absolute;
    left: 0px;
    height: 60px;
    width: 56px;
    opacity: 0;
  }
  .highlight {
    color: rgb(52,152,219);
  }
  .icon-pic-pos {
    line-height: 60px;
    font-size: 24px;
  }
  .icon-file-pos {
    line-height: 60px;
    font-size: 24px;
  }
  .icon-envelope {
    color: rgb(52,152,219);
  }
  .display-enter-active, .display-active-active {
    opacity: 1;
    transition-duration: 0.5s;
    transition-delay: 0.1s;
  }
  .display-enter, .display-leave {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>