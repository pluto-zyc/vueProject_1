<template>
  <div class="box">
    <el-row>
      <el-button type="primary" round @click="add">添加</el-button>
       <v-add :info="info" ref="add"></v-add>
      <v-list @edit="edit"></v-list>
    </el-row>
  </div>
</template>
<script>
import vList from './component/list'
import vAdd from './component/add'
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
        info:{
            show:false,
            isAdd:true,
            title:'商品规格'
        }
    };
  },
  methods: {
      add(){
          this.info.show=true
          this.info.isAdd=true
          this.info.title='商品规格添加'
      },
      // 展示编辑面板，并调用调用add里请求一条的数据 渲染该面板
      edit(id){
          this.info.show=true
          this.info.isAdd=false
          this.info.title='商品规格编辑'
          this.$refs.add.getSpecDetail(id)
      }
  },
  mounted() {},
};
</script>
<style scoped>
.box{
  padding-top: 20px;

}
.el-row{
  padding: 0;
}
</style>