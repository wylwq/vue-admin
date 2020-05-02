<template>
  <div>
    <el-table 
    :data="tableData"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
      <el-table-column v-if="tableConfig.selection" type="selection" width="50"></el-table-column>
      <template v-for="tHeader in tableConfig.tableHeader">
          <el-table-column  :key="tHeader.id" :prop="tHeader.field" :label="tHeader.label" v-if="tHeader.columnType === 'slot'">
                <template slot-scope="scope">
                    <slot :name="tHeader.slotName" :data="scope.row"></slot>
                </template>
          </el-table-column>
          <el-table-column  :key="tHeader.id" :prop="tHeader.field" :label="tHeader.label" :width="tHeader.width" v-if="tHeader.columnType !== 'slot'"></el-table-column>
      </template>
      
    </el-table>
    <div class="black-space-30"></div>
    <el-pagination
      class="pull-right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>
</template>
<script>
import {loadingTable} from "@/api/requesturl.js";
import tableLoadData from "@/mixins/tableLoadData.js";
import pagination from "@/mixins/pagination.js";
export default {
  name: "tableVue",
  mixins: [tableLoadData, pagination],
  data() {
      return {
        tableData: [{
          userPhone: '2016-05-03',
          userName: '王小虎',
          userAddress:"",
          userAge: '上海市普陀区金沙江路 1518 弄',
          userSex: '1',
          adminFlag:""
        }, {
          userPhone: '2016-05-03',
          userName: '王小虎',
          userAddress:"",
          userAge: '上海市普陀区金沙江路 1518 弄',
          userSex: '1',
          adminFlag:""
        }],
        tableConfig:{
          selection: true,
          recordCheckbox:true,
          req: {
              url:"",
              method:"",
              data:""
          },
          tableHeader:[
            
          ],
          tableBody:[]
        },
        loading:false,
    }
  },
  props:{
    config:{
        type:Object,
        default:()=>{}
    }
  },
  methods:{
    initTableConfig(){
        let configData = this.config;
        //获取json对象的所有key值
        let keys = Object.keys(this.tableConfig);
        for(let key in configData) {
            if(keys.includes(key)) {
                this.tableConfig[key] = configData[key];
            }
        }
    },
    refresh() {
      this.loadingData();
    },
    paramsRefresh(params) {
      this.loadingDataParams(params);
    }
  },
  created() {
    
  },
  beforeMount() {
      this.initTableConfig();
      console.log(this.tableConfig.req);
  },
  mounted() {},
  beforeUpdate() {},
  updated() {}
};
</script>
<style lang="scss" scoped>
</style>
<!-- 
插槽
v-slot
1.匿名插槽: 
2.具名插槽:
3.作用域插槽: 可以进行数据绑定，父子组件通信
 -->