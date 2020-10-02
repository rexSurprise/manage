<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <manager-table></manager-table>
  </div>
</template>

<script>
import ManagerTable from './components/ManagerTable'

export default {
  name: 'App',
  components: {
    ManagerTable
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
  margin-top: 60px;
}
</style>
