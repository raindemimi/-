/* eslint-disable space-before-function-paren */
<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_button" @click="toggle">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          :unique-opened="true"
          :collapse="isCollapse"
          active-text-color="#409EFF"
          :collapse-transition="false"
          :router="true"
          :default-active="acitvePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单主题区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconList[item.id]"></i>
              <!-- 文字 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavStatus('/' + subItem.path)"
            >
              <!-- 二级菜单主题区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 定义侧边栏一级菜单字体图标对象
      iconList: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-lock_fill',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 定义侧边栏菜单是否折叠或展开
      isCollapse: false,
      // 保存链接地址
      acitvePath: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getMenuList()
    this.acitvePath = window.sessionStorage.getItem('activePath')
  },
  mounted() {},
  methods: {
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res)
      this.menuList = res.data
    },
    // 定义侧边栏菜单是否折叠或展开
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接地址到sessionStorage
    saveNavStatus(acitvePath) {
      window.sessionStorage.setItem('activePath', acitvePath)
      this.acitvePath = acitvePath
    }
  }
}
</script>

<style scoped lang="less">
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    font-size: 20px;
    > span {
      margin-left: 15px;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #333744;
  box-sizing: border-box;
  > .el-menu {
    border-right: none;
  }
}
.el-mian {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle_button {
  background-color: #5e6962;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  color: #ffffff;
  cursor: pointer;
}
</style>
