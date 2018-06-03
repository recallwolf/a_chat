<template>
  <div>
    <div class="header">
      <p class="title">尬聊</p>
      <span class="icon-pos icon-signs"></span>
    </div>
    <div class="footer">
      <div class="icon-layout">
        <router-link class="icon" to='/chat'><span class="icon-chat"></span></router-link>
        <router-link class="icon" to='/home'><span class="icon-house"></span></router-link>
        <router-link class="icon" to='/setting'><span class="icon-settings"></span></router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style scoped>
  .header {
    position: fixed;
    display: flex;
    top: 0px;
    width: 100%;
    height: 60px;
    background-image: url('~common/image/nav.jpg');
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .title {
    flex: 1;
    margin-left: 10px;
    color: rgb(255,255,255);
    font-weight: 550;
    line-height: 60px;
    font-size: 22px;
  }
  .icon-pos {
    flex: 1;
    color: rgb(255,255,255);
    font-size: 22px;
    font-weight: bold;
    line-height: 60px;
    margin-right: 10px;
    text-align: right;
  }
  .footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 55px;
    background-color: rgb(248,248,255);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .icon-layout {
    display: flex;
  }
  .icon {
    flex: 1;
    text-align: center;
    vertical-align: middle;
    font-size: 25px;
    line-height: 55px;
  }
  .active {
    color: rgb(52,152,219);
  }
  a {
    color: rgb(149,165,166);
    text-decoration: none;
  }
</style>