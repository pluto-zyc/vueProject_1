<template>
  <div class="box">
    <template>
      <el-table :data="goodsList" stripe style="width: 100%">
        <el-table-column prop="date" label="商品编号" width="180"></el-table-column>

        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>

        <el-table-column prop="address" label="商品价格"></el-table-column>

        <el-table-column prop="address" label="市场价格"></el-table-column>

        <el-table-column prop="address" label="图片">
          <template slot-scope="scope">
            <img :src="$imgPre+scope.row.img" alt />
          </template>
        </el-table-column>

        <el-table-column prop="address" label="是否新品">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="是否热卖">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="danger" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <!-- <el-button type="danger" v-else>禁用</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/list", //商品列表
    }),
  },
  methods: {
    ...mapActions({
      responseGoodsList: "goods/responseList",
    }),
  },
  mounted() {
    this.responseGoodsList({
      page: 1,
      size: 10,
    });
  },
};
</script>
<style scoped>
</style>