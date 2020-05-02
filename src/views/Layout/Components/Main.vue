<template>
    <div id="main-warp">
        <div class="content">
            <keep-alive>
                <!-- 需要缓存 -->
                <router-view v-if="$route.meta.keepAlive"/>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"/>
        </div>
        
    </div>
</template>
<script>
export default {
    name:"layoutMain",
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
  #main-warp {
      position: fixed;
      left: $nav-width;
      top: 75px;
      right: 0;
      bottom: 0;
      border: 15px solid #f7f7f7;
      border-bottom: none;
      -webkit-box-sizing: border;
  }
  .content {
    width: 100%;
    height: 100%;
    padding-top: 30px;
    padding-left: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>