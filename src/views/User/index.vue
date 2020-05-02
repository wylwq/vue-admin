<template>
  <div id="indexUser">
    <el-form :inline="true" :model="store" class="demo-form-inline">
      <el-row>
        <el-col :span="5">
          <el-form-item label="类型:">
            <el-select v-model="store.storeParent" clearable placeholder="请选择">
              <el-option
                v-for="item in store.options"
                :key="item.id"
                :value="item.id"
                :label="item.categoryName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态:">
            <el-select v-model="store.storeStatus" placeholder="请选择">
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="日期:">
            <el-date-picker 
            v-model="store.createTime" 
            type="datetime" 
            placeholder="创建时间"
            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="store.keyWord"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="getStoreList">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="black-space-10"></div>
    <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialogFlag = true">新增用户</el-button>
    <div class="black-space-10"></div>
    <!-- 表格数据 -->
    <el-table :data="tableData" 
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" 
              @selection-change="handleSelectionChange"
              style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="storeName" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="160" :formatter="toDate"></el-table-column>
      <el-table-column prop="storeNum" label="库存"></el-table-column>
      <el-table-column prop="storeFee" label="单价" :formatter="toNumber"></el-table-column>
      <el-table-column prop="storeStatus" label="状态" :formatter="toStatus"></el-table-column>
      <el-table-column label="商品属性">
        <template slot-scope="scope">
              <span v-html="scope.row.storeParam"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button type="warning" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.id)">上下架</el-button>-->
          <router-link :to="{name: 'UpdateUser', query:{id: scope.row.id}}">
            <el-button type="warning" icon="el-icon-edit" size="mini" class="a">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delUserById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="8">
        <el-button size="medium" @click="delAll">批量处理</el-button>
      </el-col>
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
    <!-- 新增弹窗 -->
    <DialogInfo :flag="dialogFlag" @close="closeDialog" @getStoreList="getStoreList" :category="store.options"/>
    <!--修改弹窗 -->
    <!--<DialogInfoEdit :flag="dialogFlagEdit" @close="closeDialog" @getStoreList="getStoreList" :id="storeId" :category="userInfo.options"/>-->
  </div>
</template>
<script>
import DialogInfo from "./dailog/info.vue";
import DialogInfoEdit from "./dailog/edit.vue";
import {addFirstCategory, getFirstCategory, deleteCategory, editFirstCategory} from '@/api/category.js';
import {addStore, getStore, deleteStore} from '@/api/store.js';
import {dateFormat, numberFormat} from '@/utils/common.js'
export default {
  name: "indexUser",
  components: { DialogInfo, DialogInfoEdit },
  data() {
    return {
      store: {
        options: [{
          id:'1',
          categoryName:'测试'
        }],
        storeParent: "",
        createTime: "",
        keyWord: "",
        storeStatus:""
      },

      tableData: [
        {
          storeName:"毛大衣",
          createTime:"2016-05-02",
          storeNum: 10,
          storeFee:0,
          storeParam:"颜色:白色",
          storeStatus: "上架",
        },
        {
          storeName:"毛大衣",
          createTime:"2016-05-02",
          storeNum: 10,
          storeFee:0,
          storeParam:"颜色:白色",
          storeStatus: "上架",
        },
       {
          storeName:"毛大衣",
          createTime:"2016-05-02",
          storeNum: 10,
          storeFee:0,
          storeParam:"颜色:白色",
          storeStatus: "上架",
        }
      ],
      dialogFlag: false,
      dialogFlagEdit:false,
      totalPage:0,
      page:{
        pageNumber:1,
        pageSize:10
      },
      loading:false,
      ids:'',
      storeId:0
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
    closeDialog() {
      this.dialogFlag = false;
      this.dialogFlagEdit = false;
    },
    delUserById(id) {
      this.ids = [id];
      this.confirm({
        content: "是否确认删除当前信息?",
        fn: this.confirmDelete
      });
    },
    delAll() {
      if(!this.ids || this.ids.length == 0) {
        this.$message({
          message:"请选择要删除的库存信息",
          type:"error"
        })
        return false;
      }
      this.confirm({
        content: "是否确认删除选中的用户信息?",
        fn: this.confirmDelete
      });
    },
    confirmDelete() {
      deleteStore(this.ids).then(response => {
        // this.$message({
        //   message:response.msg,
        //   type:"success"
        // })
        this.ids = '';
        this.getStoreList();
      }).catch(error => {

      })
    },
    getStoreList() {
      let requestData = {
        storeParent:this.store.storeParent,
        storeStatus:this.store.storeStatus,
        keyWord:this.store.keyWord,
        createTime:this.store.date,
        pageSize:this.page.pageSize,
        pageNumber:this.page.pageNumber
      };
      console.log(requestData);
      this.loading = true;
      getStore(requestData).then(response => {
          let data = response.data;
          let totalPage = response.total;
          console.log(data);
          this.tableData = data;
          this.totalPage = totalPage;
          this.loading = false;
      }).catch(error => {
          this.loading = false;
      })

    },
    toDate(row, column, cellValue, index) {
      return dateFormat("YYYY-mm-dd HH:MM:SS", row.createTime);
    },
    toNumber(row, column, cellValue, index) {
      return row.storeNum;
    },
    toStatus(row, column, cellValue, index) {
      return row.storeStatus == 1 ? '上架':'下架';
    },
    handleSelectionChange(val) {
      console.log(val);
      let id = val.map(item => item.id);
      this.ids = id;
      console.log(id);
    },
    handleEdit(id) {
      this.dialogFlagEdit = true;
      this.storeId = id;
    }
  },
  mounted:function() {
      getFirstCategory().then(response => {
        let data = response.data;
        console.log(data);
        this.store.options = data;
      }).catch(error => {

      }),
      this.getStoreList();
    }
};
</script>
<style lang="scss" scoped>
</style>