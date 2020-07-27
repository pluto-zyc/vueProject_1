<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="getEj">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="i in cateList" :key="i.id" :label="i.catename" :value="i.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="i in secondArr_cate" :key="i.id" :label="i.catename" :value="i.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :rules="{
      required: true, message: '名称不能为空', 
    }">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" label-width="80px">
          <!-- v-if="form.pid!==0" -->
          <div class="box-img">
            <h3>+</h3>
            <img v-if="imageUrl" :src="imageUrl" alt />
            <input type="file" @change="changeImg2" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格编号">
          <el-select v-model="form.specsid" @change="getEj2">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple filterable allow-create default-first-option>
            <el-option value label="请选择" disabled></el-option>
            <el-option v-for="item in secondArr_spec" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input type="textarea" :rows="2" v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-if="info.isAdd" @click="add">添加</el-button>
          <el-button type="primary" v-else @click="update">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { requestGoodsAdd } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      secondArr_cate: [],
      secondArr_spec: [],
      form: {
        first_cateid: 1, //一级分类编号
        second_cateid: 1, //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: null,
        specsid: 1, //商品规格编号
        specsattr: "", //商品规格属性
        description:"",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list", //分类列表
      specList: "spec/list", //规格列表
      goodsList: "goods/list", //商品列表
    }),
  },
  methods: {
    ...mapActions({
      responseCateList: "cate/responseList",
      responseSpecList: "spec/responseList",
      responseGoodsList: "goods/responseList",
    }),
    // 获取二级
    getEj(id) {
      this.secondArr_cate = []; //清除上次labal
      this.form.second_cateid = 1; //清除上次labal
      //   遍历分类list 判断每一项的id是不是和选中到输入框的id相等
      this.cateList.forEach((item) => {
        if (item.id == this.form.first_cateid) {
          item.children.forEach((i) => {
            //    console.log(i);
            this.secondArr_cate.push(i);
          });
        }
      });
    },
    getEj2(id) {
      this.form.specsattr = ""; //清除上次labal
      this.secondArr_spec = []; //清除上次push的二级
      //   遍历分类list
      this.specList.forEach((item) => {
        // 判断每一项的id是不是和选中到输入框的id相等
        if (item.id == this.form.specsid) {

          JSON.parse(item.attrs).forEach((i) => {
            this.secondArr_spec.push(i);
          });
        }
      });
    },
    // 获取上层数据
    getSome() {
      // 请求分类列表
      this.responseCateList();
      this.responseSpecList({
        page: 1,
        size: 10,
      });
    },
    changeImg2(e) {
      var file = e.target.files[0];
      //  限制大小
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件大小不能超过2M");
        return;
      }
      // 后缀名必须是 ['jpg','jpeg','gif','png']
      var hz = file.name.slice(file.name.lastIndexOf(".")); //.jsp
      var arr = [".jpg", ".jpeg", ".gif", ".png"];
      if (!arr.some((item) => item === hz)) {
        warningAlert("上传的必须是图片");
        return;
      }
      console.log(file);
      // 创建一个零时路径赋值给imageUrl让其显示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 取消
    cancel() {
      this.info.show = false;
    },
    // 添加数据
    add() {
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.responseGoodsList({
            page: 1,
            size: 10,
          });
        } else {
          warningAlert("添加失败");
        }
      });
    },
    update() {},
  },
  mounted() {},
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