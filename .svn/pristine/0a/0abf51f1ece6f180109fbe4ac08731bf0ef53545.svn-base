<template>
  <div class="pc-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="content">
          <div class="swiper">
            <el-carousel indicator-position="outside" height="470px">
              <el-carousel-item v-for="item in imgData" :key="item.id">
                <img :src="upload+item.imgUrl" alt="" height="100%" width="100%" :title="item.content">
                <div class="list">
                  <span style="color:#fff;line-height: 30px;"> {{item.title}} </span>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="7" style="position: relative;">
        <div class="content bgBox">
          <img src="../../../static/img/home/wall/2.png" height="100%" width="100%">
          <div class="fameWall">
            <el-carousel indicator-position="outside" :autoplay='false' height="300px">
              <el-carousel-item v-for="item in wallData" :key="item.id">
                <img :src="upload+item.imgUrl" alt="" height="100%" width="100%" :title="item.content">
                <div class="list">
                  <span style="line-height: 30px;"> {{item.title}} </span>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

      </el-col>
      <el-col :span="5">
        <div class="content">
          <times ref="time" :time="time" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <div class="title">
            <span class="headline" @click="newsRemind">待办事项</span>
            <span class="botton" @click="newsRemind">更多</span>
          </div>
          <div class="list" v-if="ApprovalData.length>0">
            <el-row :gutter="20" v-for="(item,id) in ApprovalData" :key="id">
              <el-col :span="10" class="mb5 tal" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">
                <span class="f12  mous col" @click="handleApproval(item)" :title="item.processName">{{item.processName}}</span>
              </el-col>
              <el-col :span="6" class="mb5">
                <span class="f12  mou">{{item.applyUserName}}</span>
              </el-col>
              <el-col :span="8" class="mb5">
                <span class="f12  mou">{{item.createTime}}</span>
              </el-col>
            </el-row>
          </div>
          <div v-else class="imgBox">
            <img src="../../../static/img/home/no_data.png" alt="">
            <div>暂无数据</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <div class="title">
            <span class="headline" @click="knowledge">知识库</span>
            <span class="botton" @click="knowledge">更多</span>
          </div>
          <div class="tabs">
            <div class="line"></div>
            <el-tabs v-model="active" @tab-click="handleClick">
              <el-tab-pane label="新闻资讯" name='1' lazy>
                <div class="list1" v-if="KnowledgeData.length>0">
                  <el-row :gutter="20" v-for="(item,id) in KnowledgeData" :key="id">
                    <el-col :span="12" class="mb5 tal" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">
                      <span class="f12  mous col" @click="handleEdit(item)" :title="item.name">{{item.name}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12  mou">{{item.createUserName}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12  mou">{{item.createTime}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-else class="img">
                  <img src="../../../static/img/home/no_data.png" alt="">
                  <div>暂无数据</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="规章制度" name='2' style="position: relative;" lazy>
                <div class="list1" v-if="KnowledgeData.length>0">
                  <el-row :gutter="20" v-for="(item,id) in KnowledgeData" :key="id">
                    <el-col :span="12" class="mb5 tal" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">
                      <span class="f12  mous col " @click="handleEdit(item)" :title="item.name">{{item.name}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12 tal mou">{{item.createUserName}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12  mou">{{item.createTime}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-else class="img">
                  <img src="../../../static/img/home/no_data.png" alt="">
                  <div>暂无数据</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="公司公告" name='3' lazy>
                <div class="list1" v-if="KnowledgeData.length>0">
                  <el-row :gutter="20" v-for="(item,id) in KnowledgeData" :key="id">
                    <el-col :span="12" class="mb5 tal" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">
                      <span class="f12  mous col " @click="handleEdit(item)" :title="item.name">{{item.name}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12 tal mou">{{item.createUserName}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12  mou">{{item.createTime}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-else class="img">
                  <img src="../../../static/img/home/no_data.png" alt="">
                  <div>暂无数据</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="技术标准" name='4' lazy>
                <div class="list1" v-if="KnowledgeData.length>0">
                  <el-row :gutter="20" v-for="(item,id) in KnowledgeData" :key="id">
                    <el-col :span="12" class="mb5 tal" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">
                      <span class="f12  mous col " @click="handleEdit(item)" :title="item.name">{{item.name}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12 tal mou">{{item.createUserName}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5" style="text-align: center">
                      <span class="f12  mou">{{item.createTime}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-else class="img">
                  <img src="../../../static/img/home/no_data.png" alt="">
                  <div>暂无数据</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="相关政策" name='5' lazy>
                <div class="list1" v-if="KnowledgeData.length>0">
                  <el-row :gutter="20" v-for="(item,id) in KnowledgeData" :key="id">
                    <el-col :span="12" class="mb5 tal" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">
                      <span class="f12  mous col " @click="handleEdit(item)" :title="item.name">{{item.name}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5">
                      <span class="f12 tal mou">{{item.createUserName}}</span>
                    </el-col>
                    <el-col :span="6" class="mb5">
                      <span class="f12  mou">{{item.createTime}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-else class="img">
                  <img src="../../../static/img/home/no_data.png" alt="">
                  <div>暂无数据</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <div class="title">
            <span class="headline" @click="examine">我的申请</span>
            <span class="botton" @click="examine">更多</span>
          </div>
          <div class="list" v-if="ExamineData.length>1">
            <el-row :gutter="20" v-for="(item,id) in ExamineData" :key="id">
              <el-col :span="10" class="mb5 tal" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">
                <span class="f12  mous col" @click="handleExamine(item)" :title="item.processName">{{item.processName}}</span>
              </el-col>
              <el-col :span="7" class="mb5">
                <span class="f12 tal mou">{{item.stateName}}</span>
              </el-col>
              <el-col :span="7" class="mb5">
                <span class="f12  mou">{{item.createTime}}</span>
              </el-col>
            </el-row>
          </div>
          <div v-else class="imgBox">
            <img src="../../../static/img/home/no_data.png" alt="">
            <div>暂无数据</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import times from './times'
import approval from '../work/myApprove/approval.vue'
import check from '../work/myApplication/check.vue'
import { getMemoGetDataByUserId } from '@/api/home/home.js'
import { getToExamineStepQueryPageData } from '@/api/work/myApprove.js'
import { getToExamineQueryPageData } from '@/api/work/myApplication.js'
import { getKnowledgePointsHomePage } from '@/api/jcxxgl/knowledge.js'
import { getHomeRotationPictureQueryPageData } from '@/api/integrated/news.js'
import { getHomeHonorWallQueryPageData } from '@/api/integrated/walls.js'

export default {
  components: {
    times
  },
  data() {
    return {
      upload: process.env.BASE_API + process.env.JS_Server + '/Knowledge/file/download?id=',
      time: [],
      activeName: 'first',
      active: '1',
      KnowledgeData: [],
      ExamineData: [],
      ApprovalData: [],
      tabId: 1,
      formData: {
        pageSize: 7,
        pageNow: 1
      },
      fromData: {
        pageSize: 999,
        pageNow: 1,
        exhibition: '2'
      },
      fromDatas: {
        pageSize: 6,
        pageNow: 1,
        exhibition: '2'
      },
      falseData: [],
      imgData: [],
      wallData: [],
      fromVailData: {
        createUser: this.$store.getters.userInfo.id
      },
      memo_list: []
    }
  },
  methods: {
    handleClick(tab, event) {
      this.tabId = Number(tab.name)
      this.formData.knowledgeId = this.tabId
      this.getKnowledgeData()
    },
    // 获取轮播图图片
    getListData() {
      getHomeRotationPictureQueryPageData(this.fromData).then(res => {
        this.imgData = res.result.pageList
      })
    },
    // 获取照片墙图片
    getImgWall() {
      getHomeHonorWallQueryPageData(this.fromDatas).then(res => {
        this.wallData = res.result.pageList
      })
    },
    // 获取知识库信息
    getKnowledgeData() {
      this.formData.knowledgeId = this.tabId
      getKnowledgePointsHomePage(this.formData).then(res => {
        this.KnowledgeData = res.result.pageList
        this.KnowledgeData.forEach(item => {
          item.createTime = item.createTime.slice(0, 11)
        })
      })
    },
    // 获取申请信息
    getExamineData() {
      this.loading = false
      this.formData.applyUserId = this.$store.getters.userInfo.id
      this.formData.pageSize = 9
      getToExamineQueryPageData(this.formData).then(res => {
        res.result.pageList.forEach(xdd => {
          if (xdd.processStartName) {
            xdd.processName = xdd.processStartName + '/' + xdd.processName
          }
          switch (xdd.state) {
            case '1':
              xdd.stateName = '待审核'
              break
            case '2':
              xdd.stateName = '通过'
              break
            case '3':
              xdd.stateName = '退回'
              break
            case '4':
              xdd.stateName = '撤销'
          }
        })
        this.ExamineData = res.result.pageList
      })
    },
    handleExamine(params) {
      this.$layer.iframe({
        content: {
          content: check, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: 1
          } // props
        },
        area: this.$layer_Size.Max,
        title: '申请详情',
        maxmin: true,
        shadeClose: false
      })
    },
    // 获取待审核信息
    getApprovalData() {
      this.formData.state = 1
      getToExamineStepQueryPageData(this.formData).then(res => {
        res.result.pageList.forEach(xdd => {
          if (xdd.processStartName) {
            xdd.processName = xdd.processStartName + '/' + xdd.processName
          }
          switch (xdd.state) {
            case '1':
              xdd.stateName = '待审核'
              break
            case '2':
              xdd.stateName = '通过'
              break
            case '3':
              xdd.stateName = '退回'
              break
          }
        })
        this.ApprovalData = res.result.pageList
      })
    },
    // 荣誉墙
    honorWall() { },
    handleApproval(params) {
      this.$layer.iframe({
        content: {
          content: approval, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: 2,
            home: true
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '审批详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$router.push({ name: 'news', params: params })
    },
    getTimesData() {
      getMemoGetDataByUserId({ createUser: this.$store.getters.userInfo.id }).then(res => {
        this.memo_list = res.result.map(xdd => {
          return xdd.memoTime
        })
        this.time = Array.from(new Set(this.memo_list))
      })
    },
    knowledge() {
      this.$router.push('/public/knowledge/news')
    },
    examine() {
      this.$router.push('/work/myApplication')
    },
    newsRemind() {
      this.$router.push('/work/newsRemind')
    }
  },
  mounted() {
    this.getKnowledgeData()
    this.getExamineData()
    this.getApprovalData()
    this.getTimesData()
    this.getListData()
    this.getImgWall()
  },
  created() { }
}
</script>
<style scoped lang="scss">
.img {
  display: inline-block;
  margin-top: 55px;
  position: relative;
  left: 40%;
}
.list {
  overflow: hidden;
  margin: 15px;
  width: calc(100% - 30px);
  height: 180px;
}
.list1 {
  overflow: hidden;
  margin: 15px;
  width: calc(100% - 30px);
  height: 155px;
}
.col {
  overflow: hidden;
}
.tabs {
  padding: 0 0 0 20px;
  width: calc(100% - 20px);
  height: 30px;
  text-align: left;
  .el-tabs__nav-scroll {
    margin-left: 20px;
  }
}
.line {
  position: relative;
  top: 30px;
  left: -20px;
  width: 110%;
  height: 1px;
  background: #ddd;
}
.el-tabs /deep/.el-tabs__item {
  height: 30px;
  font-size: 14px;
  line-height: 30px;
}
.el-tabs /deep/ .el-tabs__nav-wrap::after {
  background: none;
}
.el-tabs /deep/ .el-tabs__header {
  position: relative;
  margin: 0;
}
.el-tabs /deep/ .el-tabs__content {
  margin: 0 0 0 -20px;
}
.col:hover {
  color: #789af7;
  text-decoration: underline;
}
.content {
  position: relative;
  margin-bottom: 15px;
  height: 500px;
  border-radius: 10px;
  background: #fff;
}
.bgBox {
  display: flex;
  justify-content: center;
  position: relative;
  background: #f2f2f2;
  .fameWall {
    position: absolute;
    padding: 30px;
    margin-top: 20px;
    top: 80px;
    width: 55%;
    .list {
      position: absolute;
      bottom: 0px;
      z-index: 10;
      margin: 0;
      width: 100%;
      height: 28px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      line-height: 30px;
    }
  }
}
.card {
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
  width: 100%;
  height: 255px;
  border-radius: 10px;
  background: #fff;
}
.title {
  position: relative;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ddd;
  .headline {
    position: absolute;
    top: 10px;
    left: 20px;
    cursor: pointer;
  }
  .botton {
    position: absolute;
    top: 10px;
    right: 20px;
    display: block;
    width: 40px;
    height: 20px;
    border-radius: 6px;
    background: #789af7;
    color: #fff;
    font-size: 14px !important;
    cursor: pointer;
  }
}
.swiper {
  position: relative;
  background: #000;
  .list {
    position: absolute;
    bottom: 0px;
    z-index: 10;
    margin: 0;
    width: 100%;
    height: 28px;
    background: rgba(0, 0, 0, 0.5);
    color: rgb(155, 155, 155);
  }
}
.imgBox {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 60px;
  transform: translateX(-50%) translateY(-50%);
}
</style>
