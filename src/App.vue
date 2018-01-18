<template>
  <div id="app">
    根目录
    <router-view>router-view</router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html.body,
  #app {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: #2a72c5;
  }
</style>