<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "App",
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    enterFullScreen() {
      if (!screenfull.enabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: "不支持全屏",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.$message({
        message: "全屏啦",
        type: "success"
      });
    }
  },
  created() {
    this.enterFullScreen();
  }
};
</script>
