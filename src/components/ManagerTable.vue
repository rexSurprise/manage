<template>
  <table class="gridtable" cellspacing="0">
    <caption><h2>欢迎来到链接管理平台</h2></caption>
    <tr>
      <th>标识</th>
      <th>链接</th>
      <th>图标</th>
      <th>标题</th>
      <th>描述</th>
      <th>分类</th>
      <th>操作</th>
    </tr>
    <tr v-for="(item, index) in tableData" :key="index" :class="{'del-active': index === currentIndex && isDel}">
      <td>
        <p v-if="index === currentIndex && (isEdit || isAdd)"><label><input type="text" v-model="currentStatus['lid']"
                                                                            disabled></label></p>
        <p v-else>{{ item['lid'] }}</p>
      </td>
      <td>
        <p v-if="index === currentIndex && (isEdit || isAdd)">
          <label>
          <input type="text"
                 v-model="currentStatus['link']">
          </label>
        </p>
        <p v-else>{{ item['link'] }}</p>
      </td>
      <td>
        <p v-if="index === currentIndex && (isEdit || isAdd)"><label><input type="text"
                                                                            v-model="currentStatus['favicon']"></label>
        </p>
        <p v-else>{{ item['favicon'] }}</p>
      </td>
      <td>
        <p v-if="index === currentIndex && (isEdit || isAdd)"><label><input type="text"
                                                                            v-model="currentStatus['title']"></label>
        </p>
        <p v-else>{{ item['title'] }}</p>
      </td>
      <td>
        <p v-if="index === currentIndex && (isEdit || isAdd)">
          <label>
            <input type="text" v-model="currentStatus['describe']">
          </label>
        </p>
        <p v-else>{{ item['describe'] }}</p>
      </td>
      <td>
        <p v-if="index === currentIndex && (isEdit || isAdd)">
          <label>
            <select v-model="currentStatus['category']">
              <option v-for="category in categories"
                      :value="category">
                {{ category }}
              </option>
            </select>
          </label>
        </p>
        <p v-else>{{ item['category'] }}</p>
      </td>
      <td v-if="(isAdd || isEdit || isDel) && currentIndex === index">
        <p class="button">
          <button @click="btnOK(index)">确定</button>
          <button @click="btnCancel">取消</button>
        </p>
      </td>
      <td v-else>
        <p class="button confirm">
          <button @click="editClick(index)">编辑</button>
          <button @click="delClick(index)">删除</button>
        </p>
      </td>
    </tr>
    <tfoot>
    <tr>
      <td colspan="7">
        <button @click="addClick" :disabled="isAdd">+</button>
        <button @click="autoFullClick" v-if="isAdd" style="margin-left: 10px;">autoFull</button>
      </td>
    </tr>
    </tfoot>
  </table>
</template>

<script>
  import NetworkManager from '../network/manager'

  export default {
    name: "ManagerTable",
    data() {
      return {
        tableData: [],
        currentIndex: -1,
        currentStatus: {},
        isAdd: false,
        isEdit: false,
        isDel: false,
        categories: ['官方推荐', '在线工具', '资源仓库', '媒体解析', '其他网站']
      }
    },
    created: function () {
      NetworkManager.queryTableData().then((d) => {
        this.tableData = d.data;
      });
    },
    methods: {
      clone(obj) {
        if (obj === null) return null;
        if (typeof obj !== 'object') return obj;
        if (obj.constructor === Date) return new Date(obj);
        let newObj = new obj.constructor();  //保持继承链
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
            let val = obj[key];
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
          }
        }
        return newObj;
      },
      editClick(index) {
        this.isEdit = true;
        this.currentIndex = index;
        this.currentStatus = this.clone(this.tableData[index]);
      },
      addClick() {
        this.currentIndex = this.tableData.length;
        this.isAdd = true;
        this.tableData.push({lid: '', link: '', favicon: '', title: '', describe: ''});
        this.currentStatus = {};
      },
      delClick(index) {
        this.isDel = true;
        this.currentIndex = index;
      },
      btnOK(index) {
        console.log(this.tableData);
        if (this.isAdd) {
          this.isAdd = false;
          //数据库添加
          NetworkManager.addTableData(this.currentStatus).then((d) => {
            if (d.code !== 200) {
              alert('请求失败, 错误代码' + d.code)
            }
            else {
              this.tableData[index] = this.clone(this.currentStatus);
              console.log(this.currentStatus);
              location.reload();
            }
          });

        } else if (this.isEdit) {
          this.isEdit = false;
          //数据库添加
          NetworkManager.updateTableData(this.currentStatus).then((d) => {
            if (d.code !== 200) {
              alert('请求失败, 错误代码' + d.code)
            }
            else {
              this.tableData[index] = this.clone(this.currentStatus);
              console.log(this.currentStatus);
            }
          });

        } else if (this.isDel) {
          this.isDel = false;
          NetworkManager.delTableData(this.tableData[index]['lid']).then((d) => {
            if (d.code !== 200) {
              alert('请求失败, 错误代码' + d.code)
            }
            else {
              console.log('已经删除:' + this.tableData[index]['lid']);
              this.tableData.splice(index, 1);
              this.currentStatus = {};
            }
          });
        }
        this.currentIndex = -1;
        console.log(this.tableData);
      },
      btnCancel(index) {
        if (this.isAdd) {
          this.isAdd = false;
          this.tableData.pop();
        } else if (this.isEdit) {
          this.isEdit = false;
          this.currentStatus = this.clone(this.tableData[index]);
        } else if (this.isDel) {
          this.isDel = false;
        }
        this.currentIndex = -1;
      },
      autoFullClick(){
        if(this.currentStatus.link === '')return false;
        NetworkManager.queryLinkData(this.currentStatus.link).then((d)=>{
          if(d.code !==200){
            alert('请求失败, 错误代码' + d.code);
          }
          else{
            for(let key in d.data){
              this.currentStatus[key] = d.data[key];
            }
            console.log(this.currentStatus);
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>