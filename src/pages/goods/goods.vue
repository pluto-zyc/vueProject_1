<template>
  <div class="box">
    <el-row>
      <el-button type="primary" round @click="add">添加</el-button>
      <v-list @edit="edit" ref="getListMethod"></v-list>
      <v-add :info="info" ref="add" @responseGoodsList="responseGoodsList"></v-add>
    </el-row>
  </div>
</template>
<script>
import vAdd from "./component/add";
import vList from "./component/list";

import { requestGoodsCount } from "../../utils/request";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        show: false,
        isAdd: false,
        title: "商品分类",
      },
    };
  },
  computed: {},
  methods: {
    add() {
      (this.info.show = true),
        (this.info.isAdd = true),
        (this.info.title = "商品分类");
      this.$refs.add.getSome();
    },
    // 在add点了添加以后
    responseGoodsList() {
      requestGoodsCount().then((res) => {
        this.$refs.getListMethod.total = res.data.list[0].total;
      });
      // 调用一下list渲染页面的请求
      this.$refs.getListMethod.responseGoodsList({
        page: 1,
        size: 2,
      });
    },
    // 点了编辑
    edit(id) {
      (this.info.show = true),
        (this.info.isAdd = false),
        (this.info.title = "商品修改");
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scope>
.box {
  padding-top: 20px;
}
</style>