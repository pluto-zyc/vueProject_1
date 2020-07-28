<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item
        label="手机号"
        :rules="{
        required: true, trigger: 'blur'
        }"
        prop="number"
      >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item
        label="昵称"
        :rules="{
        required: true, trigger: 'blur'
        }"
        prop="name"
      >
        <el-input v-model="form.nickname" prop="name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input v-model="form.password" prop="pass" show-password></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>


<script>
// 菜单添加
import { requestMemberDetail, requestMemberUpdate } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
       form:{
         uid:"",
         nickname:'',
         phone:1,
         password:'',
         status:1,
       }
    };
  },
  computed: {
    ...mapGetters({
       memberList: "member/list",
    }),
  },
  methods: {
    ...mapActions({
       memberResponseList: "member/responseList",
    }),
    //重置内容
    empty() {
      this.form = {
         uid:"",
         nickname:'',
         phone:1,
         password:'',
         status:1,
       };
    },
    // 取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 获取某一条数据
    getDetail(id) {
      requestMemberDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
         delete this.form.randstr
      });
    },
    // 会员修改
    update() {
      requestMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");

          this.empty(); //  清空add面板form数据
          this.cancel(); //  取消按钮
          //  重新渲染列表
          this.memberResponseList();
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