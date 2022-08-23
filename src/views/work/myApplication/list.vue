<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">
        <el-form-item label="申请类型:">
          <el-cascader :options="options" v-model="processId" @change="getCheckedNodes" :props="{ multiple: true, checkStrictly: true }" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="时间范围:">
          <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdds()">发起申请</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import { getOaProcessQueryPageData, getOaProcessGetChildrenTwo } from '@/api/integrated/flow.js'
import { getToExamineQueryPageData, getToExamineModify, getToExamineDel } from '@/api/work/myApplication.js'
import check from './check.vue'
import edit from './edit.vue'
import edits from './edits.vue'

export default {
  data() {
    return {
      loading: false,
      options: [],
      times: [],
      processId: '',
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        applyUserId: this.$store.getters.userInfo.id
      },
      fromData: [
        // {
        //   type: 'select',
        //   prop: 'processId',
        //   label: '申请类型',
        //   data: []
        // },
        {
          type: 'select',
          prop: 'state',
          label: '审核状态',
          data: [
            { id: '1', name: '待审核' },
            { id: '2', name: '通过' },
            { id: '3', name: '退回' },
            { id: '4', name: '撤销' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'processName', label: '申请类型', type: 'view', width: 100 },
        { prop: 'stateName', label: '审核状态', width: 100 },
        { prop: 'createTime', label: '申请时间', width: 100 }
      ],
      button: {
        width: 100,
        buttonList: [
          {
            name: '查询',
            type: 'primary',
            click: 'handleInquire',
            condition: params => {
              if (params.state === '1' || params.state === '3') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '撤销',
            type: 'danger',
            click: 'handleRepeal',
            condition: params => {
              if (params.state === '1') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (Number(this.$store.getters.userInfo.lev) === 10) {
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
    getCheckedNodes(node) {
      let ids = ''
      node.forEach(xdd => {
        if (xdd.length > 1) {
          xdd = xdd.pop()
          ids += xdd + ','
        } else {
          ids += xdd + ','
        }
      })
      this.fromValiData.processId = ids.substring(0, ids.lastIndexOf(','))
      this.getListData()
    },
    getListData() {
      this.loading = false
      this.fromValiData.applyUserId = this.$store.getters.userInfo.id
      getToExamineQueryPageData(this.fromValiData)
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
                break
              case '4':
                xdd.stateName = '撤销'
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
      delete this.fromValiData.processId
      this.processId = ''
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
        title: '发起申请',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdds() {
      this.$layer.iframe({
        content: {
          content: edits, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Self_Max,
        title: '发起申请',
        maxmin: true,
        shadeClose: false
      })
    },
    // 撤销
    handleRepeal(params) {
      let that = this
      params.state = '4'
      this.$share.confirm({
        message: '此操作将撤销本次申请流程，是否继续?',
        confirm: function () {
          getToExamineModify(params).then(res => {
            that.$message({
              type: 'success',
              message: '撤销成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleInquire(params) {
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
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        message: '此操作将删除本次申请流程，是否继续?',
        confirm: function () {
          getToExamineDel({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getFlowData() {
      let obj = {}
      obj.pageSize = 999
      obj.pageNow = 1
      obj.state = '1'
      obj.fatherId = 0
      getOaProcessQueryPageData(obj).then(res => {
        this.fromData.forEach(item => {
          if (item.prop === 'processId') {
            item.data = res.result.pageList.map(item => {
              return {
                id: item.id,
                name: item.name
              }
            })
          }
        })
      })
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
    },
    // 转换对象中的键名
    handleData(data) {
      let newData = data.map(item => {
        let option = {
          value: item.id,
          label: item.name
        }
        if (item.children && item.children !== []) {
          option.children = this.handleData(item.children)
        }
        return option
      })
      return newData
    },
    getTypeData() {
      getOaProcessGetChildrenTwo({ processType: '1', id: 0 }).then(res => {
        let Data = this.handleData(res.result)
        this.options = Data
      })
    }
  },
  mounted() {
    this.getFlowData()
    this.getListData()
    this.getTypeData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.w {
  float: right;
}
</style>
