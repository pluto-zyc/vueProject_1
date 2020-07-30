<template>
  <div class="box">
    <template>
      <el-table :data="goodsList" stripe style="width: 100%">
        <el-table-column prop="id" label="商品编号" width="100"></el-table-column>

        <el-table-column prop="goodsname" label="商品名称" width="100"></el-table-column>

        <el-table-column prop="price" label="商品价格" width="100"></el-table-column>

        <el-table-column prop="market_price" label="市场价格"></el-table-column>

        <el-table-column prop="address" label="图片">
          <template slot-scope="scope">
            <img :src="$imgPre+scope.row.img" alt />
          </template>
        </el-table-column>

        <el-table-column prop="isnew" label="是否新品">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="ishot" label="是否热卖">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.hot==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="danger" v-else>禁用</el-button>
          </template>
        </el-table-column>

         <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="size"
        :total="total"
        @current-change="changeSize"
      ></el-pagination>
    </template>
  </div>
</template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { requestGoodsCount,requestGoodsDelete } from "../../../utils/request";
export default {
  components: {},
  data() {
    return {
      total: 0, //总数
      size: 2, //一页几条
      nowPage: 1, //当前
    };
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
    changeSize(e) {
      (this.nowPage = e),
        this.responseGoodsList({
          page: this.nowPage,
          size: this.size,
        });
    },
    // 删除
    del(id) {
        requestGoodsDelete({id:id}).then((res)=>{
            if(res.data.code==200){
              successAlert('删除成功')
              this.responseGoodsList()
            }else{
              warningAlert('删除失败')
            }
        })
    },
     // 修改通知
    edit(id){
        this.$emit('edit',id)
    },
  },
  mounted() {
    requestGoodsCount().then((res) => {
      this.total = res.data.list[0].total;
    });
    this.responseGoodsList({
      page: this.now,
      size: this.size,
    });
  },
};
</script>
<style scoped>
img {
  width: 70px;
  height: 70px;
}
</style>