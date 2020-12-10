<template>
    <custom-dialog :show="show" @before-close="show=false" title="添加链接" width="500px"
                   @opened="$refs.form.resetFields()">
        <el-main slot="body">
            <el-form ref="form" :model="formData"  :rules="verifyRules" status-icon size="mini" label-width="80px">
                <el-form-item label="网站标题" prop="title" required>
                    <el-input v-model="formData.title" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" prop="link" required>
                    <el-input v-model="formData.link" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标地址" prop="favicon" required>
                    <el-input v-model="formData.favicon" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="网站类型" prop="type" required>
                    <el-select v-model="formData.type" style="width: 100%;" placeholder="请选择网站类型">
                        <el-option
                                v-for="opt in typeList"
                                :label="opt"
                                :value="opt"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="网站介绍" required prop="descript">
                    <el-input
                            style="width: 100%;"
                            type="textarea"
                            v-model="formData.descript"
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
        titleVal(rule, value, callback){
            if (!value)return callback(new Error('标题不能为空'));
            let maxLength = 15
            if(value.length > maxLength)return callback(new Error(`标题不能超过${maxLength}个字符`));
            callback()
        },
        linkVal(rule, value, callback){
            if (!value)return callback(new Error('链接地址不能为空'));
            callback()
        },
        faviconVal(rule, value, callback){
            if (!value)return callback(new Error('图标地址不能为空'));
            callback()
        },
    };

    import CustomDialog from "./common/CustomDialog";
    export default {
        name: "OperateDialog",
        data() {
            return {
                show: false,
                formData: {
                    title: "",
                    link: "",
                    favicon: "",
                    type: "",
                    descript: "",
                },
                typeList: ["leixin1", "leixin2", "leixin3", "leixin4", "leixin5"],
                verifyRules: {
                    title: [
                        { validator: Validator.titleVal, trigger: 'blur' }
                    ],
                    link: [
                        { validator: Validator.linkVal, trigger: 'blur' }
                    ],
                    favicon: [
                        { validator: Validator.faviconVal, trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择链接类型', trigger: 'change' }
                    ],
                    descript: [
                        { required: true, message: '请输入网站说明', trigger: 'blur' }
                    ],
                },
                isEdit: false,
                autoFulling:false
            };
        },
        components: {
            CustomDialog,
        },
        methods:{
            submit(){
                this.$refs.form.validate(isValid=>{
                    console.log(isValid)
                })
            },
            showDialog(){
                this.show = true;
            },
            autoFull(){
                this.$refs.form.validateField('link', errorMessage => {
                    if(!errorMessage){
                        this.autoFulling = true;
                        setTimeout(()=>{
                            this.autoFulling = false;
                        },3000)
                    }else{
                        this.$alert(errorMessage,{type:'error'});
                    }
                })
            }
        },
        computed:{
            confirmText(){
                return this.isEdit ? '编辑' : '添加'
            },
            autoFullText(){
                return this.autoFulling ? '正在获取相关信息' : '自动获取相关信息'
            }
        }
    }
</script>

<style>
    .el-textarea .el-input__count{
        background: none!important;
        color:#409EFF;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>