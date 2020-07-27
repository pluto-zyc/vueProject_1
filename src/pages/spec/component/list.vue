<template>
  <div class="box">
    <template>
      <el-table :data="specList" style="width: 100%">
        <el-table-column prop="id" label="规格编号" width="180"></el-table-column>

        <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>

        <el-table-column prop="attrs" label="规格属性"></el-table-column>

        <el-table-column prop="status" label="规格状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="规格操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="update(scope.row.id)">编辑</el-button>
            <del-btn @confirm="del(scope.row.id)"></del-btn>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :page-size="2" :total="2"></el-pagination>
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      specList: "spec/list",
    }),
  },
  methods: {
    ...mapActions({
      specResponseList: "spec/responseList",
    }),
    // 编辑
    update(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      requestSpecDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.specResponseList({
            page: 1,
            size: 6,
          });
        } else {
          warningAlert("删除失败");
        }
      });
    },
  },
  mounted() {
    this.specResponseList({
      page: 1,
      size: 6,
    });
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