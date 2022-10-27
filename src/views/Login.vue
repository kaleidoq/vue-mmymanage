<template>
  <div class="login">
    <el-form
      ref="form"
      label-width="70px"
      :model="form"
      :rules="rules"
      :inline="true"
      status-icon
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        >
        </el-input>
      </el-form-item>
      <el-form-item style="margin-top: 20px"
        ><el-button type="primary" @click="submit"
          >登录</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入账号名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
    };
  },

  methods: {
    // 登录
    submit() {
      // token信息
      // const token = Mock.Random.guid();
      // console.log(token);
      // //   将token信息存入cookie
      // Cookie.set("token", token);
      getMenu(this.form).then(({ data }) => {
        this.$refs.form.validate((vali) => {
          if (vali) {
            console.log(data);
            if (data.code === -999) {
              this.$message.error("密码错误！请重新输入");
            } else {
              Cookie.set("token", data.data.token);
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              this.$router.push({ name: "home" });
            }
          }
        });
      });
      // this.$router.push({
      //   name: "main",
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 370px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 15px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  text-align: center;
  .login-title {
    margin-bottom: 40px;
    color: #505458;
  }
}
</style>