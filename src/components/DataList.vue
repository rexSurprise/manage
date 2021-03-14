<template>
  <el-container>
    <el-header height="30" class="header">
      <i></i>
      <h2 style="margin:10px 0">导航链接管理</h2>
      <div class="search-box">
        <el-input
        size="small"
        style="width: 200px;"
        placeholder="请输入内容"
        clearable
        v-model="searchKeyWord"
        @clear="searchList"
        @keyup.enter.native="searchList">
        <i slot="suffix"
           class="el-input__icon el-icon-search" @click="searchList"></i>
      </el-input>
        <el-button size="small"
                   @click="appendData"
                   plain icon="el-icon-plus">添加链接
        </el-button></div>
    </el-header>
    <el-main>
      <el-table
        style="width: 100%"
        :data="dataList"
        v-loading="loading"
        height="calc(100vh - 120px)"
        :row-key="row=>row.lid"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        border>
        <el-table-column
          type="selection"
          width="60"
        ></el-table-column>
        <el-table-column type="index"
                         label="序号"
                         :index="$index=>(page - 1) * rows + $index + 1"
                         width="60"
        ></el-table-column>
        <el-table-column label="图标"
                         prop="favicon"
                         width="50"
                         show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-avatar :size="30" :src="row.favicon" @error="true">
              <el-avatar :size="30" icon="el-icon-link"></el-avatar>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="标题"
                         prop="title"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="链接"
                         prop="link"
                         width="150"
                         show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-link :underline="false" type="primary" :href="row.link" target="_blank">
              {{row.link}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="图标"
                         prop="favicon"
                         show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="类型"
                         prop="category"
                         width="100"
        ></el-table-column>
        <el-table-column label="说明"
                         prop="describe"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{$index}">
            <el-button size="small" @click="editRow($index)"
                       type="warning" plain>编辑
            </el-button>
            <i style="display: inline-block;width: 10px;"></i>
            <el-popconfirm
              icon-color="red"
              @confirm="$refs.optDialog.deleteLinkData(dataList[$index].lid)"
              title="确定删除吗？"
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[20, 50, 100, 200, 300, 400]"
        :page-size="rows"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <operate-dialog ref="optDialog"
                      @append-data="queryDataList"
                      @delete-data="queryDataList"
                      @update-data="queryDataList">
      </operate-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import NetworkManager from '../network/manager'
  import OperateDialog from "./OperateDialog";

  export default {
    name: "DataList",
    data() {
      return {
        dataList: [],
        searchKeyWord: '',
        loading: false,
        rows: 20,
        page: 1,
        total: 0
      }
    },
    created() {
      this.queryDataList()
    },
    methods: {
      editRow($index) {
        this.$refs['optDialog'].showDialog(true, {...this.dataList[$index]});
      },
      searchList() {
        this.queryDataList({keyword:this.searchKeyWord})
      },
      appendData() {
        this.$refs.optDialog.showDialog();
      },
      queryDataList(queryData={}){
        const _query = {...queryData}
        _query.rows = this.rows
        _query.page = this.page
        this.loading = true
        NetworkManager.queryTableData(_query).then(res => {
          if(res.code !== 200){
            this.loading = false
            return this.$error('数据加载失败!,错误代码' + res.code)
          }
          this.dataList = res.data
          this.total = res.total
          this.loading = false
        }).catch(_=>this.$error())
      },
      handleSizeChange(pageSize){
        this.rows = pageSize
        this.queryDataList()
      },
      handleCurrentChange(currentPage){
        this.page = currentPage
        this.queryDataList()
      }
    },
    components: {
      OperateDialog,
    }
  }
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .header>*{
    flex-basis: 33.33%
  }
  .search-box{
    display: flex;
    align-self: flex-end;
    justify-content: flex-end;
  }
  .el-container > .el-main,.header{
    padding: 5px;
  }
  .el-table__header thead {
    background-image: linear-gradient(rgba(79, 160, 196, 0.8), rgba(70, 200, 255, 0.8));
    color: #000;
  }

  .el-table td, .el-table th{
    padding: 5px 0;
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

  thead .cell {
    color: antiquewhite;
  }

  .cell {
    text-align: center;
  }

  .el-table {
    background: transparent;
  }

  .el-table::before, .el-table::after {
    height: 0;
    width: 0;
  }

  .el-table--border, .el-table--group {
    border: none;
  }

  .el-table--border::after, .el-table--group::after {
    width: 0;
  }

  .opt-box {
    width: 300px;
    position: fixed;
    top: 2rem;
    right: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-pagination{
    justify-content: center;
    height: 45px;
    display: flex;
    align-items: center;
  }
</style>