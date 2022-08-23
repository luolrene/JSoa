<!-- 我的消息 -->
<template>
  <div class="pc-container">
    <el-row :gutter="20">
      <el-col :span="2">
        <div style="height:100%;overflow-y: auto;">
          <div>
            <div style="margin: 20px 0;">
              <el-badge :value="checkSum" class="item" v-if="checkSum">
                <el-button type="primary" round class="btn" @click="handelCheck">待审</el-button>
              </el-badge>
              <el-button v-else type="primary" round class="btn" @click="handelCheck">待审</el-button>
            </div>
            <div style="margin: 20px 0;">
              <el-badge :value="passSum" class="item" v-if="passSum">
                <el-button type="primary" round class="btn" @click="handelPass">待办</el-button>
              </el-badge>
              <el-button v-else type="primary" round class="btn" @click="handelPass">待办</el-button>
            </div>
            <div style="margin: 20px 0;">
              <el-badge :value="readSum" class="item" v-if="readSum">
                <el-button type="primary" round class="btn" @click="handelRead">待阅</el-button>
              </el-badge>
              <el-button v-else type="primary" round class="btn" @click="handelRead">待阅</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="22" style="margin-top:20px;">
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader1" :button="button1" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" v-if='lev===2' />
        <tableItem :obj="this" :tableData="tableData2" :tableHeader="tableHeader2" :button="button2" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum2' @handleSizeChange="handleSizeChange" v-if='lev===3' />
        <tableItem :obj="this" :tableData="tableData3" :tableHeader="tableHeader3" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum3' @handleSizeChange="handleSizeChange" v-if='lev===4' />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import check from '../myApplication/check.vue'
import approval from '../myApprove/approval.vue'
import overTo from '../myApprove/overTo.vue'
import edit from '../../public/task/edit.vue' // 待办完成
import details from '../../public/task/details.vue' // 待办详情
import notice from '../../home/detail.vue' // 待阅
import { getToExamineStepQueryPageData } from '@/api/work/myApprove.js'
import { getNoticeQueryPageData } from '@/api/login.js' // 待阅
import { getTaskQueryPageData, getTaskModify } from '@/api/public/task.js'
export default {
  data() {
    return {
      loading: false,
      checkSum: 0,
      passSum: 0,
      readSum: 0,
      lev: 2,
      userId: this.$store.getters.userInfo.id,
      btnData: [
        { name: '待审', id: 2 },
        { name: '待办', id: 3 },
        { name: '待阅', id: 4 }
      ],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableHeader1: [
        { prop: 'processName', label: '流程类型', width: 140, type: 'view' },
        { prop: 'applyUserName', label: '申请人', width: 100 },
        { prop: 'remarks', label: '申请备注', width: 200 },
        { prop: 'createTime', label: '申请时间', width: 200 }
      ],
      tableHeader2: [
        { prop: 'title', label: '任务标题', width: 140, type: 'view' },
        { prop: 'introduce', label: '任务描述', width: 200 },
        { prop: 'createUserName', label: '派发人', width: 100 },
        { prop: 'responsibilityUserName', label: '负责人', width: 100 },
        { prop: 'participateInUserName', label: '参与人', width: 150 },
        {
          prop: 'criticals',
          label: '紧要程度',
          width: 80,
          condition: params => {
            if (params.critical === '1') {
              return '#ff9900'
            } else if (params.critical === '2') {
              return '#FF3232'
            } else if (params.critical === '3') {
              return '#FF0000'
            }
          }
        },
        { label: '任务类型', prop: 'taskTypeName', width: 100 },
        { prop: 'judgeAcceptanceName', label: '是否需要验收', width: 100 },
        { prop: 'stateName', label: '任务状态', width: 100 },
        { prop: 'deadlineTime', label: '截止时间', width: 80 },
        { prop: 'createTime', label: '创建时间', width: 120 }
      ],
      tableHeader3: [
        { prop: 'noticeNews', label: '消息内容', type: 'view' },
        { prop: 'createTime', label: '通知时间' }
      ],
      button1: {
        width: 200,
        buttonList: [
          {
            name: '审批',
            type: 'primary',
            click: 'handleApproval'
          },
          {
            name: '新增',
            type: 'primary',
            click: 'handlenewlyAdd'

          },
          {
            name: '移交',
            type: 'primary',
            click: 'handleOverTo'
          }
        ]
      },
      button2: {
        width: 240,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit'
          },
          {
            name: '完成',
            type: 'primary',
            click: 'handleFulfill'
          }
        ]
      }
    }
  },
  methods: {
    // 待审
    handelCheck() {
      this.lev = 2
      if (this.fromValiData.pageNow !== 1) {
        this.fromValiData.pageNow = 1
      }
      this.fromValiData.state = '1'
      this.loading = false
      getToExamineStepQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.processEndName) {
              xdd.processName = xdd.processName + '/' + xdd.processEndName
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
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.checkSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleApproval(params) {
      this.$layer.iframe({
        content: {
          content: approval, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: '',
            type: 2,
            new: 1
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '审批',
        maxmin: true,
        shadeClose: false
      })
    },
    handlenewlyAdd(params) {
      this.$layer.iframe({
        content: {
          content: overTo, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: '',
            type: '2',
            new: 1
          } // props
        },
        area: this.$layer_Size.Max,
        title: '审批新增',
        maxmin: true,
        shadeClose: false
      })
    },
    handleOverTo(params) {
      this.$layer.iframe({
        content: {
          content: overTo, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: '',
            type: '1',
            new: 1
          } // props
        },
        area: this.$layer_Size.Max,
        title: '审批移交',
        maxmin: true,
        shadeClose: false
      })
    },
    // 待办
    handelPass() {
      this.lev = 3
      if (this.fromValiData.pageNow !== 1) {
        this.fromValiData.pageNow = 1
      }
      this.loading = false
      this.fromValiData.ascription = '2'
      this.fromValiData.state = '1,4'
      getTaskQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.taskType) {
              case '1':
                xdd.taskTypeName = '周期任务'
                break
              case '2':
                xdd.taskTypeName = '月度任务'
                break
              case '3':
                xdd.taskTypeName = '普通任务'
            }
            switch (xdd.judgeAcceptance) {
              case '1':
                xdd.judgeAcceptanceName = '是'
                break
              case '2':
                xdd.judgeAcceptanceName = '否'
            }
            switch (xdd.critical) {
              case '1':
                xdd.criticals = '★'
                break
              case '2':
                xdd.criticals = '★★'
                break
              case '3':
                xdd.criticals = '★★★'
            }
          })
          this.tableData2 = res.result.pageList
          this.fromValiData.dataSum2 = res.result.dataSum
          this.passSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    // 完成
    handleFulfill(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将完成本次任务， 是否继续?',
        confirm: function () {
          params.state = '2'
          getTaskModify(params).then(res => {
            that.handelPass()
          })
        }
      })
    },
    // 编辑
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            new: 2
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    // 待阅
    handelRead() {
      this.lev = 4
      if (this.fromValiData.pageNow !== 1) {
        this.fromValiData.pageNow = 1
      }
      this.loading = true
      this.fromValiData.type = 1
      this.fromValiData.createUser = this.$store.getters.userInfo.id
      getNoticeQueryPageData(this.fromValiData)
        .then(res => {
          this.tableData3 = res.result.pageList
          this.readSum = res.result.dataSum
          this.fromValiData.dataSum3 = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      if (this.lev === 2) {
        this.handelCheck()
      } else if (this.lev === 3) {
        this.handelPass()
      } else if (this.lev === 4) {
        this.handelRead()
      }
    },
    handleDetails(params) {
      if (this.lev === 2) {
        this.$layer.iframe({
          content: {
            content: check, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params,
              type: 2
            } // props
          },
          area: this.$layer_Size.Max,
          title: '申请详情',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.lev === 3) {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '资产信息',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.lev === 4) {
        this.$layer.iframe({
          content: {
            content: notice, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params,
              type: 1
            } // props
          },
          area: this.$layer_Size.No,
          title: '内容详情',
          maxmin: true,
          shadeClose: false
        })
      }
    }
  },
  mounted() {
    this.handelPass()
    this.handelRead()
    this.handelCheck()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.btn {
  background: none;
  color: #0195db;
  width: 80px;
  height: 35px;
}
.btn:hover {
  background: #0195db;
  color: #fff;
}
</style>
