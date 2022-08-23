<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">
        <el-form-item label="创建时间:">
          <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">新建任务</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>

  </div>
</template>

<script>
import edit from './edit.vue'
import details from './details.vue'
import fulfill from './handle/fulfill.vue'
import { getTaskQueryPageData, getTaskDel, getTaskModify } from '@/api/public/task.js'
export default {
  data() {
    return {
      loading: false,
      times: [],
      userId: this.$store.getters.userInfo.id,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        ascription: '2'
      },
      fromData: [
        {
          type: 'select',
          prop: 'ascription',
          label: '归属',
          data: [
            { name: '我派发的', id: '1' },
            { name: '我负责的', id: '2' },
            { name: '抄送给我的', id: '3' }
          ]
        },
        {
          type: 'select',
          prop: 'state',
          label: '任务状态',
          data: [
            { name: '进行中', id: '1' },
            { name: '已完成', id: '2' },
            { name: '已终止', id: '3' },
            { name: '延期', id: '4' },
            { name: '负责人审核中', id: '5' },
            { name: '完成审核中', id: '6' },
            { name: '延期审核中', id: '7' },
            { name: '已逾期', id: '8' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
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
      button: {
        width: 200,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if ((['1', '4', '8'].includes(params.state)) && params.createUser === this.userId) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '完成',
            type: 'primary',
            click: 'handleFulfill',
            condition: params => {
              if ((['1', '4', '8'].includes(params.state)) && params.responsibilityUserId.indexOf(this.userId) !== -1) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getTaskQueryPageData(this.fromValiData).then(res => {
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
          switch (xdd.state) {
            case '1':
              xdd.stateName = '进行中'
              break
            case '2':
              xdd.stateName = '已完成'
              break
            case '3':
              xdd.stateName = '已终止'
              break
            case '4':
              xdd.stateName = '延期'
              break
            case '5':
              xdd.stateName = '负责人审核中'
              break
            case '6':
              xdd.stateName = '完成审核中'
              break
            case '7':
              xdd.stateName = '延期审核中'
              break
            case '8':
              xdd.stateName = '已逾期'
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    // 完成
    handleFulfill(params) {
      if (params.judgeAcceptance === '1') {
        this.$layer.iframe({
          content: {
            content: fulfill, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '完成',
          maxmin: true,
          shadeClose: false
        })
      } else {
        let that = this
        this.$share.confirm({
          message: '此操作将完成本次任务， 是否继续?',
          confirm: function () {
            params.state = '2'
            getTaskModify(params).then(res => {
              that.getListData()
            })
          }
        })
      }
    },
    doSearch() {
      this.fromValiData.stateTime = this.times[0]
      this.fromValiData.endTime = this.times[1]
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      delete this.fromValiData.stateTime
      delete this.fromValiData.endTime
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getTaskDel({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleDetails(params) {
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
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
