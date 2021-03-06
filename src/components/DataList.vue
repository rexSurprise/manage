<template>
  <el-container>
    <el-main>
      <div class="search-box">
        <h1 style="width: 100%;text-align: center;color: #fff;">数据总览</h1>
        <div class="opt-box">
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
          </el-button>
        </div>
      </div>
      <el-table
        style="width: 100%"
        :data="dataList"
        height="calc(100vh - 100px)"
        :row-key="row=>row.lid"
        border>
        <el-table-column
          type="selection"
          width="60"
        ></el-table-column>
        <el-table-column type="index"
                         label="序号"
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
        fixedDataList: [],
        dataList: [],
        searchKeyWord: '',
        show: false
      }
    },
    created() {
      this.queryDataList()
    },
    methods: {
      editRow($index) {
        const _data = {};
        Object.keys(this.dataList[$index]).forEach(key => {
          _data[key] = this.dataList[$index][key]
        });
        this.$refs.optDialog.showDialog(true, _data);
        this.show = true;
      },
      searchList() {
        this.dataList =
          this.fixedDataList.filter(row => JSON.stringify(row).toLowerCase().search(
            this.searchKeyWord.toLowerCase()) !== -1)
      },
      appendData() {
        this.$refs.optDialog.showDialog();
      },
      queryDataList(){
        NetworkManager.queryTableData().then(res => {
          this.fixedDataList = this.dataList = res.data;
        })
      }
    },
    components: {
      OperateDialog,
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

  .el-table__empty-text {
    color: #eee;
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
</style>