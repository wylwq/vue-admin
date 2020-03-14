<template>
    <div id="header-warp">
        头
    </div>
</template>
<script>
export default {
    
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
    -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
  }
</style>