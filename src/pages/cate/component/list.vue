<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>

      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { requestCateDelete } from "../../../utils/request";
export default {
  data() {
    return {
   
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      responseCateList: "cate/responseList",
    }),
    // 修改通知
    edit(id){
        this.$emit('edit',id)
    },
    // 删除
    del(id) {
        requestCateDelete({id:id}).then((res)=>{
            if(res.data.code==200){
              successAlert('删除成功')
              this.responseCateList()
            }else{
              warningAlert('删除失败')
            }
        })
    },
  },
  mounted(){
    this.responseCateList()
  }
};
</script>

<style scoped>

img {
  cursor: pointer;
  width:80px;
  height: 80px;
}
</style>