<template>
  <div id="indexUser">
    <el-form :inline="true" :model="user" class="demo-form-inline">
      <el-row>
         <el-col :span="20">
          <el-col :span="5">
            <el-form-item>
              <el-input placeholder="手机号" prefix-icon="el-icon-mobile-phone" v-model="user.userPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input
                placeholder="地址"
                prefix-icon="el-icon-location-outline"
                v-model="user.address"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="性别:">
              <el-select v-model="user.sex" placeholder="请选择">
                <el-option label="男性" value="男"></el-option>
                <el-option label="女性" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="user.userName"></el-input>
            </el-form-item>
          </el-col>
          </el-col>
          <el-col :span="4">
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button>
          </el-col>
          </el-col>
      </el-row>
    </el-form>
    <div class="black-space-10"></div>
    <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialogFlag = true">新增用户</el-button>
    <div class="black-space-10"></div>
    <div class="black-space-10"></div>
    <TableVue ref="userTable" :config="tableConfig">
      <!-- <template v-slot:status="slotData">
          <el-switch v-model="slotData.data.status" active-color="#13ce66" @change="activeUser(slotData.data)"
          active-value="1" inactive-value="2" inactive-color="#ff4949" ></el-switch>
      </template> -->
      <template v-slot:operation="slotData">
          <el-button type="warning"  icon="el-icon-edit" size="mini" class="a" @click="edit(slotData.data)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(slotData.data)">删除</el-button>
      </template>
    </TableVue>
    <DialogInfo :flag="dialogFlag" :editData="editData" @close="closeDialog"/>
  </div>
</template>
<script>
import TableVue from "@/components/table/index.vue";
import {requestUrl} from "@/api/requesturl.js";
import DialogInfo from "./dailog/info.vue";
import {DelUser} from "@/api/user.js";
export default {
  name: "indexUser",
  components: { TableVue, DialogInfo },
  data() {
    return {
      user: {
        userPhone: "",
        address: "",
        sex: "",
        userName: ""
      },
      tableConfig: {
        selection: false,
        recordCheckbox: true,
        req: {
          url : requestUrl.userList,
          method: 'post',
          data:{
            pageNumber:1,
            pageSize:10
          }
        },
        tableHeader: [
          { label: "电话", field: "userPhone",width: "130px" },
          { label: "姓名", field: "userName" },
          { label: "地址", field: "userAddress" },
          { label: "年龄", field: "userAge" , width: "100px"},
          { label: "性别", field: "userSex" ,width: "100px"},
          { label: "角色", field: "adminFlag" },
          //{
           // label: "状态",
           // field: "status",
           // columnType: "slot",
           // slotName: "status"
          //},
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation"
          }
        ],
        tableBody: []
      },
      dialogFlag: false,
      editData:{},
      id:"",
    };
  },
  methods:{
    edit(data) {
      this.editData = JSON.parse(JSON.stringify(data));
      this.dialogFlag = true;
      //子组件调用父组件的方法
      this.$refs['userTable'].refresh();
    },
    del(data) {
      this.id = data.id;
      this.confirm({
        content: "是否确认删除选中的用户信息?",
        fn: this.delUser
      });
      //子组件调用父组件的方法
    },
    delUser() {
      DelUser(this.id).then(response => {
        this.$message({
            message: response.msg,
            type: "success"
          });
        this.$refs['userTable'].refresh();
        this.id = "";
      }).catch(error => {
        this.$message({
            message: error.msg,
            type: "error"
          });
      })
    },
    closeDialog() {
      this.dialogFlag = false;
      this.dialogFlagEdit = false;
      this.$refs['userTable'].refresh();
    },
    searchUser() {
      this.$refs['userTable'].paramsRefresh(this.user);
    }
  },
  beforeMount() {
  }
};
</script>
<style lang="scss" scoped>
</style>