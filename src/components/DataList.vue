<template>
  <el-container>
    <el-main>
      <div class="search-box">
        <h1 style="width: 100%;text-align: center;color: #fff;">数据总览</h1>
        <el-input
          size="small"
          placeholder="请输入内容"
          v-model="searchKeyWord"
          @keyup.enter.native="searchList"
          style="width: 200px;position: fixed; top: 2rem;right: 3rem">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-table
        style="width: 100%"
        :data="dataList"
        height="calc(100vh - 100px)"
        border>
        <el-table-column
          type="selection"
          width="60"
        ></el-table-column>
        <el-table-column type="index"
                         label="序号"
                         width="60"
        ></el-table-column>
        <el-table-column label="ID"
                         prop="lid"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="标题"
                         prop="title"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="说明"
                         prop="describe"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="图标"
                         prop="favicon"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="链接"
                         prop="link"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{$index}">
            <el-button size="small" @click="editRow($index)"
                       type="warning" plain>编辑
            </el-button>
            <i style="display: inline-block;width: 10px;"></i>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
            >
              <el-button
                slot="reference"
                size="small"
                type="danger"
                plain>删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <custom-dialog :show="show" @before-close="show=false"></custom-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import NetworkManager from '../network/manager'
  import CustomDialog from './common/custom_dialog'

  export default {
    name: "DataList",
    data() {
      return {
        fixedDataList: [],
        dataList: [],
        searchKeyWord: '',
        show: false
      }
    },
    created() {
      NetworkManager.queryTableData().then(res => {
        this.fixedDataList = this.dataList = res.data;
      })
    },
    methods: {
      editRow($index) {
        console.log(this.dataList[$index]);
        this.show = true;
      },
      searchList() {
        this.dataList =
          this.fixedDataList.filter(row => JSON.stringify(row).toLowerCase().search(
            this.searchKeyWord.toLowerCase()) !== -1)
      }
    },
    components: {
      CustomDialog
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  .search-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 40px;
    text-align: right;
    margin-bottom: 20px;
  }

  .el-table__header thead {
    background-image: linear-gradient(rgba(79, 160, 196, 0.8), rgba(70, 200, 255, 0.8));
    color: #000;
  }

  .el-table th, .el-table tr {
    background: none;
  }

  .el-table tr.el-table__row {
    background-image: linear-gradient(to right, #efdecaf0, #f7fceef0, #ffcffbf0);
  }

  .el-table tr.el-table__row:hover,
  .el-table__body tr.current-row > td,
  .el-table__body tr:hover > td {
    background: linear-gradient(#bfcffbf0, #b7fceef0, #bfdecaf0) !important;
  }
  thead .cell{
    color: antiquewhite;
  }
  .cell{
    text-align: center;
  }
  .el-table{
    background: transparent;
  }
  .el-table::before,.el-table::after{
    height: 0;
    width: 0;
  }
  .el-table--border, .el-table--group{
    border: none;
  }
  .el-table--border::after, .el-table--group::after{
    width: 0;
  }
  .el-table__empty-text{
    color: #eee;
  }
</style>