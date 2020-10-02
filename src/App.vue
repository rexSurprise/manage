<template>
  <div id="app">
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
  @import "assets/css/scroll.css";
  @import "assets/css/style.css";
</style>
