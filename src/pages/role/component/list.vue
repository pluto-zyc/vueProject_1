<template>
  <el-table :data="roleList" style="width: 100%">

    <el-table-column prop="id" label="角色编号" width="180"></el-table-column>

    <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>

    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.tatus=1" type="primary">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @confirm='del(scope.row.id)'></del-btn>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import {requestRoleDelete} from '../../../utils/request'
export default {
  data() {
    return {
     
    };
  },
  computed:{
    ...mapGetters({
        roleList:'role/list'
    })
  },
  methods:{
    ...mapActions({
      requstRoleList:"role/responseList"
    }),
    del(id){
      requestRoleDelete({id:id}).then((res)=>{
        this.requstRoleList()
      })
         
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted(){
    this.requstRoleList()
  }
};
</script>

<style>
</style>