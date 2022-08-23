<template>
  <div class="header-panel">
    <div class="header-panel-left">
      <img src="../../static/img/login/logo_jsjc.png" alt="" style="margin:0 20px;">
      <img src="../../static/img/login/TAS_logo.png"
        @click="getToTas"
        style="margin:0 20px 0 20px;cursor: pointer;"
        width="45" title="前往九升TAS系统">
      <span style="margin-left:20px;color:#4a4a4a;text-align: center;">办公自动化系统</span>
    </div>
    <div class="header-panel-right">
      <!-- 用户信息 -->
      <el-tooltip class="item user" effect="light" content="用户信息" placement="bottom-start">
        <el-dropdown trigger="click">
          <div>
            <el-avatar :src="avatarImg" :size="40" style="margin-right:80px;background:#fff;"></el-avatar>
            <div class="name">
              {{this.$store.getters.userInfo.name}}
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">
              <span @click="userInfo">个人资料</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting">
              <span @click="getUpdpass">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-bank-card">
              <span @click="getCardNum">卡号管理</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
      <!-- 返回门户 -->
      <el-tooltip class="item" effect="light" content="返回门户" placement="bottom-start">
        <img src="../../static/img/home/home.png" alt="" class="mous ml15" style="height:24px;" @click="getHome">
      </el-tooltip>
      <!-- 消息通知 -->
      <el-tooltip class="item" effect="light" content="消息通知" title="消息通知" placement="bottom-start">
        <el-badge :value='this.num1' class="item " v-if="this.num1>0">
          <i class="el-icon-bell mous ml15" style="font-size:25px;color:#4e4e4e;" @click="getNotice"></i>
        </el-badge>
        <i v-else class="el-icon-bell mous ml15" style="font-size:25px;color:#4e4e4e;" @click="getNotice"></i>
      </el-tooltip>
      <!-- 待办事项 -->
      <el-tooltip class="item" effect="light" content="待办事项" title="待办事项" placement="bottom-start">
        <el-badge :value='this.num' class="item " v-if="this.num>0">
          <i class="el-icon-date mous ml15" style="font-size:25px;color:#4e4e4e;" @click="pushInfo"></i>
        </el-badge>
        <i v-else class="el-icon-date mous ml15" style="font-size:25px;color:#4e4e4e;" @click="pushInfo"></i>
      </el-tooltip>
      <!-- 反馈功能 -->
      <el-tooltip class="item" effect="light" content="我要反馈" placement="bottom-start">
        <i class="el-icon-edit-outline mous ml15" style="font-size:24px;color:#4a4a4a;" @click="getFeedback"></i>
      </el-tooltip>
      <!-- 风格转换 -->
      <el-tooltip class="item" effect="light" content="风格转换" placement="bottom-start">
        <i class="el-icon-brush mous ml15" style="font-size:24px;color:#3a3a3a;" @click="changeStyle"></i>
      </el-tooltip>
      <div class="styleList" v-if="showStyle">
        <div class="title">
          <span>风格转换</span>
        </div>
        <div class="wrapper">
          <div class="mb10 mr10" v-for="(item,index) in styleData" :key="index">
            <div class="content" @click="theme(index+1)">
              <img :src="item" height="55" width="95" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 退出系统 -->
      <el-tooltip class="item" effect="light" content="退出系统" placement="bottom-start">
        <i class="el-icon-switch-button mous ml15" style="font-size:24px;color:#3a3a3a;" @click="logout"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getUserLoginout, getNoticeQueryPageData } from '@/api/login.js'
import { getToExamineStepQueryPageData } from '@/api/work/myApprove.js'
import userInfo from '../views/jcxxgl/user/detail.vue'
import cardNum from '../views/home/cardNum.vue'
import changePass from '../views/home/changePass.vue'
import feedback from '../views/home/feedback.vue'
import notice from '../views/home/notice.vue'
export default {
  components: {},
  inject: ['reload'],
  data() {
    return {
      num: '',
      num1: '',
      avatarImg: '',
      userData: {},
      showStyle: false,
      color: JSON.parse(localStorage.getItem('style')),
      styleData: ['/static/img/style/s1.png', '/static/img/style/s2.png', '/static/img/style/s3.png', '/static/img/style/s4.png']
    }
  },
  methods: {
    getToTas() {
      window.open('http://tas.9sjc.top/#/home?token=' + this.$store.getters.userInfo.token);
    },
    logout() {
      this.$store.dispatch('setUserInfo').then(res => {
        getUserLoginout().then(res => { })
        this.$router.push('/login')
        window.location.reload()
      })
    },
    getFeedback() {
      this.$layer.iframe({
        content: {
          content: feedback, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Self_Max,
        title: '用户反馈列表',
        maxmin: true,
        shadeClose: false
      })
    },
    pushInfo() {
      this.$router.push('/work/newsRemind')
    },
    getNews() {
      let obj = {}
      obj.pageSize = 999
      obj.pageNow = 1
      obj.state = '1'
      getToExamineStepQueryPageData(obj).then(res => {
        this.num = res.result.dataSum
      })
    },
    getNoticeData() {
      let obj = {}
      obj.pageSize = 99
      obj.pageNow = 1
      obj.type = 1
      obj.createUser = this.$store.getters.userInfo.id
      getNoticeQueryPageData(obj).then(res => {
        this.num1 = res.result.dataSum
      })
    },
    getNotice(params) {
      this.$layer.iframe({
        content: {
          content: notice, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: 'notice'
          }
        },
        area: this.$layer_Size.Max,
        title: '消息通知',
        maxmin: true,
        shadeClose: false
      })
    },
    getHome() {
      this.$router.push('/home')
    },
    userInfo() {
      this.$layer.iframe({
        content: {
          content: userInfo, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            // params: this.$store.getters.userInfo,
            params: this.userData,
            showList: true
          } // props
        },
        area: ['1520px', '760px'],
        title: '用户信息',
        maxmin: true,
        shadeClose: false
      })
    },
    getUpdpass() {
      this.$layer.iframe({
        content: {
          content: changePass, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: ['500px', '400px'],
        title: '修改密码',
        maxmin: true,
        shadeClose: false
      })
    },
    getCardNum() {
      this.$layer.iframe({
        content: {
          content: cardNum, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '卡号管理',
        maxmin: true,
        shadeClose: false
      })
    },
    changeStyle() {
      if (this.showStyle) {
        this.showStyle = false
      } else {
        this.showStyle = true
      }
    },
    theme(xdd) {
      switch (xdd) {
        case 1:
          this.color = { head: '#fff', asid: '#23282c', table: '#e1e1e3' }
          localStorage.setItem('style', JSON.stringify(this.color))
          this.reload()
          break
        case 2:
          this.color = { head: '#0195DB', asid: '#0195DB', table: '#d8eaf3' }
          localStorage.setItem('style', JSON.stringify(this.color))
          this.reload()
          break
        case 3:
          this.color = { head: '#0c9186', asid: '#05413c', table: '#cae3df' }
          localStorage.setItem('style', JSON.stringify(this.color))
          this.reload()
          break
        case 4:
          this.color = { head: '#e55394', asid: '#9d546c', table: '#ffeff6' }
          localStorage.setItem('style', JSON.stringify(this.color))
          this.reload()
      }
    },
    getUserData() {
      let obj = {}
      obj.pageSize = 1
      obj.pageNow = 1
      obj.id = this.$store.getters.userInfo.id
      getUserQueryPageData(obj).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.company) {
            case '1':
              xdd.companyName = '九升检测'
              break
            case '2':
              xdd.companyName = '集团公司'
              break
            case '3':
              xdd.companyName = '两山生态'
              break
            case '4':
              xdd.companyName = '吉东科技'
              break
            case '5':
              xdd.companyName = '碧泉科技'
              break
            case '6':
              xdd.companyName = '环测科技'
          }
          switch (xdd.politicalOutlook) {
            case '1':
              xdd.politicalOutlookName = '群众'
              break
            case '2':
              xdd.politicalOutlookName = '党员'
              break
            case '3':
              xdd.politicalOutlookName = '共青团员'
              break
            case '4':
              xdd.politicalOutlookName = '民主党派'
          }
          switch (xdd.maritalStatus) {
            case '1':
              xdd.maritalStatusName = '未婚'
              break
            case '2':
              xdd.maritalStatusName = '已婚'
              break
            case '3':
              xdd.maritalStatusName = '离异'
          }
          switch (xdd.registered) {
            case '1':
              xdd.registeredName = '城镇'
              break
            case '2':
              xdd.registeredName = '农村'
          }
          switch (xdd.publicHome) {
            case '1':
              xdd.publicHomeName = '是'
              break
            case '2':
              xdd.publicHomeName = '否'
          }
          switch (xdd.insuredState) {
            case '1':
              xdd.insuredStateName = '已参保'
              break
            case '2':
              xdd.insuredStateName = '未参保'
              break
            case '3':
              xdd.insuredStateName = '已退休'
              break
          }
          switch (xdd.freeze) {
            case '0':
              xdd.freezeName = '冻结'
              break
            case '1':
              xdd.freezeName = '正常'
          }
          switch (xdd.rankLev) {
            case '1':
              xdd.rankLevNum = '高级'
              break
            case '2':
              xdd.rankLevNum = '中级'
              break
            case '3':
              xdd.rankLevNum = '初级'
              break
            case '4':
              xdd.rankLevNum = '无职称'
          }
          switch (xdd.contractType) {
            case '1':
              xdd.contractTypeName = '劳动合同'
              break
            case '2':
              xdd.contractTypeName = '劳务协议'
              break
            case '3':
              xdd.contractTypeName = '实习协议'
              break
            case '4':
              xdd.contractTypeName = '兼职协议'
          }
          switch (xdd.education) {
            case '1':
              xdd.educationName = '硕士'
              break
            case '2':
              xdd.educationName = '本科'
              break
            case '3':
              xdd.educationName = '大专'
              break
            case '4':
              xdd.educationName = '中专'
              break
            case '5':
              xdd.educationName = '高中'
              break
            case '6':
              xdd.educationName = '高中以下'
          }
          switch (xdd.onTheJobStatus) {
            case '1':
              xdd.onTheJobStatusName = '在职'
              break
            case '2':
              xdd.onTheJobStatusName = '离职'
              break
            case '3':
              xdd.onTheJobStatusName = '试用期'
              break
            case '4':
              xdd.onTheJobStatusName = '退休'
              break
            case '5':
              xdd.onTheJobStatusName = '临时'
              break
            case '6':
              xdd.onTheJobStatusName = '实习期'
              break
            case '7':
              xdd.onTheJobStatusName = '挂靠'
              break
            case '8':
              xdd.onTheJobStatusName = '其他'
          }
        })
        this.userData = res.result.pageList[0]
      })
    }
  },
  mounted() {
    if (this.$store.getters.userInfo.sex === '男') {
      this.avatarImg = '../../static/img/home/user/man.png'
    } else {
      this.avatarImg = '../../static/img/home/user/woman.png'
    }
    this.getUserData()
  },
  created() {
    this.getNews()
    this.getNoticeData()
    window.setInterval(() => {
      setTimeout(this.getNews(), 0)
      setTimeout(this.getNoticeData(), 0)
    }, 300000)
  }
}
</script>
<style lang="scss">
$background-color: #0295db;
$font-size-A: 18px;
$font-size-B: 18px;
.el-avatar > img {
  display: inline !important;
  vertical-align: middle;
}
.header-panel {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  .header-panel-left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 23px;
    font-weight: bold;
    span {
      color: #ffffff;
    }
  }
  .header-panel-right {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 100%;
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.user {
  position: relative;
  .name {
    position: absolute;
    top: 9px;
    left: 54px;
    color: rgb(74, 74, 74);
    font-weight: 800;
    font-size: 18px;
  }
  .rule {
    position: absolute;
    top: 28px;
    left: 52px;
    color: #0079b1;
  }
}
.styleList {
  position: fixed;
  top: 70px;
  right: 40px;
  width: 240px;
  height: 200px;
  background: #fff;
  border: 1px #ddd solid;
  z-index: 2;
  box-shadow: 5px 5px 5px #ddd;
  .title {
    padding: 10px;
    height: 20px;
    font-size: 14px;
    text-align: left;
    color: #333;
    border-bottom: 1px #ddd solid;
  }
  .wrapper {
    padding: 10px;
    height: 141px;
    display: flex;
    flex-wrap: wrap;
    .content {
      display: inline-block;
      width: 100px;
      height: 30px;
      img {
        border: 1px #ddd dotted;
      }
    }
  }
}
</style>
