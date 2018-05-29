<template>
  <div class="express"></div>
</template>

<script type="text/ecmascript-6">
  import express from 'api/express'
  export default {
    data() {
      return {
        express: express
      }
    },
    created() {
      console.log(this.express)
    }
  }
</script>

<style scoped>
  .express {
    position: fixed;
    z-index: 1;
    top: 0px;
    left: 0;
    bottom: 0px;
    right: 0;
    background-color: rgb(255,255,255);
  }
</style>

