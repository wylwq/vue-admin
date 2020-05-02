<template>
    <div id="header-warp">
        <div class="pull-right">
          <div class="user-info">
             {{username}}
          </div>
          <div class="header-icon el-icon-switch-button" @click="exit"></div>
        </div>
    </div>
</template>
<script>
import {getUsername} from '../../../utils/appstore.js'
export default {
    name:'layoutHeader',
    
    data(){
      return {
      }
    },
    methods:{
      exit() {
        this.$store.dispatch('exitActions').then(() =>{
          this.$router.push({
            name:'Login'
          });
        });
      }
    },
    computed:{
      'username':function(){
        return getUsername();
      }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
  #header-warp {
    position: fixed;
    top: 0px;
    right: 0;
    left: $nav-width;
    height: 75px;
    background-color: #fff;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.856);
  }
  .pull-right {
    float: right;
    margin-right: 30px;
    width: 160px;
    height: 100%;
    cursor: pointer;
  }
  .user-info {
    float: left;
    padding-top: 27%;
    width: 75%;
    font-size: 15px;
    text-align: center;
  }
  .header-icon {
    padding-top: 25%;
    width: 25%;
    font-size: 25px;
  }
</style>