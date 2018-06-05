<template>
		<div class="bg">
			<span class="icon-back-pos icon-back" v-on:click="back"></span>
			<scroll class="register">
				<div>
					<h1 class="text">注册</h1>
					<form class="form-pos" action="">
						<input type="text" class="text-input" placeholder="username" v-model="username">
						<input type="text" class="text-input" placeholder="email" v-model="email">
						<input type="password" class="text-input" placeholder="password" v-model="password">
						<input type="password" class="text-input" placeholder="repassword" v-model="repassword">
						<input type="button" class="button-reg" value="确认" v-on:click="toLogin">
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
	import Scroll from 'base/scroll/scroll'
	import {check, register} from 'api/user'
	export default {
		data() {
			return {
				username: '',
				email: '',
				password: '',
				repassword: '',
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
			back() {
				this.$router.push('/login')
			},
			toLogin() {
				if (this.username != '' && this.email != '' && this.password != '' && this.repassword != '') {
					if (this.password != this.repassword) {
						this.tip = '密码不一致'
					}
					else {
						register(this.username, this.email, this.password, this.repassword).then((res) => {
							if (res === '注册成功') {
								setTimeout(() => {
									this.tip = res
									this.$router.push('/login')
								}, 1500)
							}
							else {
								this.tip = res
							}
						})
						this.username = ''
						this.email = ''
						this.password = ''
						this.repassword = ''
					}
				}
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
			}
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
	.icon-back-pos {
		position: relative;
    color: rgb(255,255,255);
    font-size: 20px;
    font-weight: bold;
    line-height: 55px;
    margin-left: 10px;
		z-index: 1;
  }
	.register {
		position: fixed;
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
		margin: 30px auto;
		display: block;
		width: 90%;
		height: 38px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		outline: none;
		font-size: 20px;
		padding-left:10px;
	}
	.button-reg {
		position: relative;
		top: 40px;
		margin: 0 auto;
		display: block;
		width: 94%;
		height: 40px;
		border-radius: 20px;
		background-color: rgb(64,158,255);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.7);
	}
	.tip-box {
		position: relative;
		bottom: 90px;
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