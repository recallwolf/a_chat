<template>
  <div>
		<tab></tab>
    <div class="function">
      <div class="func-list">
        <div class="func-pic">
          <img src="~common/image/doc.png" height="32px" width="32px;">
        </div>
        <div class="func-text">
          <p class="text">天气</p>
        </div>
      </div>

       <div class="func-list">
        <div class="func-pic">
          <img src="~common/image/jpg.png" height="32px" width="32px;">
        </div>
        <div class="func-text">
          <p class="text">车票</p>
        </div>
      </div>

       <div class="func-list">
        <div class="func-pic">
          <img src="~common/image/html.png" height="32px" width="32px;">
        </div>
        <div class="func-text">
          <p class="text">每日一图</p>
        </div>
      </div>

      <div class="func-list">
        <div class="func-pic">
          <img src="~common/image/pdf.png" height="32px" width="32px;">
        </div>
        <div class="func-text">
          <p class="text">快递</p>
        </div>
      </div>

      <div class="func-list">
        <div class="func-pic">
          <img src="~common/image/mp3.png" height="32px" width="32px;">
        </div>
        <div class="func-text">
          <p class="text">新闻</p>
        </div>
      </div>

    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import  Tab from 'components/tab/tab'
  export default {
    components: {
      Tab
    }
  }
</script>

<style scoped>
  .function {
    margin-top: 70px;
  }
  .func-list {
    display: flex;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .func-pic {
    margin-left: 10px;
    margin-top: 12px;
    flex: 1;
  }
  .func-text {
    flex: 7;
  }
  .text {
    line-height: 60px;
    font-size: 18px;
  }
</style>
