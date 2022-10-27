<template>
  <div class="aside">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h4 class="aside-title">
        {{ isCollapse ? "后台" : "通用后台管理系统" }}
      </h4>

      <el-menu-item
        v-for="item in nochildren"
        :key="item.label"
        :index="item.label"
        @click="clickMenu(item)"
      >
        <!-- <template slot="title"> -->
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
        <!-- </template> -->
      </el-menu-item>

      <el-submenu
        v-for="item in haschildren"
        :key="item.label"
        :index="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="index in item.children" :key="index.label">
          <el-menu-item :index="index.label" @click="clickMenu(index)">{{
            index.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

  <script>
import jsCookie from "js-cookie";
export default {
  name: "commond-aside",
  data() {
    return {
      // menu: [],
      // [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "MallManage/MallManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "UserManage/UserManage",
      //   },
      //   {
      //     label: "其他",
      //     icon: "location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面1",
      //         icon: "setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面2",
      //         icon: "setting",
      //         url: "Other/PageTwo",
      //       },
      //     ],
      //   },
      // ],
    };
  },

  methods: {
    clickMenu(item) {
      this.$router.push(item.path).catch((err) => {
        console.log(err);
      });
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    nochildren() {
      return this.menu.filter((item) => !item.children);
    },
    haschildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    menu() {
      return JSON.parse(jsCookie.get("menu"));
    },
  },
};
</script>
  <style lang="less" scoped>
.aside {
  .aside-title {
    padding: 0 10px;
    color: #fff;
  }
}
.el-menu {
  border-right: none;
}
.el-submenu .el-menu-item {
  min-width: 0px;
}
</style>