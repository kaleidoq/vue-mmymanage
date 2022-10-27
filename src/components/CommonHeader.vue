<template>
  <div class="header">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="collapseMenu"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb style="margin-left: 20px" separator="/">
        <el-breadcrumb-item
          v-for="item in this.tags"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/img_1.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="layout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import jsCookie from "js-cookie";
import { mapState } from "vuex";
export default {
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === "layout") {
        // 清除token信息
        jsCookie.remove("token");
        jsCookie.remove("menu");
        this.$router.push({ name: "login" });
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  mounted() {
    console.log(this.tags);
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  height: 60px;
  background-color: #333;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }
}
.l-content {
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      color: #666;
    }
    &:last-child {
      .el-breadcrumb__inner {
        font-weight: normal;
        color: #fff;
      }
    }
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>