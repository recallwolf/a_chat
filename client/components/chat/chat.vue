<template>
  <div>
	<tab></tab>
		<scroll class="chat">
			<div>
				<div class="chat-list" v-on:click="toRobot">
					<div class="chat-pic">
						<img src="~common/image/cat.png" height="55px" width="55px">
					</div>
					<div class="chat-pos">
						<h1 class="chat-name">图灵机器人</h1>
						<p class="chat-desc">有事找我</p>
					</div>
				</div>

				<div class="chat-list" v-on:click="toChatroom(1)">
					<div class="chat-pic">
						<img src="~common/image/chatroom_1.jpg" height="55px" width="55px">
					</div>
					<div class="chat-pos">
						<h1 class="chat-name">聊天室1</h1>
						<p class="chat-desc">说出你的故事</p>
					</div>
				</div>

				<div class="chat-list" v-on:click="toChatroom(2)">
					<div class="chat-pic">
						<img src="~common/image/chatroom_2.jpg" height="55px" width="55px">
					</div>
					<div class="chat-pos">
						<h1 class="chat-name">聊天室2</h1>
						<p class="chat-desc">说出你的故事</p>
					</div>
				</div>
			</div>
		</scroll>
		<transition name="slide">
			<router-view/>
		</transition>
  </div>
</template>

<script type="text/ecmascript-6">
	import Tab from 'components/tab/tab'
	import Scroll from 'base/scroll/scroll'
	import {Mixin} from 'common/js/mixin'
	import io from 'socket.io-client'
  export default {
		mixins: [Mixin],
		data() {
			return {
				newChat : false
			}
		},
		components: {
			Tab,
			Scroll
		},
		methods: {
			toChatroom(index) {
				this.$router.push(`/chat/chatroom/${index}`)
			},
			toRobot() {
				this.$router.push('/chat/robot/0')
			}
		}
  }
</script>

<style scoped>
  .chat {
    position: fixed;
    z-index: -1;
    top: 58px;
    left: 0;
    bottom: 58px;
    right: 0;
    background-color: rgb(255,255,255);
  }
  .chat-list {
		display: flex;
    width: 100%;
    height: 75px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .chat-pic {
		flex: 1;
    width: 540px;
    height: 55px;
    position: relative;
    top: 10px;
    left:10px;
	}
	.chat-pos {
		flex: 4;
		margin-top: 20px;
		margin-left: 10px;
	}
  .chat-name {
		margin-bottom: 10px;
		color: rgb(7,17,27);
		font-size: 18px;
	}
	.chat-desc {
		position: relative;
		color: rgba(7,17,27,0.9);
		font-size: 12px;
	}
	.fade-enter-active, .fade-leave-active {
		transition: all 0.3s;
		opacity: 1;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
	.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>