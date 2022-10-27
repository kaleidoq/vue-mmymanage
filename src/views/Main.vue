<template>
  <div class="home">
    <el-container>
      <el-aside
        width="auto"
        style="background-color: #545c64; overflow: hidden; height: cal(100vh)"
      >
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <common-tag />
        <el-main>
          <!-- 路由占用 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonTag from "@/components/CommonTag.vue";

export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
