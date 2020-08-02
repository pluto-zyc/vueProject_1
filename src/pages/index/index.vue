<template>
  <div>
    <el-container class="page">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :unique-opened="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 如果有目录 -->
          <!-- <el-submenu
            v-show="hasChildren"
            :index="item.id+''"
            :key="item.id"
            v-for="(item) in user.menus"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(i) in item.children" :key="i.title" :index="i.url">{{i.title}}</el-menu-item>
          </el-submenu> -->
          <!-- 如果 没有目录 -->
          <!-- <el-menu-item
            v-show="!hasChildren"
            :index="i.url"
            v-for="(i) in user.menus"
            :key="i.title"
          >
            <span slot="title">{{i.title}}</span>
          </el-menu-item>
        </el-menu> -->

         <!-- 目录和菜单混合 -->
          <template v-for="(item) in user.menus">
            <el-submenu v-if="item.children" :index="item.id+''" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="(i) in item.children" :key="i.title" :index="i.url">{{i.title}}</el-menu-item>
            </el-submenu>

            <el-menu-item v-if="!item.children" :key="item.id" :index="item.url">
              <span slot="title">{{item.title}}</span>
            </el-menu-item>

          </template>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="out">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包蟹导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- home页面出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    //用来判断是否有目录
    hasChildren() {
      return this.user.menus[0].children ? true : false;
    },
  },
  methods: {
    ...mapActions({
       changeUser: "changeUser",
    }),
    out() {
      this.changeUser(null);
      this.$router.push("/login")
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
  overflow: hidden;
}
.page {
  height: 100vh;
}
.header-con {
  float: right;
}
.header-con span {
  line-height: 60px;
  color: #ffffff;
}
</style>