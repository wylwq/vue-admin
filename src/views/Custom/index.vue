<template>
  <div id="indexCustom">
    <el-form :inline="true" :model="custom" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="会员等级:">
            <el-select v-model="custom.cusMembers" placeholder="请选择">
              <el-option label="会员一" value="1"></el-option>
              <el-option label="会员二" value="2"></el-option>
              <el-option label="会员三" value="3"></el-option>
              <el-option label="会员四" value="4"></el-option>
              <el-option label="会员五" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户名称">
            <el-input placeholder="请输入客户名称" prefix-icon="el-icon-s-order" v-model="custom.cusName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户电话">
            <el-input placeholder="请输入客户电话" prefix-icon="el-icon-s-order" v-model="custom.cusPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="loadingCustomList">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="black-space-10"></div>
    <el-button type="success" icon="el-icon-circle-plus-outline" @click="addCustom">添加客户</el-button>
    <div class="black-space-10"></div>
    <!-- 表格数据 -->
    <el-table :data="tableData" 
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" 
              style="width: 100%">
      <!-- <el-table-column type="selection" width="50"></el-table-column> -->
      <el-table-column prop="cusPhone" label="客户电话" width="200"></el-table-column>
      <el-table-column prop="cusName" label="客户姓名" width="180"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="160"></el-table-column>
      <el-table-column prop="cusDiscount" label="会员折扣" :formatter="cusDiscountConventer" width="80"></el-table-column>
      <el-table-column prop="cusMembers" label="会员等级" :formatter="cusMembersConventer"></el-table-column>
      <el-table-column prop="cusAddress" label="家庭住址"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delOrderById(scope.row.id)">删除</el-button>
          <el-button size="mini" type="danger" icon="el-icon-s-order" @click="orderDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!-- 底部分页 -->
    <el-row>
      <!-- <el-col :span="8">
        <el-button size="medium" @click="delAll">批量处理</el-button>
      </el-col> -->
      <el-col :span="16">
        <el-pagination
          class="pull-right"
          :current-page="1"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
        ></el-pagination>
      </el-col>
    </el-row>
    <DialogInfo :flag="dialogFlag" @close="closeDialog" :customId="customId"/>
  </div>
</template>
<script>
import {customList, deleteCustom} from '@/api/custom.js';
import DialogInfo from "./dailog/info.vue";
export default {
  name: "indexCustom",
  components: { DialogInfo},
  data() {
    return {
      custom: {
        cusMembers: "",
        cusName: "",
        cusPhone: "",
      },

      tableData: [
       {
          cusPhone:"12345678090",
          cusName:"张三",
          createTime: "2016-05-02 12:00:00",
          cusDiscount:7.5,
          cusMembers:"5",
          cusAddress:"云南曲靖",
        }
      ],
      totalPage:0,
      page:{
        pageNumber:1,
        pageSize:10
      },
      loading:false,
      id:0,
      customId:0,
      members:["", "会员一", "会员二", "会员三", "会员四", "会员五"],
      dialogFlag:false,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.pageNumber = val;
      console.log(`当前页: ${val}`);
    },
    delOrderById(id) {
      this.id = id;
      this.confirm({
        content: "是否确认删除当前客户信息?",
        fn: this.confirmDelete
      });
    },
    confirmDelete() {
      deleteCustom(this.id).then(response => {
        this.$message({
          message:response.msg,
          type:"success"
        })
        this.id = '';
        this.loadingCustomList();
      }).catch(error => {

      })
    },
    loadingCustomList() {
      let requestData = {
        cusMembers: this.custom.cusMembers,
        cusName: this.custom.cusName,
        cusPhone: this.custom.cusPhone,
        pageSize: this.page.pageSize,
        pageNumber: this.page.pageNumber

      };
      this.loading = true;
      customList(requestData).then(response => {
          let data = response.data;
          let totalPage = response.total;
          this.tableData = data;
          this.totalPage = totalPage;
          this.loading = false;
      }).catch(error => {
          this.loading = false;
      })

    },
    addCustom() {
      this.dialogFlag = true;
    },
    orderDetail(customId) {
      this.customId = customId;
      this.dialogFlag = true;
    },
    closeDialog() {
      this.dialogFlag = false;
      this.loadingCustomList();
    },
    cusMembersConventer(row, column, cellValue, index) {
      return this.members[row.cusMembers];
    },
    cusDiscountConventer(row, column, cellValue, index) {
      return row.cusDiscount / 10;
    }
  },
  mounted:function() {
      this.loadingCustomList();
    }
};
</script>
<style lang="scss" scoped>
</style>