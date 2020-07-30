<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
      <!-- :rules="rules" -->
      <el-form-item label="活动名称" prop="title" label-width="80px" >
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item prop="getDate" label="活动日期" label-width="80px">
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
        <el-select v-model="form.first_cateid" placeholder="请选择" @change="getEj">
          <el-option label="请选择" value disabled></el-option>
          <el-option v-for="i in cateList" :key="i.id" :label="i.catename" :value="i.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" label-width="80px">
        <el-select v-model="form.second_cateid" placeholder="请选择" @change="getGoods">
          <el-option label="请选择" value disabled></el-option>
          <el-option v-for="i in secondArr_cate" :key="i.id" :label="i.catename" :value="i.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" label-width="80px">
        <el-select v-model="form.goodsid" placeholder="请选择">
          <el-option label="请选择" value disabled></el-option>
          <el-option v-for="i in goodsList" :key="i.id" :label="i.goodsname" :value="i.id"></el-option>
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
      getDate: null,
      secondArr_cate: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // rules:{
      //   title:[
      //     {required:true, message: '请输入活动名称'}
      //   ]
      // }
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list", //分类
      goodsList: "goods/list", //分类
    }),
  },
  mounted() {
    //  请求一级分类
    this.responseCateList(); //获得要渲染add的分类选项
  },
  methods: {
    ...mapActions({
      responseSeckillList: "seckill/responseList",
      responseCateList: "cate/responseList",
      responseGoodsList: "goods/responseList",
    }),
    // 置空
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    // 取消
    cancel() {
      this.info.show = false;
    },
    // 获取二级
    getEj() {
      this.secondArr_cate = []; //清除上次labal
      this.form.second_cateid = ""; //清除上次labal
      //   遍历分类list 判断每一项的id是不是和选中到输入框的id相等
      this.cateList.forEach((item) => {
        if (item.id == this.form.first_cateid) {
          item.children.forEach((i) => {
            this.secondArr_cate.push(i);
          });
        }
      });
    },
    // 获取商品
    getGoods() {
      if (this.second_cateid != "") {
        this.responseGoodsList({
          fid: this.first_cateid, //一级分类
          sid: this.second_cateid, //二级分类
        });
      }
    },
    // 编辑请求
    getDetail(id) {
      requestSeckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;

        var data1 = new Date(parseFloat(res.data.list.begintime));
        var data2 = new Date(parseFloat(res.data.list.endtime));
        this.getDate = [data1, data2];
      });
    },
    // 添加
    add() {
      if (this.getDate) {
        this.form.begintime = this.getDate[0].getTime();
        this.form.endtime = this.getDate[1].getTime();
      }
      switch (true) {
        case !this.form.title:
          warningAlert("活动名称不能为空");
          break;
        case !this.form.begintime:
          warningAlert("请选择日期");
          break;
        case !this.form.endtime:
          warningAlert("请选择日期");
          break;
        case !this.form.first_cateid:
          warningAlert("请选择一级分类");
          break;
        case !this.form.second_cateid:
          warningAlert("请选择二级分类");
          break;
        case !this.form.goodsid:
          warningAlert("请选择商品");
          break;
        default:
          requestSeckillAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("添加成功");
              this.cancel();
              this.responseSeckillList();
            }
          });
      }
    },
    // 修改
    update() {
      // 获取时间戳
      this.form.begintime = this.getDate[0].getTime();
      this.form.endtime = this.getDate[1].getTime();
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