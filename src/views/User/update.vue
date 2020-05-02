<template>
  <div id="updateUser">
    <el-form ref="form" :model="form" label-width="80px">
        <el-row>
            <el-col :span="5">
               <el-form-item label="商品名称">
                   <el-input v-model="form.storeName" maxlength="10"></el-input>
               </el-form-item>
           </el-col>
        </el-row>
      <el-form-item label="商品库存">
        <el-input-number v-model="form.storeNum" controls-position="right" @change="handleChange" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-select v-model="form.storeStatus" placeholder="请选择活动区域">
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.createTime" disabled style="width: 50%;"></el-date-picker>
        </el-col>
      </el-form-item>
        <el-row>
            <el-col :span="5">
               <el-form-item label="商品金额">
                   <el-input v-model="form.storeFee" maxlength="10"></el-input>
               </el-form-item>
           </el-col>
        </el-row>
      <el-form-item label="商品属性">
        <quillEditor v-model="form.storeParam" ref="myQuillEditor" :options="editorOption"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {addStore, getStore, deleteStore, getStoreById, editStore} from '@/api/store.js';
import {quillEditor} from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: "updateUser",
  components:{quillEditor},
  data() {
    let id = this.$route.query.id;
    console.log(id);
    return {
      form: {
        storeName:"毛大衣",
        createTime:"2016-05-02",
        storeNum: 10,
        storeFee:0,
        storeParam:"颜色:白色",
        storeStatus: "上架",
      },
      storeId:id,
      editorOption:{

      }
    };
  },
  methods: {
    onSubmit() {
      if(this.form.storeStatus === '上架') {
          this.form.storeStatus = 1
        } else {
          this.form.storeStatus = 2
        }
        console.log(this.form.storeStatus);
      editStore(this.form).then(response => {
        this.$message({
          message:response.msg,
          type:"success"
        })
        this.loadStore();
      }).catch(error => {

      })
    },
    handleChange(value) {
      console.log(value);
    },
    loadStore() {
      getStoreById(this.storeId).then(response => {
          let data = response.data;
          this.form = data;
          this.form.storeStatus = this.form.storeStatus == 2? '下架':'上架';
        }).catch(error => {

      })
    }
  },
  mounted:function() {
    this.loadStore();
  }
};
</script>
<style lang="scss" scoped>
</style>