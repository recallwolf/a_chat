<template>
	<transition name="slide">
		<div>
			<div class="headers">
				<span class="icon-back-pos icon-back" v-on:click="back"></span>
			</div>
			<scroll class="register">
				<div>
					<h1 class="text">注册</h1>
					<form class="form-pos" action="">
						<input type="text" class="text-input" placeholder="id">
						<input type="text" class="text-input" placeholder="email">
						<input type="text" class="text-input" placeholder="password">
						<input type="text" class="text-input" placeholder="repassword">
					<input type="button" class="button-reg" value="确认" v-on:click="toChat">
					</form>
				</div>
			</scroll>
			<div class="footer"></div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	export default {
		components: {
			Scroll
		},
		methods: {
			back() {
				this.$router.push('/login')
			},
			toChat() {
				this.$router.push('/chat')
      }
    }
	}
</script>

<style scoped>
	.headers {
    position: fixed;
    display: flex;
    top: 0;
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
	.register {
		position: fixed;
    z-index: -1;
    top: 58px;
    left: 0;
    bottom: 58px;
    right: 0;
		height: 100%;
    background-color: rgb(255,255,255);
	}
	.text {
		font-size: 32px;
		font-weight: 400;
		color: rgba(0,0,0,0.5);
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
		background-color: rgb(144,147,153);
		border: none;
		font-size: 20px;
		color: rgba(255,255,255,0.7);
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
	.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>