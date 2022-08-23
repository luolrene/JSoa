<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import edit from './cardNum_edit.vue'
import { getUserBankQueryPageData, getUserBankDel } from '@/api/home/home.js'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        userId: this.$store.getters.userInfo.id,
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'select',
          prop: 'bankType',
          label: '持卡人类型',
          data: [{ id: '1', name: '个人' }, { id: '2', name: '其他' }]
        }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'bankUserName', label: '开户人', width: 100 },
        { prop: 'bankName', label: '开户银行', width: 100 },
        { prop: 'bankSubBranch', label: '开户支行', width: 100 },
        { prop: 'bankNumber', label: '银行账号', width: 150 },
        { prop: 'bankTypeName', label: '持卡人类型', width: 80 },
        { prop: 'remarks', label: '备注', width: 150 }
      ],
      button: {
        width: 100,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit'
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete'
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getUserBankQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.bankType === '1'
              ? (xdd.bankTypeName = '个人')
              : (xdd.bankTypeName = '其他')
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
        title: '新建',
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
        message: '此操作将删除本条信息，是否继续?',
        confirm: function () {
          getUserBankDel({ ids: row.id }).then(res => {
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
