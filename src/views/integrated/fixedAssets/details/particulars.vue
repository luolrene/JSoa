<template>
    <div class="operate-container">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
            <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
        </tableItem>
    </div>
</template>

<script>
import { getAssetsCallQueryPageData } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    layerid: '',
    params: Object
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
          type: 'select',
          prop: 'operationType',
          label: '操作分类',
          data: [
            { name: '闲置', id: '闲置' },
            { name: '使用', id: '使用' },
            { name: '维修', id: '维修' },
            { name: '报废', id: '报废' },
            { name: '调用', id: '调用' }
          ]
        }
      ],
      tableData: [],
      treeData: [],
      tableHeader: [
        {
          prop: 'operatorUser',
          label: '操作人',
          width: 100
        },
        {
          prop: 'operationType',
          label: '操作分类',
          width: 100
        },
        {
          prop: 'operationContent',
          label: '操作内容',
          width: 250
        },
        {
          prop: 'operationTime',
          label: '操作时间',
          width: 100
        }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getAssetsCallQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          if (
            xdd.operationType === '闲置' ||
            xdd.operationType === '使用' ||
            xdd.operationType === '报废' ||
            xdd.operationType === '维修'
          ) {
            xdd.operationContent =
              xdd.operationType +
              '操作' +
              ':' +
              ' ' +
              '操作人:' +
              xdd.operatorUser
          } else if (xdd.operationType === '调用') {
            xdd.operationContent =
              xdd.operationType +
              '操作' +
              ':' +
              '从' +
              xdd.callOutGroupName +
              '调入到' +
              xdd.transferInGroupName +
              ' ' +
              '操作人:' +
              xdd.operatorUser
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
    },

    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.fromValiData.pageNow = 1
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
      this.fromValiData.detailsId = this.params.id
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
