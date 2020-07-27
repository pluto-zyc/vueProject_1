<template>
  <div>
    <el-table :data="manageList" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>

      <el-table-column prop="username" label="用户名" width="180"></el-table-column>

      <el-table-column prop="roleid" label="所属角色" width="180"></el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import { requestManageDelete, requestManageNum } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
       size: 2, //一页显示几条
      total:1,//总条数
      dangqian: 1, //当前页数
    };
  },
  computed: {
    ...mapGetters({
      manageList: "manage/list",
    }),
  },
  mounted() {
    requestManageNum().then((res) => {
      this.total = res.data.list[0].total; //一进页面赋值总数
    });
    this.requestManageList({
      page: this.dangqian,//当前页数
      size:this.size,//一页显示几条
    });
  },
  methods: {
    ...mapActions({
      requestManageList: "manage/responseList",
    }),
    del(id) {
      requestManageDelete({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.requestManageList();
        }
      });
    },
    edit(id) {
      console.log(id);
      this.$emit("edit", id);
    },
    changePage(i) {
      this.dangqian = i;
      this.requestManageList({
        page: this.dangqian,//当前页数
        size: this.size,//一页显示几条
      });
    },
  },
};
</script>

<style>
</style>