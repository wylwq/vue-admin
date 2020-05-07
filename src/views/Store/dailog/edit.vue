<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog title="修改商品" :visible.sync="dialogFlag" :modal="false" @close="close" width="580px" @opened="openDialog">
      <el-form :model="form" ref="addInfoForm">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="firstCategory">
          <el-select v-model="form.firstCategory" placeholder="一级分类">
            <el-option v-for="item in categoryOptions.item" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="secCategory">
          <el-select v-model="form.secCategory" placeholder="二级分类">
            <el-option v-for="item in categoryOptions.item" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" :label-width="formLabelWidth" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="form.status" placeholder="一级分类">
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="2"></el-option>
          </el-select>
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
import {addStore, editStore, getStoreById} from '@/api/store.js';
export default {
  name: "dailog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        storeId:"",
        firstCategory:"",
        secCategory: "",
        name:"",
        number:"",
        status:"",
      },
      formLabelWidth: "70px",
      dialogFlag: false,
      categoryOptions:{
        item:[]
      },
      submiting:false
    };
  },
  methods:{
    close() {
        this.dialogFlag = false;
        //子组件回调父组件
        this.$emit('close', false);
    },
    openDialog(){
      this.categoryOptions.item = this.category
      console.log(this.id);
      getStoreById(this.id).then(response => {
        let data = response.data;
        this.form = data;
      }).catch(error => {

      })
    },
    submit() {
      if(!this.form.name) {
        this.$message({
          message:"商品名称不能为空",
          type:'error'
        })
        return false;
      }
      if(!this.form.number) {
        this.$message({
          message:"商品库存不能为空",
          type:'error'
        })
        return false;
      }
      this.dialogFlag = false;
      this.submiting = true;
      this.form.storeId = this.id;
      editStore(this.form).then(response => {
        let data = response.data;
        this.$message({
          message:data.msg,
          type:'success'
        })
        this.submiting = false;
        //重置表单
        //this.$refs['addInfoForm'].resetFields();
        this.$emit("getStoreList");
      }).catch(error => {
        this.submiting = false;
      })
    },
    cancel() {
      this.dialogFlag = false;
      this.$refs['addInfoForm'].resetFields();
    }
  },
  //单向数据流 父级-->子级 , 不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category:{
      type:Array,
      default:() =>[]
    },
    id:{
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