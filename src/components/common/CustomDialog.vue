<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    :width="width"
    :modal-append-to-body="append2body"
    :close-on-click-modal="false"
    v-drag-move
    custom-class="custom-dialog"
    @opened="$emit('opened', $event)"
    @closed="$emit('closed', $event)"
    :before-close="handleClose">
    <div class="save-container" v-if="showconfirm">
      <el-button icon="el-icon-printer"  @click="confirmClick" size="mini">{{confirm}}</el-button>
    </div>
    <slot name="body"></slot>
    <slot name="footer" slot="footer"></slot>
  </el-dialog>
</template>

<script>
  export default {
    name: "CustomDialog",
    props: {
      width: {
        type: String,
        default: '50%'
      },
      title: {
        type: String,
        default: 'CustomDialog',
      },
      confirm: {
        type: String,
        default: '保存',
      },
      show: {
        type: Boolean,
        default: false
      },
      showconfirm: {
        type: Boolean,
        default: false
      },
      append2body: {
        type: Boolean,
        default: false
      },
    },
    methods:{
      handleClose(e){
        this.$emit('before-close', e);
      },
      confirmClick(e){
        this.$emit('confirm-click', e);
      }
    }
  }
</script>

<style>
  .custom-dialog .save-container {
    height: 30px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0 40px 2px 40px;
  }
  .custom-dialog .el-dialog__headerbtn {
    width: 36px;
    height: 36px;
    top: 0 !important;
  }
  .custom-dialog .el-dialog__headerbtn:hover {
    background-color: rgb(79, 160, 255);
  }
  .custom-dialog.el-dialog>.el-dialog__header{
    padding: 0 10px 0 30px;
    height: 36px;
    background-color: #2e82e4;
    color:#fff;
    font-size:14px;
  }
  .custom-dialog.el-dialog>.el-dialog__header>.el-dialog__title{
    color:#fff;
    font-size:14px;
    line-height: 36px;
  }
  .custom-dialog.el-dialog>.el-dialog__header>.el-dialog__headerbtn{
    top:10px;
  }
  .custom-dialog.el-dialog>.el-dialog__header>.el-dialog__headerbtn>.el-dialog__close{
    color:#fff;
  }
  .custom-dialog.el-dialog>.el-dialog__body{
    padding: 0;
  }
  .custom-dialog.el-dialog>.el-dialog__header>.el-dialog__headerbtn:hover{
    background-color: #FF4E61;
  }
</style>