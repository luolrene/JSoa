<!-- 业务招待 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-download" @click="dataExport()">数据导出</el-button>
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 5">批量删除</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import exportList from '../borrowMoeny/export_list.vue'
import { getEntertainQueryPageData, getEntertainDel, getEntertainApply } from '@/api/finance/business.js'
import edit from './edit.vue'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [{ type: 'input', prop: 'name', label: '申请人' }],
      tableData: [],
      tableHeader: [
        { prop: 'name', label: '申请人', width: 100 },
        { prop: 'groupName', label: '部门', width: 100 },
        { prop: 'loanNumber', label: '申请编号', width: 100 },
        { prop: 'counterpartsUser', label: '公司参与人', width: 150 },
        { prop: 'treatTime', label: '招待时间', width: 100 },
        { prop: 'reasons', label: '招待事由', width: 200 },
        { prop: 'stateName', label: '状态', width: 80 },
        { prop: 'createTime', label: '创建时间', width: 100 }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '提交',
            type: 'primary',
            click: 'handleSubmit',
            condition: params => {
              if (params.state === 0) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if ((params.state === 0 || params.state === 3) && params.userId === this.$store.getters.userInfo.id) {
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
              if (Number(this.$store.getters.userInfo.level) >= 5) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getEntertainQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            switch (item.state) {
              case 0:
                item.stateName = '未提交'
                break
              case 1:
                item.stateName = '审核中'
                break
              case 2:
                item.stateName = '通过'
                break
              case 3:
                item.stateName = '退回'
                break
              case 4:
                item.stateName = '撤销'
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
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs[formName].resetFields()
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
    // 提交
    handleSubmit(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将提交申请，是否继续?',
        confirm: function () {
          getEntertainApply(params).then(res => {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getEntertainDel({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    // 导出
    dataExport() {
      let id = { ids: '' }
      this.multipleSelection.forEach(xdd => {
        id.ids += xdd.id + ','
      })
      if (id.ids) {
        id.ids = id.ids.substring(0, id.ids.length - 1)
        this.$layer.iframe({
          content: {
            content: exportList, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: id,
              type: 4
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '导出表头选择',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$share.message('请选择需要下载的数据列表', 'warning')
      }
    },
    // 表格
    handleExcel(params) {
      window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/EntertainById/download?' + 'id=' + params.id)
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
