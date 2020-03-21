<template>
    <div id="nav-warp">
        
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  
        background-color="#344a5f" text-color="#fff" active-text-color="#fff" router>
        <img src="../../../assets/logo.png" alt="森马后台管理系统" width="70px" height="70px">
        <template v-for="(item, index) in routers">
          <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
            <!-- 一级菜单 -->
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.name}}</span>
            </template>
            <!-- 子级菜单 -->
            <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
         </el-submenu>
       </template>
       <svg-icon/>
</el-menu>
    </div>
</template>
<script>
  export default {
    data() {
      // console.log(this.$store.state.isCllapse);
      // this.$store.commit('SET_COUNT', 100);
      // this.$store.dispatch('setMenuStatus', 111);
      const routers = this.$router.options.routes;
      return {
        // isCollapse: false,
        routers: routers
      };
    },
    methods: {
     
    }
  }
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: $nav-width;
    height: 100vh;
  }
  img{
    padding-left: 32%;
  }
</style>