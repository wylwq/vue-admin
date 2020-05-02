<template>
  <div id="indexOrder">
    <el-form :inline="true" :model="order" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单状态:">
            <el-select v-model="order.orderStatus" placeholder="请选择">
              <el-option label="已删除" value="1"></el-option>
              <el-option label="已发货" value="2"></el-option>
              <el-option label="未发货" value="8"></el-option>
              <el-option label="未出库" value="3"></el-option>
              <el-option label="已出库" value="4"></el-option>
              <el-option label="已送达" value="5"></el-option>
              <el-option label="已签收" value="6"></el-option>
              <el-option label="已取消" value="7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下单日期:">
            <el-date-picker 
            v-model="order.createTime" 
            type="datetime" 
            placeholder="下单日期"
            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单编号">
            <el-input placeholder="请输入订单编号" prefix-icon="el-icon-s-order" v-model="order.orderNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="loadingOrderList">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="black-space-10"></div>
    <el-button type="success" icon="el-icon-circle-plus-outline" @click="addPush">订单预定</el-button>
    <div class="black-space-10"></div>
    <!-- 表格数据 -->
    <el-table :data="tableData" 
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" 
              style="width: 100%">
      <!-- <el-table-column type="selection" width="50"></el-table-column> -->
      <el-table-column prop="orderNo" label="订单号" width="200"></el-table-column>
      <el-table-column prop="createTime" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="160" :formatter="orderStatusConventer"></el-table-column>
      <el-table-column prop="orderAmount" label="支付金额" width="80"></el-table-column>
      <el-table-column prop="userPhone" label="买家电话"></el-table-column>
      <el-table-column prop="payStatus" label="支付状态" :formatter="payStatusConventer"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-edit" size="mini" :disabled="scope.row.orderStatus == 7" @click="cancelOrder(scope.row.id)">取消</el-button>
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
          :current-page="2"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
        ></el-pagination>
      </el-col>
    </el-row>
    <DialogInfo :flag="dialogFlag" @close="closeDialog" :orderId="orderId"/>
  </div>
</template>
<script>
import {orderList, cancelOrder, deleteOrder} from '@/api/order.js';
import DialogInfo from "./dailog/detail.vue";
export default {
  name: "indexOrder",
  components: { DialogInfo},
  data() {
    return {
      order: {
        orderStatus: "",
        createTime: "",
        orderNo: "",
      },

      tableData: [
       {
          orderNo:"202021231241211111",
          createTime:"2016-05-02 12:00:00",
          orderStatus: "为发货",
          orderAmount:99,
          userPhone:"13769781954",
          payStatus:"未支付",
        }
      ],
      totalPage:0,
      page:{
        pageNumber:1,
        pageSize:10
      },
      loading:false,
      id:0,
      orderStatus:["", "已删除", "已发货", "未出库", "已出库", "已送达", "已签收", "已取消", "未发货"],
      payStatus:["", "未支付", "已支付", "支付失败", "退款中", "退款完成", "退款失败"],
      orderId:0,
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
        content: "是否确认删除当前订单信息?",
        fn: this.confirmDelete
      });
    },
    confirmDelete() {
      deleteOrder(this.id).then(response => {
        this.$message({
          message:response.msg,
          type:"success"
        })
        this.id = '';
        this.loadingOrderList();
      }).catch(error => {

      })
    },
    loadingOrderList() {
      let requestData = {
        orderStatus: this.order.orderStatus,
        createTime: this.order.createTime,
        orderNo: this.order.orderNo,
        pageSize: this.page.pageSize,
        pageNumber: this.page.pageNumber

      };
      this.loading = true;
      orderList(requestData).then(response => {
          let data = response.data;
          let totalPage = response.total;
          this.tableData = data;
          this.totalPage = totalPage;
          this.loading = false;
      }).catch(error => {
          this.loading = false;
      })

    },
    cancelOrder(orderId) {
      this.id = orderId;
      this.confirm({
        content: "是否确认取消该订单?",
        fn: this.confirmCancelOrder
      });
      
    },
    confirmCancelOrder() {
      cancelOrder(this.id).then(response => {
        this.$message({
          message:response.msg,
          type:"success"
        })
        this.id = '';
        this.loadingOrderList();
      }).catch(error => {
        this.id = '';
      })
    },
    addPush() {
      this.$router.push({
        name:"AddOrder"
      })
    },
    orderDetail(orderId) {
      this.orderId = orderId;
      this.dialogFlag = true;
    },
    closeDialog() {
      this.dialogFlag = false;
    },
    orderStatusConventer(row, column, cellValue, index) {
      return this.orderStatus[row.orderStatus];
    },
    payStatusConventer(row, column, cellValue, index) {
      return this.payStatus[row.payStatus];
    }
  },
  mounted:function() {
      this.loadingOrderList();
    }
};
</script>
<style lang="scss" scoped>
</style>