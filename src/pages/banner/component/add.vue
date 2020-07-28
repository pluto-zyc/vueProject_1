<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
     
      <el-form-item label="标题" prop="name" label-width="80px">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="图片" label-width="80px" v-if="form.pid!==0">
        <div class="box-img">
          <h3>+</h3>
          <img v-if="imageUrl" :src="imageUrl" alt />
          <input type="file" @change="changeImg2" />
        </div>
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
import { requestBannerAdd,requestBannerDetail,requestBannerUpdate } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      form: {
        title: 1,
        img:null,
        status: 1,
      },
    };
  },
  methods: {
     ...mapActions({
       responseBannerList:'banner/responseList'
     }),
    // 置空
    empty() {
      this.form = {
        pid: 1,
        catename: "",
        img: "",
        status: 1,
      };
    },
    // 取消
    cancel(){
      this.info.show = false
    },
    // 编辑请求
    getDetail(id){
      requestBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    // 获取图片
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
    // 添加
    add() {
      console.log(this.form);
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel()
          this.responseBannerList()
        }
      });
    },
    // 修改
    update(){
       requestBannerUpdate(this.form).then((res)=>{
         if(res.data.code==200){
           successAlert('修改成功')
           this.empty()
           this.cancel()
           this.responseBannerList()
         }else{
           warningAlert('修改失败')
         }
       })
    }
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