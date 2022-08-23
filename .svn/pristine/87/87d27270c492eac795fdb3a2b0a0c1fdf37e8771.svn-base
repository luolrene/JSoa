<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import { getAssetsDetailsQueryPageData } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'input',
          prop: 'name',
          label: '资产名称'
        }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'name', label: '资产名称', width: 140 },
        { prop: 'assetNumber', label: '资产编号', width: 100 },
        { prop: 'typeNameAll', label: '资产类别', width: 120 },
        { prop: 'employ', label: '部门-所用人', width: 120 },
        {
          prop: 'stateName',
          label: '资产状态',
          width: 60,
          type: 'view2',
          condition: params => {
            if (params.stateName === '报废') {
              return '#F56C6C'
            } else {
              return '#0195db'
            }
          }
        },
        { prop: 'maintenanceName', label: '维保信息', width: 60 }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getAssetsDetailsQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.state) {
              case '1':
                xdd.stateName = '闲置'
                break
              case '2':
                xdd.stateName = '使用'
                break
              case '3':
                xdd.stateName = '维保'
                break
              case '4':
                xdd.stateName = '报废'
            }
            switch (xdd.source) {
              case '1':
                xdd.sourceName = '购入'
                break
              case '2':
                xdd.sourceName = '捐赠'
                break
              case '3':
                xdd.sourceName = '租赁'
                break
              case '4':
                xdd.sourceName = '其他'
            }
            if (xdd.maintenance) {
              xdd.maintenanceName = '有'
            } else {
              xdd.maintenanceName = '无'
            }
            if (xdd.userId || xdd.groupNameAll) {
              xdd.employ = xdd.groupNameAll + '-' + xdd.userName
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
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.supplierId = this.params.supplierId
    }
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
