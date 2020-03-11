<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current': item.current}"
          v-for="item in menutab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- 登录表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username">
          <label>账号</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength='6' maxlength='20'></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength='6' maxlength='20'></el-input>
        </el-form-item>
        <el-form-item prop="code" v-show="model === 'register'">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15"><el-input v-model.number="ruleForm.code"></el-input></el-col>
            <el-col :span="9"><el-button type="success" class="block" @click="getSms()" :disabled="codeButton.status">{{codeButton.text}}</el-button></el-col>
          </el-row>
          
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="block" :disabled="loginButtonStatus">{{model === 'login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getSms, register, login} from '@/api/login.js'
import {validusername, validpassword} from '@/utils/validate'
export default {
  name: "login",
  data() {
    var checkCode = (rule, value, callback) => {
      if(this.model === 'login') {
      callback();
    }
    if (!value) {
        return callback(new Error('验证码不能为空'));
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
        }else {
            callback();
        }
    }, 1000);
    };
    var validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入手机号'));
    } else if(!validusername(value)) {
        callback(new Error('请输入正确的手机号'));
    } else {
        callback();
    }
    };
    var validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else if(validpassword(value)){
        callback(new Error('密码为6-20的数字加字母'));
    } else {
        callback();
    }
    };
    var validatePasswords = (rule, value, callback) => {
    if(this.model === 'login') {
      callback();
    }
    if (value === '') {
        callback(new Error('请在次输入密码'));
    } else if(value != this.ruleForm.password){
        callback(new Error('两次输入的密码不一样'));
    } else {
        callback();
    }
    };
    return {
    menutab: [
        { txt: "登录", current: false, type: 'login' },
        { txt: "注册", current: false, type: 'register' }
    ],
    model:'login',
    loginButtonStatus: true,
    codeButton:{
      status:false,
      text:'获取验证码'
    },
    timer : null,
    ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
    },
    rules: {
        username: [
        { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
        { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
        { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
        { validator: checkCode, trigger: 'blur' }
        ]
    },
    registerRequest:{
      username:this.ruleForm.username,
      password:this.ruleForm.password
    },
    smSRequest:{
      username:this.ruleForm.code
    },
    loginRequest:{
      username:this.ruleForm.username,
      password:this.ruleForm.password
    }
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu(item) {
      this.menutab.forEach(element => {
        element.current = false;
      });
      item.current = true;
      this.model = item.type;
      this.$refs['ruleForm'].resetFields();
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
           if (valid) {
             if(this.model === 'login') {
              this.login();
             } else {
              this.register(); 
             }
           } else {
             console.log('error submit!!');
             return false;
           }
         });
      },
    login() {
      login(this.loginRequest).then(response =>{

      }).catch(error =>{

      })
    },
    register() {
      register(this.registerRequest).then(response =>{
        root.$message({
          message:response.message,
          type:'success'
        })
        clearCountDown();
        toggleMenu(menutab[0]);
      }).catch(error => {
        //失败执行的代码
      })
    },  
    clearCountDown(){
      //还原验证码的默认状态
      this.codeButton.status = false;
      this.codeButton.text = '获取验证码';
      clearInterval(this.timer);
    },  
    getSms() {
      if(this.ruleForm.username == ''){
        this.$message.error('请输入手机号');
        return false;
      }
      if(!validusername(this.ruleForm.username)) {
        this.$message.error('请输入正确的手机号');
        return false;
      }
      this.codeButton.status = true;
      this.codeButton.text = '发送中...'
      setTimeout(()=>{
        getSms(this.smSRequest).then(response =>{
          let data = response.data;
          root.$message({
            message:data.message,
            type:'success'
          })
           //调用倒计时
          this.loginButtonStatus = false;
          this.countDown(60);
        }).catch(error =>{
      });
     }, 1000)
    },
    
    countDown(number) {
      if(this.timer){
        clearInterval(this.timer);
      }
      this.timer = setInterval(() =>{
        number --; 
        if(number === 0) {
          clearInterval(this.timer);
          this.codeButton.status = false;
          this.codeButton.text = '再次获取';
        }else {
          this.codeButton.status = true;
          this.codeButton.text = `倒计时${number}秒`;
        }
      }, 1000);
    }
  },
  
  props: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
}
.login-form{
    label{
        display: block;
        font-size: 14px;
        color: #fff;
    }
}
.block{
    display: block;
    width: 100%;
}
</style>