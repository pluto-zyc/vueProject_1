<template>
  <div>
    <el-row>
      <el-button type="primary" round @click="add">添加</el-button>
      <v-list @edit="edit" ref="cTotal"></v-list>
      <v-add :info="info" ref="add" @changeTotal="changeTotal"></v-add>
    </el-row>
  </div>
</template>
<script>
import vAdd from "./component/add";
import vList from "./component/list";
import { requestManageNum } from "../../utils/request";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        title: "管理员管理",
        show: false,
        isAdd: true,
      },
    };
  },
  methods: {
    changeTotal() {
      // 添加了信息  需要获取总条数并修改list的total 调用请求管理员列表更新（当前页数，一页显示几条）
      requestManageNum().then((res) => {
        if (res.data.code == 200) {
          // console.log(this.$refs.cTotal.total);// 添加之前数据
          this.$refs.cTotal.total = res.data.list[0].total; //修改总数
          this.$refs.cTotal
            .requestManageList({
              page: this.$refs.cTotal.dangqian,
              size: this.$refs.cTotal.size,
            })
        }
      });
    },
    add() {
      (this.info.title = "添加管理员"),
        (this.info.show = true),
        (this.info.isAdd = true);
    },
    edit(id) {
      (this.info.title = "编辑管理员"),
        (this.info.show = true),
        (this.info.isAdd = false);
      this.$refs.add.getManageDatil(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>