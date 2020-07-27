<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
      <el-form-item label="所属角色" label-width="80px">
        <el-select v-model="form.roleid" placeholder="请选择">
          <el-option label="所属角色" value="shanghai" disabled=""></el-option>
          <el-option v-for="i in roleList" :key="i.id" :label="i.rolename" :value="i.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input v-model="form.password"></el-input>
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
import { requestManageAdd,requestManageDetail,requestManageUpdate,requestManageNum } from "../../../utils/request";
import { warningAlert, successAlert } from '../../../utils/alert';
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: 1,
        username: "",
        password: "",
        status:2,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.responseRoleList();
    }
  },
  methods: {
    ...mapActions({
      responseRoleList: "role/responseList",
      responseManageList: "manage/responseList",
    }),
    // 请求一条
      getManageDatil(id){
        requestManageDetail({uid:id}).then((res)=>{
          this.form = res.data.list
          })
      },
    // 取消
    cancel(){
      this.info.show = false
    },
    // 置空
    empty(){
      this.form = {
        roleid: 1,
        username: "",
        password: "",
        status:2,
      }
    },
    add() {
      requestManageAdd(this.form).then((res)=>{
        if(res.data.code == 200){
            successAlert(res.data.msg)
            this.cancel()
            // this.empty()
      //  this.responseManageList()
      // 通知父级我点了添加   你需要获取总条数并修改list的total 调用请求管理员列表更新（当前页数，一页显示几条）
            this.$emit('changeTotal')
        }else{
          warningAlert('添加失败')
        }
      })
    },
    // 修改
    update(){
      requestManageUpdate(this.form).then((res)=>{
           if(res.data.code==200){
             successAlert(res.data.msg)
             this.empty()
             this.cancel()
             this.responseManageList()
           }
      })
    }
  },
};
</script>

<style>
</style>