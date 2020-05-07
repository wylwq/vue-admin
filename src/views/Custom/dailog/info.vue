<template>
  <div>
    <!-- 新增弹窗 -->
    <el-dialog
      title="保存员工信息"
      :visible.sync="dialogFlag"
      :modal="false"
      @close="close"
      width="630px"
      @opened="openDialog"
    >
      <el-form :model="form" ref="addInfoForm" :rules="rules">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="userPhone">
          <el-input v-model.number="form.userPhone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth" prop="userAddress">
          <!-- <CityPick
            :cityPickLevel="['province', 'city', 'area', 'streat']"
            :cityPickData.sync="cityPickData"
          /> -->
          <el-input v-model="form.userAddress" placeholder="请输入家庭住址"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="userSex">
          <el-radio v-model="form.userSex" label="男">男</el-radio>
          <el-radio v-model="form.userSex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="userAge">
          <el-input v-model.number="form.userAge"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-checkbox-group v-model="checkedRoles" @change="handleRolesChange">
            <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :loading="submiting" @click="submit('addInfoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addUser, editUser} from "@/api/user.js";
import CityPick from "@/components/citypick/index.vue";
import {validusername, validpassword} from '@/utils/validate'
export default {
  name: "dailog",
  components: { CityPick },
  data() {
    const roleOptions = ['库存角色', '员工角色', '订单角色', '超级管理员'];
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!validusername(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        userPhone: "",
        userName: "",
        userAddress: "",
        userSex: "",
        userAge: "",
        adminFlag: ""
      },
      roles: roleOptions,
      checkedRoles: [],
      formLabelWidth: "70px",
      dialogFlag: false,
      submiting: false,
      cityPickData: {},
      rules: {
        phone: [{ validator: validateUsername, trigger: "blur" }],
        username: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    close() {
      this.dialogFlag = false;
      //子组件回调父组件
      this.$emit("close", false);
    },
    handleRolesChange(val) {
        this.checkedRoles = val;
    },
    openDialog() {
      this.submiting = false;
      let editData = this.editData;
      if(editData.id) {
        this.checkedRoles = editData.adminFlag.split(",");
      } else {
        this.form.id && delete this.form.id;
      }
      for(let key in editData) {
        this.form[key] = editData[key];
      }
      
      this.form = editData;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          console.log("请输入对应用户信息");
          return false;
        }
      });
      this.dialogFlag = false;
      this.submiting = true;
      this.form.adminFlag = this.checkedRoles.join(",");
      if(this.form.id) {
        editUser(this.form)
        .then(response => {
          this.$message({
            message: response.msg,
            type: "success"
          });
          this.submiting = false;
          //重置表单
          this.$refs["addInfoForm"].resetFields();
          this.close();
        })
        .catch(error => {
          this.$message({
            message: error.error,
            type: "error"
          });
          this.submiting = false;
        });
      } else {
        addUser(this.form)
        .then(response => {
          this.$message({
            message: response.msg,
            type: "success"
          });
          this.submiting = false;
          //重置表单
          this.$refs["addInfoForm"].resetFields();
          this.close();
        })
        .catch(error => {
          this.$message({
            message: error.error,
            type: "error"
          });
          this.submiting = false;
        });
      }
      
    },
    cancel() {
      this.dialogFlag = false;
      this.$refs["addInfoForm"].resetFields();
    }
  },
  //单向数据流 父级-->子级 , 不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editData: {
      type:Object,
      default:() => {}
    }
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.dialogFlag = newValue;
      }
    }
  },
  beforMount() {}
};
</script>
<style scoped>
</style>