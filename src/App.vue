<template>
  <router-view>
    <div id="app">
      <demoEntry />
    </div>
  </router-view>
</template>

<script>
// import demoMain from './components/DemoMain.vue'
import demoEntry from './view/DemoEntry.vue'
export default {
  name: 'App',
  components: {
    // demoMain,
    demoEntry
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
