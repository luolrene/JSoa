<!-- 职务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :isSelection="false" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
// import edit from './edit.vue'
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getGroupQueryPageData } from '@/api/jcxxgl/group.js'

export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'name', label: '姓名' },
        {
          type: 'select',
          prop: 'company',
          label: '单位',
          data: [
            { id: '1', name: '九升检测' },
            { id: '2', name: '集团公司' },
            { id: '3', name: '两山生态' },
            { id: '4', name: '吉东科技' },
            { id: '5', name: '碧泉科技' }
          ]
        },
        { type: 'select', prop: 'groupId', label: '部门名称', data: [] }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'name', label: '姓名', width: 70 },
        { prop: 'companyName', label: '单位', width: 70 },
        { prop: 'groupName', label: '部门', width: 70 },
        { prop: 'administrativeRankName', label: '行政职级', width: 50 },
        { prop: 'roleName', label: '角色', width: 140 },
        { prop: 'mobile', label: '联系电话', width: 80 },
        { prop: 'mail', label: '电子邮箱', width: 80 }
      ],
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getUserQueryPageData(this.fromValiData)
        .then(res => {
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
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    // 获取部门信息
    getGroup() {
      getGroupQueryPageData({ pageSize: 999, pageNow: 1, father: '0' }).then(
        res => {
          this.fromData.forEach(item => {
            if (item.prop === 'groupId') {
              item.data = res.result.pageList
            }
          })
        }
      )
    }
  },
  mounted() {
    this.getListData()
    this.getGroup()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
