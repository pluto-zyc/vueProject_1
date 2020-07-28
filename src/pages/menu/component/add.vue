<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option v-for="i in menuList" :key="i.id" :label="i.title"  :value="i.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型" label-width="80px">
        <el-radio v-model="form.type" :label="1">目录</el-radio>
        <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>

      <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
        <el-select v-model="form.icon" placeholder="请选择">
          <el-option label="请选择" value disabled></el-option>
          <el-option v-for="i in icons" :key="i" :label="i" :value="i"></el-option>
        </el-select>
      </el-form-item>

        <el-form-item label="菜单地址123" label-width="80px" v-else>
          <el-select v-model="form.url">
            <el-option label="--请选择123--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
      <el-button type="primary" v-else @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>


<script>
// 菜单添加
import {RequestAdd} from '../../../utils/request'

import {successAlert,warningAlert} from '../../../utils/alert'

import { mapGetters, mapActions } from "vuex";
// 获取一条数据
import {RequestDetail} from '../../../utils/request'
// 菜单修改
import {RequestMenuUpdate} from '../../../utils/request'
export default {
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  props: ["info"],
  data() {
    return {
       //图标集合
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      //路由集合
      urls: [
        "/member",
        "/home1",
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill", 
      ],
       form: {
        url: "",
        title: "",
        menu: "",
        status: 1,
        type: 1,
        icon: "",
      },
      //图标集合
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      
     
    };
  },
  methods: {
     ...mapActions({
      responseList: "menu/responseList",
    }),
    // 获取某一条数据
     getDetail(id) {
      RequestDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //重置内容
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    cancel() {
       this.info.show = false;
      if(!this.info.isAdd){
        this.empty()
      }
    },
    // 添加按钮
    add(){
       RequestAdd(this.form).then((res)=>{
         if(res.data.code==200){
          //  添加成功弹出成功提示
           successAlert(res.data.msg);
          //  关闭添加框
           this.cancel();
          this.responseList()
         }else{
          //  添加失败提示
          warningAlert(res.data.msg)
         }
       })
    },
    // 菜单修改
    update(){
      RequestMenuUpdate(this.form).then((res)=>{
         if(res.data.code==200){
           successAlert('修改成功')
          
           this.empty()//  清空add面板form数据
           this.cancel() //  取消按钮
          //  重新渲染列表
              this.responseList()
         }else{
           warningAlert('修改失败')
         }
      })
    }
  },
};
</script>

<style>
</style>