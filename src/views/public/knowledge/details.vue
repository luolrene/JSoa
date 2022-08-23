<template>
  <div class="pc-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="aside">
          <div class="title">导航栏<span class="cname">Guide bar<i class="el-icon-bottom-right"></i></span></div>
          <el-menu default-active="" v-for="(item,index) in asideData" :key="index" :index="item.name" @select="handleSelect(item)">
            <el-menu-item>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <!-- 循换新闻列表 -->
        <div style="margin-top:15px">
          <div v-if="list">
            <div class="no_text" v-if="KnowledgeData.length===0">暂无数据</div>
            <div class="newBox" v-for="(item,index) in KnowledgeData" :key="index" @click="listData(item)">
              <div class="title">{{item.name}}</div>
              <div class="mainBody" v-html="item.oaDescribe"></div>
              <div class="exp">
                <i class="el-icon-discount"><span>{{item.knowledgeName}}</span></i>
                <i class="el-icon-user"><span>{{item.createUserName}}</span></i>
                <i class="el-icon-time"><span>{{item.createTime}}</span></i>
              </div>
            </div>
            <div style="margin:10px">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formData.pageSize" :page-sizes="[5, 10, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
        <div v-if="!list">
          <div style="height:calc(100vh - 160px)">
            <el-scrollbar class="page-component__scroll" style="height:100%;" :native="false">
              <div class="head">
                <div class="title">{{params.name}}</div>
                <div class="nav">
                  <span class="name1"> {{params.createTime}}</span>
                  <span class="name1"> {{params.knowledgeName}}</span>
                  <span class="name1">发件人:{{params.createUserName}}<i @click="getInfo"></i></span>
                  <!-- 卡片信息 -->
                  <div class="messageBox" ref="name" v-show="show">
                    <tr>
                      <td class="td1">{{user.name}}</td>
                      <td class="close" @click="getInfo">关闭</td>
                    </tr>
                    <tr>
                      <td>部门:<span>{{user.groupName}}</span></td>
                    </tr>
                    <tr>
                      <td>职级:<span>{{user.administrativeRankName}}</span></td>
                    </tr>
                    <tr>
                      <td>联系电话:<span>{{user.mobile}}</span></td>
                    </tr>
                  </div>
                </div>
              </div>
              <div class="describe">
                <div class="paragraph" v-html="params.oaDescribe"></div>
              </div>
              <div class="main">
                <div v-show="fileList.length > 0">
                  <div class="name">附件：</div>
                  <div class="content">
                    <div v-if="fileList.length === 0"></div>
                    <fileList :fileList="fileList" :direct="true" style="padding:0;" v-else></fileList>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import fileList from '../../common/fileList.vue'
import { getKnowledgeGetChildren, getKnowledgePointsHomePage } from '@/api/jcxxgl/knowledge.js'
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getKnowledgePointsGetFile } from '@/api/file.js'
export default {
  data() {
    return {
      loading: false,
      show: false,
      list: null,
      id: null,
      params: {},
      asideData: [],
      KnowledgeData: [],
      formData: {
        pageSize: 5,
        pageNow: 1
      },
      fileList: [],
      user: {},
      total: 0
    }
  },
  components: {
    fileList
  },
  methods: {
    // 获取侧边栏
    getAsideData() {
      getKnowledgeGetChildren({}).then(res => {
        this.asideData = res.result
      })
    },
    // 点击侧边栏
    handleSelect(a) {
      this.formData.pageSize = 5
      this.formData.pageNow = 1
      this.getListData(a.id)
      this.id = a.id
    },
    getInfo() {
      this.show = !this.show
    },
    getUser() {
      let data = {}
      data.pageSize = 1
      data.pageNow = 1
      data.id = this.params.createUser
      getUserQueryPageData(data).then(res => {
        this.user = res.result.pageList[0]
      })
    },
    listData(data) {
      this.params = data
      this.list = false
      this.getFileData(data)
      this.getUser()
    },
    // 获取列表信息
    getListData(id) {
      this.formData.knowledgeId = id
      getKnowledgePointsHomePage(this.formData).then(res => {
        this.total = res.result.dataSum
        this.KnowledgeData = res.result.pageList
        this.list = true
      })
    },
    // 获取附件信息
    getFileData(data) {
      getKnowledgePointsGetFile({ onlyCode: data.onlyCode }).then(res => {
        this.fileList = res.result
      })
    },
    handleSizeChange(val) {
      this.formData.pageSize = val
      this.getListData(this.id)
    },
    handleCurrentChange(val) {
      this.formData.pageNow = val
      this.getListData(this.id)
    },
    top() { }
  },
  mounted() {
    if (this.$route.params) {
      this.params = this.$route.params
    }
    if (this.params.id) {
      this.getFileData(this.params)
      this.getUser()
    } else {
      this.getListData()
    }
  },
  created() {
    this.getAsideData()
  }
}
</script>

<style scoped lang="scss">
.aside {
  margin-top: 20px;
  min-height: calc(100vh - 200px);
  border: 1px solid rgb(211, 211, 211);
  background: #fafafa;
  box-shadow: 0px -1px 7px 4px rgba(206, 206, 206, 0.5);
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    color: #0195db;
    font-weight: 600;
  }
}
.no_text {
  color: #c5c5c5;
  font-weight: 800;
  font-size: 30px;
}
.newBox {
  padding: 15px;
  margin-bottom: 10px;
  width: 85%;
  height: 106px;
  text-align: left;
  color: #0195db;
  overflow: hidden;
  background: #fafafa;
  border-radius: 15px;
  border-bottom: 2px solid #d3d3d3;
  cursor: pointer;
  .title {
    font-weight: 700;
    font-size: 24px;
  }
  .mainBody {
    display: inline-block;
    display: -webkit-box;
    overflow: hidden;
    height: 70px;
    color: #747474;
    vertical-align: top;
    text-align: justify;
    text-overflow: ellipsis;
    font-size: 14px;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 3;
  }
  .exp {
    display: flex;
    justify-content: space-around;
    span {
      color: #b4bab8;
      vertical-align: middle;
      font-size: 13px;
    }
  }
}
.newBox:hover {
  background: #fff;
}
.head {
  height: 82px;
  text-align: center;
  border-bottom: 1px #ccc double;
  .title {
    width: 55%;
    margin: 20px auto 10px;
    color: #333;
    letter-spacing: 4px;
    font-size: 28px;
  }
  .nav {
    position: relative;
    font-size: 14px;
    color: #333;
    .name1 {
      display: inline-block;
      margin: 10px 60px 10px 60px;
    }
    i {
      display: inline-block;
      width: 20px;
      height: 18px;
      background: url('/static/img/default/card.png');
      background-size: cover;
      cursor: pointer;
      position: relative;
      left: 7px;
      top: 3px;
    }
  }
}
.describe {
  margin: 20px auto;
  width: 80%;
  min-height: 100px;
  color: #333;
  text-align: left;
  font-size: 18px;
  line-height: 20px;
}
.paragraph {
  margin: 0px;
  padding: 0px;
  text-align: justify;
  text-indent: 2em;
  font-size: 12pt;
}
.main {
  margin: 0 auto 20px;
  width: 80%;
  min-height: 80px;
  // background: #e5e5e5;
  .name {
    color: #0195db;
    font-size: 16px;
  }
}
.messageBox {
  position: absolute;
  top: -160%;
  left: 78%;
  padding: 10px;
  width: 235px;
  height: 80px;
  border: 1px solid #999;
  border-radius: 10px;
  box-shadow: 0 5px 10px #999;
}
td {
  text-align: left;
  color: #999;
  span {
    color: #333;
    font-size: 14px;
    line-height: 21px;
  }
}

.td1 {
  width: 88%;
  color: #0195db;
  font-weight: 700;
  font-size: 18px;
}

.close {
  color: #0195db;
  font-size: 14px;
  cursor: pointer;
}

.cname {
  position: relative;
  top: 1px;
  left: 5px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: #999;
}
</style>
