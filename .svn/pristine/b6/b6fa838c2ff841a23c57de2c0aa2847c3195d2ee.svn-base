<template>
  <div class='bg'>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside class="module-menu-container">
          <div class="module-menu-panel">
            <el-scrollbar class="page-component__scroll" :native="false">
              <el-menu style="padding-top: 20px;" :router="true" :unique-opened="true" :collapse="menuCollapse" :default-active="$route.path" class="el-menu-vertical-demo">
                <i class="el-icon-s-grid" style="font-size: 38px;color: #FFFF;cursor: pointer;" @click="toHome"></i>
                <!-- <el-badge :value="$store.getters.taskTips" class="item" :hidden="$store.getters.taskTips === 0">
               </el-badge> -->
                <MenuItem :menulist="sysMenu" />
              </el-menu>
            </el-scrollbar>
          </div>
        </el-aside>
        <el-main class="module-main-container">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="module-breadcrumb">
            <img src="../../static/img/home/arrowBK.png" alt="" class="arrowBK" @click="changeMenuCollapse">
            <div class="info">
              <span class="text">{{this.info.name}}-{{this.info.jobNumber}}-{{this.info.groupName}}-{{this.info.administrativeRankName}}</span>
            </div>
            <el-breadcrumb-item v-for="(item, idx) in $route.matched" :key="idx" v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
            <!-- <myDrawer v-if="$store.getters.userInfo. role==='44fb0a6e2bf44d3b9726ae4a83b9874e'"></myDrawer> -->
          </el-breadcrumb>
          <el-scrollbar class="page-component__scroll" :native="false">
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Header from './Header'
import MenuItem from './MenuItem'
import myDrawer from '../views/common/my_drawer.vue'
export default {
  name: 'ModuleComponent',
  components: {
    Header,
    MenuItem,
    myDrawer
  },
  data() {
    return {
      text: '',
      menuCollapse: false,
      drawer: false,
      info: {},
      sysMenu: [],
      color: localStorage.getItem('style'),
      headColor: null,
      asidColor: null
    }
  },
  methods: {
    changeMenuCollapse() {
      this.menuCollapse = !this.menuCollapse
    },
    toHome() {
      this.$router.push('/home')
    }
  },
  watch: {
    color(val, oldVal) {
      this.$el.style.setProperty('--headStyle', val)
      this.$el.style.setProperty('--asidStyle', val)
    }
  },
  mounted() {
    this.$el.style.setProperty('--headStyle', this.headColor)
    this.$el.style.setProperty('--asidStyle', this.asidColor)
    this.sysMenu = this.$store.getters.userInfo.menus
    this.info = this.$store.getters.userInfo
  },
  created() {
    this.headColor = JSON.parse(localStorage.getItem('style')).head
    this.asidColor = JSON.parse(localStorage.getItem('style')).asid
  }
}
</script>

<style scoped lang="scss">
.bg {
  background: #f2f2f2;
}
.el-header {
  height: 70px !important;
  margin-bottom: 15px;
  // 头颜色
  background: var(--headStyle);
}
.el-main {
  height: 100%;
  padding: 0;
}
.el-aside {
  background-color: var(--asidStyle);
}
.el-menu {
  width: 200px;
  height: calc(100vh - 95px);
  // 侧边颜色
  background-color: var(--asidStyle);
}
.module-menu-container {
  width: auto !important;
  padding: 0px;
  margin-bottom: 0px;
  overflow-x: hidden;
}
.module-menu-panel {
  height: 100%;
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-flow: row nowrap;
  /* justify-content: center; */
  align-items: center;
}
.menu-collapse-btn {
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.module-breadcrumb {
  position: relative;
  display: flex;
  align-items: center;
  line-height: 45px;
  background-color: #ffffff;
  padding-left: 10px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  font-size: 14px;
}
.module-breadcrumb .arrowBK {
  margin-right: 20px;
  cursor: pointer;
}
.el-menu--collapse {
  width: 50px;
}
.info {
  position: absolute;
  left: 250px;
}
.text {
  font-size: 16px;
  color: #0195db;
  cursor: default;
}
</style>
