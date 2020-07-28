<template>
<div>   
<el-row>
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
        title:'会员编辑',
    }
}
},
methods:{
    edit(id){
        this.info.show = true
        this.info.title="会员编辑"
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