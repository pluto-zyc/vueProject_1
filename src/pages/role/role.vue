<template>
  <div>
    <el-button type="primary" @click="changeInfo">添加</el-button>
    <v-list @edit='edit($event)'></v-list>
    <v-add :info="info" ref='add'></v-add>
  </div>
</template>
<script>


 import vList from "./component/list";
 import vAdd from "./component/add";
export default {
   
components:{
    vList,
    vAdd
},
data(){
return {
    info:{
        title:'角色管理',
        show:false,
        isAdd:true
    }
}
},
methods:{
    changeInfo(){
        this.info.show = true,
        this.info.title = '添加角色',
        this.info.isAdd=true
    },
    edit(id){
         this.info.show = true,
        this.info.title = '编辑角色'
        this.info.isAdd=false
        this.$refs.add.getRoleDetail(id)
    }
},
mounted(){},
}
</script>
<style scoped>
</style>