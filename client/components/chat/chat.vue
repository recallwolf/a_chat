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
						<img src="~common/image/avatar.jpg" height="55px" width="55px">
					</div>
					<div class="chat-pos">
						<h1 class="chat-name">聊天室1</h1>
						<p class="chat-desc">说出你的故事</p>
					</div>
				</div>

				<div class="chat-list" v-on:click="toChatroom(2)">
					<div class="chat-pic">
						<img src="~common/image/avatar.jpg" height="55px" width="55px">
					</div>
					<div class="chat-pos">
						<h1 class="chat-name">聊天室2</h1>
						<p class="chat-desc">说出你的故事</p>
					</div>
				</div>

				<div class="new-chat" v-show="newChat">新建聊天室</div>
			</div>
		</scroll>
		<router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
	import Tab from 'components/tab/tab'
	import Scroll from 'base/scroll/scroll'
  export default {
		data() {
			return {
				newChat : false
			}
		},
		methods: {
			toChatroom(index) {
				this.$router.push(`/chat/chatroom/${index}`)
			},
			toRobot() {
				this.$router.push('/chat/robot/0')
			}
		},
    components: {
      Tab
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
	.new-chat {
		position: absolute;
		right: 0px;
		top:61px;
		width: 130px;
		height: 40px;
		background-color: rgb(250, 250, 250);
		border-radius: 1px;
		font-size: 18px;
		color: #444;
		text-align: center;
		line-height: 40px;
	}
	.fade-enter-active, .fade-leave-active {
		transition: all 0.3s;
		opacity: 1;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
</style>


