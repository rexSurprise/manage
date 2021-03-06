<template>
  <custom-dialog :show="show"
                 @before-close="show=false"
                 :title="titleText"
                 @closed="$refs.form.resetFields()"
                 width="500px">
    <el-main slot="body">
      <el-form ref="form" :model="formData" :rules="verifyRules" status-icon size="mini" label-width="80px">
        <el-form-item label="网站标题" prop="title" >
          <el-input v-model="formData.title" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="link" >
          <el-input v-model="formData.link" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标地址" prop="favicon" >
          <el-input v-model="formData.favicon" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站类型" prop="category" >
          <el-select value="1" v-model="formData.category" style="width: 100%;" placeholder="请选择网站类型">
            <el-option
              v-for="category in categories"
              :label="category"
              :value="category"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站介绍" prop="describe">
          <el-input
            style="width: 100%;"
            type="textarea"
            v-model="formData.describe"
            maxlength="200"
            show-word-limit
            rows="5"
            cols="40"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click=submit>{{confirmText}}</el-button>
          <el-button @click="show=false">取消</el-button>
          <el-button type="info" @click="autoFull" :loading="autoFulling">{{autoFullText}}</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </custom-dialog>
</template>

<script>
  const Validator = {
    titleVal(rule, value, callback) {
      if (!value) return callback(new Error('标题不能为空'));
      let maxLength = 15;
      if (value.length > maxLength)
        return callback(new Error(`标题不能超过${maxLength}个字符`));
      callback()
    },
    linkVal(rule, value, callback) {
      if (!value) return callback(new Error('链接地址不能为空'));
      callback()
    },
    faviconVal(rule, value, callback) {
      if (!value) return callback(new Error('图标地址不能为空'));
      callback()
    },
    category(rule, value, callback){
      if (!value) return callback(new Error('请选择链接类型'));
      callback()
    },
    describe(rule, value, callback){
      if (!value) return callback(new Error('请输入网站说明'));
      callback()
    }
  };

  import CustomDialog from "./common/CustomDialog";
  import NetworkManager from "../network/manager"
  export default {
    name: "OperateDialog",
    data() {
      return {
        show: false,
        formData: {
          title: "",
          link: "",
          favicon: "",
          category: "",
          describe: "",
        },
        categories: ['官方推荐', '在线工具', '资源仓库', '媒体解析', '其他网站', 'SEARCH'],
        verifyRules: {
          title: [
            {validator: Validator.titleVal, trigger: 'blur'}
          ],
          link: [
            {validator: Validator.linkVal, trigger: 'blur'}
          ],
          favicon: [
            {validator: Validator.faviconVal, trigger: 'blur'}
          ],
          category: [
            {validator: Validator.category, trigger: 'blur'}
          ],
          describe: [
            {validator: Validator.describe, trigger: 'blur'}
          ],
        },
        isEdit: false,
        autoFulling: false
      };
    },
    components: {
      CustomDialog,
    },
    methods: {
      submit() {
        this.$refs.form.validate(isValid => {
          if(!isValid)
            return;
          return this.isEdit ? this.updateLinkData() : this.appendLinkData()
        })
      },
      showDialog(edit=false,row=null) {
        this.show = true;
        this.isEdit = edit;
        if(!edit){
          this.formData = {
            title: "",
            link: "",
            favicon: "",
            category: "",
            describe: "",
          };
        }else this.formData = row;
      },
      autoFull() {
        this.$refs.form.validateField('link', errorMessage => {
          if (!errorMessage) {
            this.autoFulling = true;
            NetworkManager.queryLinkData(this.formData.link).then(res=>{
              if (res.code !== 200) {
                this.$alert('数据获取失败! 错误代码: ' + res.code, {type:'error'})
              }else{
                this.$message({message:'数据获取完成',type:'success'});
                this.autoFulling = false;
                Object.keys(res.data).forEach(key=>this.formData[key]=res.data[key])
              }
            })
          } else {
            this.$alert(errorMessage, {type: 'error'});
          }
        })
      },
      appendLinkData(){
        NetworkManager.addTableData(this.formData).then(res=>{
          if (res.code !== 200) {
            this.$alert('数据添加失败! 错误代码: ' + res.code, {type:'error'})
          }else{
            this.$message({message:'数据添加完成',type:'success'});
            this.show = false;
            this.$emit('append-data', this.formData)
          }
        })
      },
      updateLinkData(){
        NetworkManager.updateTableData(this.formData).then(res=>{
          if (res.code !== 200) {
            this.$alert('数据更新失败! 错误代码: ' + res.code, {type:'error'})
          }else{
            this.$message({message:'数据更新完成',type:'success'});
            this.show = false;
            this.$emit('update-data', this.formData)
          }
        })
      },
      deleteLinkData(lid){
        NetworkManager.delTableData(lid).then(res=>{
          if (res.code !== 200) {
            this.$alert('数据删除失败! 错误代码: ' + res.code, {type:'error'})
          }else{
            this.$message({message:'数据删除完成',type:'success'});
            this.show = false;
            this.$emit('delete-data', lid)
          }
        })
      }
    },
    computed: {
      confirmText() {
        return this.isEdit ? '编辑' : '添加'
      },
      autoFullText() {
        return this.autoFulling ? '正在获取相关信息' : '自动获取相关信息'
      },
      titleText(){
        return this.isEdit? '编辑链接': '添加链接';
      }
    }
  }
</script>

<style>
  .el-textarea .el-input__count {
    background: none !important;
    color: #409EFF;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>