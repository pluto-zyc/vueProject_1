<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
      <el-form-item label="活动名称" prop="name" label-width="80px" :rules="{required:true}">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item prop="id" label="活动日期" label-width="80px">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="getDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="一级分类" label-width="80px">
        <el-select v-model="form.first_cateid" placeholder="请选择">
          <el-option label="请选择" value disabled></el-option>
          <!-- <el-option v-for="i in cateList" :key="i.id" :label="i.rolename" :value="i.id"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" label-width="80px">
        <el-select v-model="form.second_cateid" placeholder="请选择">
          <el-option label="请选择" value disabled></el-option>
          <!-- <el-option v-for="i in cateList" :key="i.id" :label="i.rolename" :value="i.id"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="商品" label-width="80px">
        <el-select v-model="form.goodsid" placeholder="请选择">
          <el-option label="请选择" value disabled></el-option>
          <!-- <el-option v-for="i in cateList" :key="i.id" :label="i.rolename" :value="i.id"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item label-width="80px">
        <el-button type="primary" v-if="info.isAdd" @click="add">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  requestSeckillAdd,
  requestSeckillDetail,
  requestSeckillUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      getDate:null,
      form: {
        title: '',
        begintime: '',
        endtime: '',
        first_cateid:1,
        second_cateid:1,
        goodsid:1,
        status:1,
      },
    };
  },
  methods: {
    ...mapActions({
      responseSeckillList: "seckill/responseList",
    }),
    // 置空
    empty() {
      this.form ={
        title: '',
        begintime: '',
        endtime: '',
        first_cateid:1,
        second_cateid:1,
        goodsid:1,
        status:1,
      };
    },
    // 取消
    cancel() {
      this.info.show = false;
    },
    // 编辑请求
    getDetail(id) {
      requestSeckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    
    // 添加
    add() {
      // 获取时间戳
      this.first_cateid =  this.getDate[0].getTime()
      this.second_cateid =  this.getDate[1].getTime()
      // requestSeckillAdd(this.form).then((res) => {
      //   if (res.data.code == 200) {
      //     successAlert("添加成功");
      //     // this.cancel();
      //     // this.responseSeckillList();
      //   }
      // });
    },
    // 修改
    update() {
      requestSeckillUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.responseSeckillList();
        } else {
          warningAlert("修改失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.box-img {
  cursor: pointer;
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  position: relative;
}
h3 {
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
}

img {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

input {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>