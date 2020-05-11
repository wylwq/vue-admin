<template>
   <div id="addOrder">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsName">
          <el-input v-model="form.goodsName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品单价" :label-width="formLabelWidth" prop="goodsPrice">
          <el-input v-model="form.goodsPrice" :disabled="true" ></el-input>
      </el-form-item>
      <el-form-item label="预定数量" :label-width="formLabelWidth" prop="goodsNum">
          <el-input-number v-model="goodsNum" controls-position="right" @change="handleChange" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="买家电话" :label-width="formLabelWidth" prop="userPhone">
          <el-input v-model="form.userPhone" @keyup.enter.native="findCoustom"></el-input>
      </el-form-item>
      <el-form-item label="支付方式" :label-width="formLabelWidth" prop="payType">
         <el-select v-model="form.payType" placeholder="请选择">
            <el-option label="微信支付" value="1"></el-option>
            <el-option label="支付宝支付" value="2"></el-option>
            <el-option label="货到付款" value="3"></el-option>
            <el-option label="分期付款" value="4"></el-option>
            <el-option label="积分支付" value="5"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="收货地址" :label-width="formLabelWidth" prop="orderAddress">
          <el-input v-model="form.orderAddress"></el-input>
      </el-form-item>
      <el-form-item label="订单原价" :label-width="formLabelWidth" prop="orderAmount">
          <el-input v-model="form.orderAmount"></el-input>
      </el-form-item>
      <el-form-item label="实付价格" :label-width="formLabelWidth" prop="orderRealAmount">
          <el-input v-model="form.orderRealAmount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
   </div>    
</template>
<script>
import {findOneCustom} from '@/api/custom.js';
import{addOrder} from '@/api/order.js';
export default {
    name:"addOrder",
    data() {
      return {
         form: {
            goodsId:"",
            goodsName:"",
            goodsPrice:"",
            goodsNum:1,
            userPhone:"",
            payType:"",
            orderAddress:"",
            orderAmount:"",
            orderRealAmount:"",
         },
         formLabelWidth: "70px",
         goodsNum:1,
         custom:{},
         discount:0,
         reqData:{
            orderAmount:"",
            orderRealAmount:"",
            userPhone:"",
            payType:"",
            orderAddress:"",
            cartList:[{}]
         }
      }
    },
    methods: {
      initOrder() {
         let data = this.$route.query.data;
         this.form.goodsName = data.storeName;
         this.form.goodsPrice = data.storeFee / 100;
         this.form.orderAmount = data.storeFee / 100;
         this.form.goodsId = data.id;
      },
      handleChange(value) {
         console.log(value);
      },
      findCoustom(value) {
         let cusPhone = this.form.userPhone;
         findOneCustom(cusPhone).then(response => {
            this.$message({
              message:response.msg,
              type:"success"
            })
            this.custom = response.data;
            this.discount = this.custom.cusDiscount;
         }).catch(error => {
            this.$message({
              message:error.msg,
              type:"error"
           })
         })
      },
      onSubmit() {
         if(!this.form.orderRealAmount) {
            this.$message({
              message:'订单用户不存在,不能下单',
              type:'error'
            })
            return;
         };
         this.createReqData();
         this.submit_loading = true;
         addOrder(this.reqData).then(response => {
            this.$message({
              message: response.msg,
              type:'success'
            })
            this.postHandler();
         }).catch(error => {
            this.$message({
              message: response.msg,
              type:'error'
            })
            this.postHandler();
         })
      },
      createReqData() {
         this.reqData.orderAmount = this.form.orderAmount * 100;
         this.reqData.orderRealAmount = this.form.orderRealAmount * 100;
         this.reqData.userPhone = this.form.userPhone;
         this.reqData.payType = this.form.payType;
         this.reqData.orderAddress = this.form.orderAddress;
         let cart = {
            goodsName:this.form.goodsName,
            goodsId:this.form.goodsId,
            goodsPrice:this.form.goodsPrice,
            goodsNum: this.goodsNum,
            goodsTotal: this.form.orderRealAmount * 100
         };
         this.reqData.cartList[0] = cart;
      },
      postHandler() {
         this.submit_loading = true;
         this.reqData = "";
         this.form = "";
         this.$router.push({
         name:'IndexOrder'
        })
      }
    },
    watch:{
      goodsNum:{
         handler(newValue, oldValue) {
            this.form.orderAmount = newValue * this.form.goodsPrice;
            this.form.orderRealAmount = this.form.goodsPrice * newValue / 10 * this.discount;
         }
      },
      discount:{
         handler(newValue, oldValue) {
            this.form.orderRealAmount = this.form.goodsPrice * newValue / 10 * this.goodsNum;
         }
      }
    },
    mounted:function() {
      this.initOrder();
    },
}
</script>
<style lang="scss" scoped>

</style>