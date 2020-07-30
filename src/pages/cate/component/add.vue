<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
      <el-form-item label="上级分类" label-width="80px">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="请选择" value disabled></el-option>
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option v-for="i in cateList" :key="i.id" :label="i.catename" :value="i.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="name" label-width="80px">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>

      <el-form-item label="图片" label-width="80px" v-if="form.pid!=0">
        <div class="box-img">
          <h3>+</h3>
          <img v-if="imageUrl" :src="imageUrl" alt />
          <input type="file" @change="changeImg2" />
        </div>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item>
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
  requestCateAdd,
  requestCateDetail,
  requestCateUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
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
    // 置空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
    },
    // 取消
    cancel() {
      this.info.show = false;
    },
    // 编辑请求
    getDetail(id) {
      requestCateDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
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
    add() {
      
      switch (true) {
        case this.form.pid === "":
          warningAlert("请选择上级分类");
          break;
        case !this.form.catename:
          warningAlert("请填写分类名称~");
          break;
        case !this.form.img && this.form.pid != 0:
          warningAlert("请选择图片");
          break;
        default:
          requestCateAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("添加成功");
              this.cancel();
              this.responseCateList();
            }
          });
      }
    },
    // 修改
    update() {
      requestCateUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.responseCateList();
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