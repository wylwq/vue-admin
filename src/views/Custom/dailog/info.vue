<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog title="保存客户信息" :visible.sync="dialogFlag" :modal="false" @close="close" width="580px" @opened="openDialog">
      <el-form :model="form" ref="detailInfoForm">
        <el-form-item label="客户电话" :label-width="formLabelWidth" prop="cusPhone">
          <el-input v-model="form.cusPhone"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" :label-width="formLabelWidth"  prop="cusName">
          <el-input v-model="form.cusName"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" :label-width="formLabelWidth" prop="createTime">
          <el-input v-model="form.createTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="会员折扣" :label-width="formLabelWidth" prop="cusDiscount">
          <el-input v-model="form.cusDiscount" :disabled="form.id > 0"></el-input>
        </el-form-item>
        <el-form-item label="会员等级" :label-width="formLabelWidth" prop="cusMembers">
          <el-input v-model="form.cusMembers" :disabled="form.id > 0"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="cusAddress">
          <el-input v-model="form.cusAddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :loading="submiting" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {detailCustom, addCustom} from '@/api/custom.js';
export default {
  name: "dailog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id:"",
        cusPhone:"",
        cusName:"",
        createTime: "",
        cusDiscount:"",
        cusMembers:"",
        cusAddress:"",
      },
      submiting:false,
      formLabelWidth: "70px",
      dialogFlag: false,
      id:0,
    };
  },
  methods:{
    close() {
        this.dialogFlag = false;
        //子组件回调父组件
        this.$emit('close', false);
    },
    openDialog(){
      if(this.customId) {
        this.id = this.customId;
      detailCustom(this.id).then(response => {
        let data = response.data;
        this.form = data;
      }).catch(error => {

      })
      }
      
    },
    cancel() {
      this.dialogFlag = false;
      this.$refs['detailInfoForm'].resetFields();
    },
    submit() {
      if(!this.form.cusPhone) {
        this.$message({
          message:"客户联系方式不能为空",
          type:'error'
        })
        return false;
      }
      if(!this.form.cusName) {
        this.$message({
          message:"客户名称不能为空",
          type:'error'
        })
        return false;
      }
      if(!this.form.cusAddress) {
        this.$message({
          message:"客户家庭住址不能为空",
          type:'error'
        })
        return false;
      }
      this.dialogFlag = false;
      this.submiting = true;
      addCustom(this.form).then(response => {
        this.$message({
          message:response.msg,
          type:'success'
        })
        this.submiting = false;
        //重置表单
        this.$refs['addInfoForm'].resetFields();
        this.$emit("closeDialog");//C:\Users\ASUS\Downloads,https://github.com/fo40225/tensorflow-windows-wheel
      }).catch(error => {
        this.submiting = false;
      })
    },
  },
  //单向数据流 父级-->子级 , 不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    customId:{
      type:Number,
      require:true
    }
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.dialogFlag = newValue;
      }
    }
  }
};
</script>
<style scoped>
</style>