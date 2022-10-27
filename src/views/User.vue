<template>
  <div class="user">
    <div class="manage">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form
          ref="form"
          :rules="rules"
          :inline="true"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd"> +新增</el-button>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table stripe height="60vh" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, delUser, editUser, addUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType: 0, // 0表示新增，1表示修改
      total: 0,
      userForm: {
        name: "",
      },
      pageData: {
        page: 1,
        limit: 10,
      },
    };
  },
  mounted() {
    this.getList();
  },
  // computed: {
  //   changeSex: {},
  // },
  methods: {
    submit() {
      // 判断规则验证是否全部正确
      this.$refs.form.validate((valid) => {
        // 全部数据填写完毕
        if (valid) {
          if (this.modalType === 0) {
            addUser(this.form).then(({ data }) => {
              console.log(data);
            });
          } else {
            editUser(this.form).then(({ data }) => {
              console.log(data);
            });
          }
        }
      });
      this.getList();
      // 清空数据
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    // 取消 关闭弹窗
    handleClose() {
      // 清除数据
      this.$refs.form.resetFields();
      this.dialogVisible = false;
      console.log(this.$refs.form);
    },
    cancel() {
      // 调用关闭弹窗的方法
      this.handleClose();
    },
    // 将表格的数据显示到弹窗
    handleEdit(item) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 进行深拷贝
      this.form = JSON.parse(JSON.stringify(item));
      console.log(this.form);
    },
    // 删除用户
    handleDelete(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          editUser({ id: item.id })
            .then((data) => {
              console.log(data);
              this.getList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              console.log(data);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList() {
      getUser({ params: this.pageData }).then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    // 搜索用户
    onSubmit() {
      console.log(this.userForm.name);
      if (this.userForm.name) {
        getUser({ params: { name: this.userForm.name } }).then((data) => {
          console.log(data);
          if (data.data.count !== 0) {
            this.tableData = data.data.list;
          } else {
            this.$message.error("没有搜索到该用户的信息");
            this.userForm.name = "";
          }
        });
      } else {
        this.$message.error("请输入搜索的信息");
      }
    },
    // 选择页码
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form {
    align-items: center;
  }
}
.common-tabel {
  position: relative;
  height: calc(100% - 62px);
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
.block {
  float: right;
}
</style>
