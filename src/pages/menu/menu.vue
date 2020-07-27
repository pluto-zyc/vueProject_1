<template>
<div>   
<el-row>
  <el-button type="primary" round @click="add">添加</el-button>
   <v-list @edit="edit"></v-list>
  <v-add :info='info' ref='child' ></v-add>
</el-row>
</div>
</template>
<script>
import vList from './component/list'
import vAdd from './component/add'
export default {
components:{
    vList,
    vAdd
},
data(){
return {
    info:{
        show:false,
        title:'菜单添加',
        isAdd:false
    }
}
},
methods:{
    add(){
    this.info.show = true
     this.info.title="菜单添加"
     this.info.isAdd = true
    },
    edit(id){
        console.log(111);
        this.info.show = true
        this.info.title="菜单编辑"
        this.info.isAdd = false
        this.$refs.child.getDetail(id)
    }
},
mounted(){},
}
</script>
<style scoped>
.el-row{
    padding-top: 15px;
}
</style>