<template>
	<div class="bg">
		<scroll class="login">
			<div>
				<h1 class="text">登录</h1>
				<form class="form-pos">
					<input type="text" placeholder="username" class="text-input" id="text" v-model="username">
					<input type="password" placeholder="password" class="text-input" v-model="password">
					<input type="button" class="button-log" value="登录" v-on:click="toChat">
					<input type="button" class="button-reg" value="注册" v-on:click="toRegsiter">
				</form>
				<transition name="display">
					<div class="tip-box" v-show="tip!=''">
						<p class="tip">{{tip}}</p>
					</div>
				</transition>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapMutations} from 'vuex'
	import Scroll from 'base/scroll/scroll'
	import {login, check} from 'api/user'
	export default {
		data() {
			return {
				username: '',
				password: '',
				tip: ''
			}
		},
		components: {
			Scroll
		},
		activated() {
			this.checkServerToken()
			this.tip = ''
		},
		methods: {
			toChat() {
				if (this.username != '' && this.password != '' ) {
					login(this.username, this.password).then((res) => {
						if (res.username != undefined) {
							this.$router.push('/chat')
							this.setUserinfo(res)
							let userinfo  = JSON.stringify(res)
							localStorage.setItem('userinfo',userinfo)
						}
						else {
							this.tip = res
						}
					})
					this.username = ''
					this.password = ''
				}
			},
			toRegsiter() {
				this.$router.push('/register')
			},
			checkServerToken() {
				let info = JSON.parse(localStorage.getItem('userinfo'))
				if (info != null) {
					check(info.username, info.token).then((res) => {
						if (res === 'success') {
							this.$router.push('/chat')
						}
					})
				}
			},
			...mapMutations({
				setUserinfo: 'SET_USERINFO'
			})
		}
	}
</script>

<style scoped>
	.bg {
		position:absolute;
		height: 100%;
		width: 100%;
		background-image: url('~common/image/login.jpg');
		background-position: top;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.login{
		position: fixed;
    z-index: 1;
    top: 58px;
    left: 0;
    bottom: 58px;
    right: 0;
		height: 100%;
	}
	.text {
		font-size: 32px;
		font-weight: 400;
		color: rgba(255,255,255,0.8);
		position: relative;
    top: 15px;
    bottom: 0;
    left: 15px;
    right: 0;
    margin: auto;
    height: 220px;
	}
	.form-pos {
		position: relative;
		bottom: 150px;
	}
	.text-input {
		margin: 20px auto;
		display: block;
		width: 90%;
		height: 38px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		outline: none;
		font-size: 20px;
		padding-left:10px;
	}
	.button-log {
		position: relative;
		top: 20px;
		margin: 0 auto;
		display: block;
		width: 94%;
		height: 40px;
		border-radius: 20px;
		background-color: rgb(64,158,255);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.9);
	}
	.button-reg {
		position: relative;
		top: 40px;
		margin: 0 auto;
		display: block;
		width: 94%;
		height: 40px;
		border-radius: 20px;
		background-color: rgb(144,147,153);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.7);
	}
	.tip-box {
		margin: 0 auto;
		height: 40px;
		width: 120px;
		background-color: rgba(7,17,27,0.8);
		border-radius: 5px;
	}
	.tip {
		text-align: center;
		color: rgb(255,255,255);
		font-size: 18px;
		line-height: 40px;
	}
	.display-enter-active, .display-enter-active {
    transition: all 0.4s;
  }
  .display-enter, .display-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
</style>