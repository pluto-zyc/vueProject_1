<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <!-- node-key="id" -->
        <el-tree
          :data="menulist"
          :default-checked-keys="defaultkey"
          show-checkbox
          ref="tree"
          node-key="id"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-if="info.isAdd" @click="add">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestRoleAdd,
  requestRoleDetail,
  requestRoleUpdate,
} from "../../../utils/request"; //菜单添加
import { successAlert, warningAlert } from "../../../utils/alert"; // 提示框
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  data() {
    return {
      form: {
        rolename: "", //名称  String
        menus: "", //权限 字符串类型数组
        status: 1, //状态 Number
      },
      defaultkey: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    if (this.menulist.length == 0) {
      this.responseList();
    }
  },
  methods: {
    ...mapActions({
      responseList: "menu/responseList",
      responseRoleList: "role/responseList",
    }),
    // 置空
    empty() {
      this.form = {
        rolename: "", //名称  String
        menus: " ", //权限 字符串类型数组
        status: 1, //状态 Number
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 取消
    cancel() {
      this.info.show = false;
    },
    // 获取一条
    getRoleDetail(id) {
      requestRoleDetail({ id: id }).then((res) => {
        (this.form = res.data.list), (this.form.id = id);
        this.defaultkey = JSON.parse(res.data.list.menus);
      });
    },
    add() {
      // 不能为空
      if (this.form.menus == "[]" || !this.form.rolename) {
        warningAlert("有字段为空");
      } else {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        requestRoleAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.list);
            this.cancel();
            this.empty();
            this.responseRoleList();
          } else {
            warningAlert("添加失败");
          }
        });
      }
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.responseRoleList();
        } else {
          warningAlert("修改失败");
        }
      });
    },
  },
};
</script>

<style>
</style>