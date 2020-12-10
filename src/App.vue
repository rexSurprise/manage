<template>
  <div id="app">
    <data-list></data-list>
  </div>
</template>

<script>
import DataList from './components/DataList'

export default {
  name: 'App',
  components: {
    DataList
  }
}
</script>


<style>
  @import "assets/css/scroll.css";
  /*@import "assets/css/style.css";*/
  html{
    background: #2BC0E4;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #EAECC6, #2BC0E4);
    background: linear-gradient(to right, #EAECC6, #2BC0E4);
  }
</style>
