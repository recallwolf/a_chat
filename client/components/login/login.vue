<template>
  <div class="login">
		<div class="headers"></div>
		<h1 class="text">登录</h1>
		<form class="form-pos" action="">
			<input type="text" class="text-input">
			<input type="text" class="text-input">
			<input type="button" class="button-log" value="登录" v-on:click="toChat">
			<input type="button" class="button-reg" value="注册" v-on:click="toRegsiter">
		</form>
		<div class="footer"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		methods: {
			toChat() {
				this.$router.push('/chat');
			},
			toRegsiter() {
				this.$router.push('/register');
			}
		}
	}
</script>

<style scoped>
	.login{
		width: 100%;
		height: 100%;
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
	.text {
		font-size: 32px;
		font-weight: 400;
		color: rgba(0,0,0,0.5);
		position: absolute;
    top: 0;
    bottom: 0;
    left: 15px;
    right: 0;
    margin: auto;
    height: 320px;
	}
	.form-pos {
		position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 240px;
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
		top: 8px;
		margin: 0 auto;
		display: block;
		width: 94%;
		height: 40px;
		border-radius: 5px;
		background-color: rgb(52,152,219);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.9);
	}
	.button-reg {
		position: relative;
		top: 20px;
		margin: 0 auto;
		display: block;
		width: 94%;
		height: 40px;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.6);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.7);
	}
	.footer {
    position: absolute;
    display: flex;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.8);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
</style>
