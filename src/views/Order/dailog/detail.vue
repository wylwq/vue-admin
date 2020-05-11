<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog title="订单详情" :visible.sync="dialogFlag" :modal="false" @close="close" width="580px" @opened="openDialog">
      <el-form :model="form" ref="detailInfoForm">
        <el-form-item label="订单项号" :label-width="formLabelWidth" prop="orderItemNo">
          <el-input v-model="form.orderItemNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="goodsName">
          <el-input v-model="form.goodsName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商品单价" :label-width="formLabelWidth" prop="goodsPrice">
          <el-input v-model="form.goodsPrice" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="预定数量" :label-width="formLabelWidth" prop="goodsNum">
          <el-input v-model="form.goodsNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth" prop="orderItemStatus">
          <el-input v-model="orderItemStatus[form.orderItemStatus]" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="支付金额" :label-width="formLabelWidth" prop="goodsTotal">
          <el-input v-model="form.goodsTotal" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth" prop="orderAddress">
          <el-input v-model="form.orderAddress" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {detailOrder} from '@/api/order.js';
export default {
  name: "dailog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        orderItemNo:"",
        goodsName:"",
        goodsPrice: "",
        goodsNum:"",
        orderItemStatus:"",
        goodsTotal:"",
        orderAddress:""
      },
      formLabelWidth: "70px",
      dialogFlag: false,
      id:0,
      orderItemStatus: ["", "已删除", "已发货", "未出库", "已出库", "已送达", "已签收", "已取消", "未发货"]
    };
  },
  methods:{
    close() {
        this.dialogFlag = false;
        //子组件回调父组件
        this.$emit('close', false);
    },
    openDialog(){
      this.id = this.orderId
      detailOrder(this.id).then(response => {
        let data = response.data;
        this.form = data;
        this.form.goodsTotal = this.form.goodsTotal / 100;
      }).catch(error => {

      })
    },
    cancel() {
      this.dialogFlag = false;
      this.$refs['detailInfoForm'].resetFields();
    }
  },
  //单向数据流 父级-->子级 , 不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    orderId:{
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