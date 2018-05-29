<template>
	<div class="bg">
		<scroll class="login">
			<div>
				<h1 class="text">登录</h1>
				<form class="form-pos">
					<input type="text" placeholder="id" class="text-input" id="text" v-model="username">
					<input type="password" placeholder="password" class="text-input" v-model="password">
					<input type="button" class="button-log" value="登录" v-on:click="toChat">
					<input type="button" class="button-reg" value="注册" v-on:click="toRegsiter">
				</form>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios'
	import {mapMutations} from 'vuex'
	import Scroll from 'base/scroll/scroll'
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		components: {
			Scroll
		},
		mounted() {
			this.checkServerToken()
		},
		methods: {
			toChat() {
				if (this.username != '' && this.password != '' ) {
					axios.post('/api/login', {
    				username: this.username,
    				password: this.password
  				}).then((res) => {
    				this.$router.push('/chat')
						this.setUserinfo(res.data)
						let userinfo  = JSON.stringify(res.data)
						localStorage.setItem('userinfo',userinfo)
  				})
				}
			},
			toRegsiter() {
				this.$router.push('/register')
			},
			checkServerToken() {
				let info = JSON.parse(localStorage.getItem('userinfo'))
				if (info != null) {
					axios.post('/api/check', {
						username: info.username,
						token: info.token
					}).then((res) => {
						if (res.data === 'success') {
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
</style>