<template>
  <div id="app">
    <!--<manager-table></manager-table>-->
<!--    <data-list></data-list>-->
    <el-button size="small" @click="$refs.optDialog.showDialog()">打开OperateDialog</el-button>
    <operate-dialog ref="optDialog"></operate-dialog>
  </div>
</template>

<script>
// import ManagerTable from './components/ManagerTable'
import DataList from './components/DataList'
import OperateDialog from "./components/OperateDialog";

export default {
  name: 'App',
  components: {
    OperateDialog,
    DataList
  }
}
</script>


<style>
  @import "assets/css/scroll.css";
  /*@import "assets/css/style.css";*/
  html{
    background: #2BC0E4;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #EAECC6, #2BC0E4);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #EAECC6, #2BC0E4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
