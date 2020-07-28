<template>
  <div class="box">
    <template>
      <el-table :data="memberList" style="width: 100%">

        <el-table-column prop="id" label="用户编号" width="180"></el-table-column>

        <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>

        <el-table-column prop="phone" label="手机号"></el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="update(scope.row.uid)">编辑</el-button>
        
          </template>
        </el-table-column>
      </el-table>

    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { requestSpecDelete } from "../../../utils/request";
export default {
  components: {},
  data() {
    return {
    
    };
  },
  computed: {
    ...mapGetters({
      memberList: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      MemberResponseList: "member/responseList",
    }),
    // 编辑
    update(id) {
      this.$emit("edit", id);
    },
  
  },
  mounted() {
    this.MemberResponseList();
  },
};
</script>
<style scoped>
.el-pagination {
  margin-top: 20px;
  margin-right: 20px;
  float: right;
}
</style>