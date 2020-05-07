<template>
  <div id="addCategory">
    <el-button type="danger" @click="addFirst('add')">添加一级分类</el-button>
    <div>
      <el-row>
        <el-col :span="10">
          <div class="category" v-for="item in category" :key="item.id">
            <h4>
              <span class="el-icon-remove-outline"></span>{{item.categoryName}}
              <div class="button-group">
                <el-button size="mini" type="danger" round @click="editCategory(item.categoryName, item.id, 'edit', 1)">编辑</el-button>
                <el-button size="mini" type="success" round @click="addChildren(item.categoryName, item.id, 'addChildren')">添加子级</el-button>
                <el-button size="mini" round @click="deleteCategory(item.id)">删除</el-button>
              </div>
            </h4>

            <ul v-if="item.children">
              <li v-for="childrenItem in item.children" :key="childrenItem.id">
                {{childrenItem.categoryName}}
                <div class="button-group">
                  <el-button size="mini" type="danger" round @click="editCategory(childrenItem.categoryName, childrenItem.id, 'edit', 2)">编辑</el-button>
                  <el-button size="mini" round @click="deleteCategory(childrenItem.id)">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="wform" ref="ruleForm">
            <el-form-item label="一级菜单名称" v-if="category_first">
              <el-input v-model="form.name" :disabled="category_first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称" v-if="category_two">
              <el-input v-model="form.children" :disabled="category_two_disabled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit" :loading="submit_loading" :disabled="submit_loading_disabled">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {addCategory, getFirstCategory, deleteCategory, editFirstCategory} from '@/api/category.js';
export default {
  name: "addCategory",
  data() {
      return {
        form: {
          name: '',
          children: ''
        },
        category_first:true,
        category_two:true,
        category:[{
          id:'1',
          categoryName:'衣服',
          children:[{
            id:'3',
            categoryName:'高领毛衣'
          }]
        }],
        submit_loading:false,
        category_first_disabled:true,
        category_two_disabled:true,
        submit_loading_disabled:true,
        button_type:'',
        category_cur:{
          id:1,
          categoryName:''
        },
        parent:''
      };
    },
  methods:{
  submit() {
    if(this.button_type === 'add') {
      if(!this.form.name) {
      this.$message({
        message:'分类名称不能为空',
        type:'error'
      })
      return false;
      }
    this.submit_loading = true;
    this.category_cur.categoryName = this.form.name;
    addCategory(this.category_cur).then(response =>{
      this.$message({
        message:response.msg,
        type:'success'
      });
      this.loadFirstCategory();
      this.submit_loading = false;
      this.form.name = '';
      this.form.region = '';
    }).catch(error =>{
      this.submit_loading = false;
      this.form.name = '';
      this.form.region = '';
    });
    }
    if(this.button_type === 'edit') {
      this.editFirstCategory1(this.category_cur);
    }
    if(this.button_type === 'addChildren') {
     this.categoryChildren(this.category_cur);
    }
  },
  loadFirstCategory() {
    getFirstCategory().then(response => {
      this.category = response.data;
    }).catch(error => {

    })
  },
  addFirst(type) {
    this.category_two = false;
    this.category_first_disabled = false;
    this.submit_loading_disabled = false;
    this.button_type = type;
  },
  categoryChildren(category_cur) {
    if(!this.form.name) {
      this.$message({
        message:'一级分类名称不能为空',
        type:'error'
      })
      return false;
      }
      if(!this.form.children) {
      this.$message({
        message:'二级分类名称不能为空',
        type:'error'
      })
      return false;
      }
      this.category_cur.categoryName = this.form.children;
      addCategory(category_cur).then(response =>{
      this.$message({
        message:response.msg,
        type:'success'
      })
      this.loadFirstCategory();
      this.form.children = '';
    }).catch(error => {

    })
  },
  addChildren(categoryName, id, button_type) {
    this.category_two = true;
    this.category_two_disabled = false;
    this.submit_loading_disabled = false;
    this.category_first_disabled = true;
    this.form.name = categoryName;
    this.category_cur.id = id;
    this.button_type = button_type;
  },
  deleteCategory(id) {
    this.confirm({
        content: "是否确认删除当前信息?",
        fn: this.delCategory,
        id:id
      });
  },
  delCategory(id) {
      let ids = [];
      ids.push(id);
      deleteCategory(ids).then(response =>{
        Message.success(response.data.msg);
        this.loadFirstCategory();
      }).catch(error =>{

      })
  },
  editCategory(categoryName, id, type, parent) {
    if(parent == 1) {
      this.category_first = true;
      this.category_two = false;
      this.category_first_disabled = false;
      this.form.name = categoryName;
      this.parent = 1;
    }
    if(parent == 2) {
      this.category_first = false;
      this.category_two = true;
      this.category_two_disabled  = false;
      this.form.children = categoryName;
      this.parent = 2;
    }
    this.submit_loading_disabled = false;
    
    
    this.button_type = type;
    this.category_cur.id = id;
    this.category_cur.categoryName = categoryName;
  },
  editFirstCategory1(category_cur) {
      if(!this.form.name && this.parent == 1) {
      this.$message({
        message:'一级分类名称不能为空',
        type:'error'
      })
      return false;
      }
      if(!this.form.children && this.parent == 2) {
      this.$message({
        message:'二级分类名称不能为空',
        type:'error'
      })
      return false;
      }
      if (this.parent == 1) {
        this.category_cur.categoryName = this.form.name;
      }
      if (this.parent == 2) {
         this.category_cur.categoryName = this.form.children;
      }
    editFirstCategory(category_cur).then(response =>{
      this.$message({
        message:response.msg,
        type:'success'
      })
      if(this.parent == 1) {
        let data = this.category.filter(item => item.id == this.category_cur.id);
        data[0].categoryName = response.data.categoryName;
      }
      if(this.parent == 2) {
        for(let parent of this.category){
          for(let children of parent.children) {
            if(children.id == this.category_cur.id) {
              children.categoryName = response.data.categoryName;
            }
          }
        }
      }
      this.form.name = '';
      this.form.children = '';
      this.parent = '';
    }).catch(error => {

    })
  }
  },
  mounted:function() {
    this.loadFirstCategory();
  }
}
</script>
<style lang="scss" scoped>
.category {
  position: relative;
  line-height: 30px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    padding-left: 35px;
  }
  span {
    position: absolute;
    left: 12px;
    top: 7px;
    font-size: 17px;
    background-color: #fff;
  }
  li {
    list-style-type: none;
    position: relative;
    padding-left: 0px;
    margin-left: 20px;
    &:before {
      content: "";
      position: absolute;
      left: -40px;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
  .button-group {
    display: none;
    position: absolute;
    top: -1px;
    right: 11px;
    z-index: 2;
    button {
      font-size: 10px;
    }
  }
}
.menu-title {
  line-height: 30px;
  background-color: #f3f3f3;
  padding-left: 22px;
}
.wform{
    width: 410px;
}
.el-form-item {
    margin-bottom: 22px;
    position: relative;
    left: -22px;
}
</style>