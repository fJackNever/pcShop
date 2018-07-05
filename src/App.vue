<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "assets/style/common";
  @import "assets/style/reset";

  #app {
    height:100%;
  }
</style>
