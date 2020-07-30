<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="规格名称" :rules="{
      required: true, message: '名称不能为空', 
    }">
        <el-input v-model="form.specsname"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(domain) in dynamicValidateForm.domains"
        :label="'规格属性'"
        :key="domain.key"
        :prop="'domain'"
      >
        <!-- :rules="{
        required: true, trigger: 'blur'
        }"-->
        <el-input v-model="domain.value"></el-input>
        <el-button class="attr_del" type="danger" @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button class="attr_add" @click="addDomain" type="primary">新增规格</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
//  import {mapGetters,mapActions} from 'vuex'
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  requestSpecAdd,
  requestSpecDetail,
  requestSpecUpdate,
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      is: true,
      newArr: [],
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
      },
      form: {
        specsname: "",
        status: 1,
        attrs: "",
      },
      arr: "",
    };
  },
  computed: {
    ...mapGetters({
      specList: "spec/list",
    }),
  },
  methods: {
    ...mapActions({
      specResponseList: "spec/responseList",
    }),
    // 置空
    empty() {
      this.form = {
        specsname: "",
        status: 1,
        attrs: "",
      };
      (this.arr = []),
        (this.dynamicValidateForm.domains = [
          {
            value: "",
          },
        ]);
    },
    // 取消
    cancel() {
      this.info.show = false;
    },
    // 添加数据
    add() {
      if (!this.form.specsname) {
        warningAlert("请填写规格名称~");
        return;
      }
      // 开始就置空
      this.newArr = [];
      //  比那里用户选择的属性attrs
      this.dynamicValidateForm.domains.forEach((item) => {
        this.newArr.push(item.value);
      });
      this.newArr.forEach((item) => {
        if (!item) {
          this.is = false;
        }
      });
      if (this.is == false) {
        warningAlert("请填写规格属性");
        this.is = true;
      } else {
        // 给参数赋值用于 请求
        this.form.attrs = JSON.stringify(this.newArr);
        console.log(this.form);
        // 请求一条渲染 add面板
        requestSpecAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.empty();
            this.cancel();
          } else {
            warningAlert("添加失败");
          }
        });
      }
    },
    // 请求一条
    getSpecDetail(id) {
      requestSpecDetail({ id: id }).then((res) => {
        this.form.id = res.data.list[0].id;
        // 请求到数据 给form赋值
        this.form.specsname = res.data.list[0].specsname;
        this.form.status = res.data.list[0].status;
        this.dynamicValidateForm.domains = [];
        // 给dynamicValidateForm赋值
        JSON.parse(res.data.list[0].attrs).forEach((item) => {
          this.dynamicValidateForm.domains.push({ value: item });
        });
      });
    },
    // 修改数据
    update() {
      requestSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.specResponseList({
            page: 1,
            size: 6,
          });
        }
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>
   
<style scoped>
.attr2 {
  position: relative;
}
/* .attr_add {
  position: absolute;
  top: 0px;
  right: 0px;
} */
.attr_del {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>