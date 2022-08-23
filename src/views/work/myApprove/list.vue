<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">
        <el-form-item label="时间范围:">
          <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import check from '../myApplication/check.vue'
import approval from './approval.vue'
import overTo from './overTo.vue'
import { getToExamineStepQueryPageData } from '../../../api/work/myApprove.js'
export default {
  data() {
    return {
      loading: false,
      content: '',
      times: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        state: 1
      },
      fromData: [
        { type: 'input', prop: 'applyUserName', label: '申请人', data: [] },
        {
          type: 'select',
          prop: 'state',
          label: '审核状态',
          data: [
            { id: 1, name: '待审核' },
            { id: 2, name: '通过' },
            { id: 3, name: '退回' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'processName', label: '流程类型', width: 140, type: 'view' },
        { prop: 'applyUserName', label: '申请人', width: 100 },
        { prop: 'createTime', label: '申请时间', width: 100 },
        { prop: 'stateName', label: '状态', width: 100 }
      ],
      button: {
        width: 100,
        buttonList: [
          {
            name: '查看',
            type: 'primary',
            click: 'handleCheck',
            condition: params => {
              if (params.state === '2') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '审批',
            type: 'primary',
            click: 'handleApproval',
            condition: params => {
              if (params.state === '1') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '新增',
            type: 'primary',
            click: 'handlenewlyAdd',
            condition: params => {
              if (params.state === '1') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '移交',
            type: 'primary',
            click: 'handleOverTo',
            condition: params => {
              if (params.state === '1') {
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
      getToExamineStepQueryPageData(this.fromValiData)
        .then(res => {
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
    handleApproval(params) {
      this.$layer.iframe({
        content: {
          content: approval, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: 2
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '审批',
        maxmin: true,
        shadeClose: false
      })
    },
    handleCheck(params) {
      this.$layer.iframe({
        content: {
          content: check, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: 2
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '申请详情',
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
            type: '1'
          } // props
        },
        area: this.$layer_Size.Max,
        title: '审批移交',
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
            type: '2'
          } // props
        },
        area: this.$layer_Size.Max,
        title: '审批新增',
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
    },
    handleDetails(params) {
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
