<template>
  <div class="operate-container">
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" style='margin-top:15px;'>
    </tableItem>
  </div>
</template>

<script>
import { getFinancePayBackQueryPageData } from '@/api/finance/borrow.js'
export default {
  props: {
    layerid: '',
    type: Number,
    params: Object
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableHeader: [
        { label: '还款金额', prop: 'payBackAmount', width: 100 },
        { label: '还款时间', prop: 'payBackTime', width: 100 },
        { label: '还款方式', prop: 'operationModeName', width: 100 },
        { label: '状态', prop: 'stateName', width: 80 },
        { label: '操作人', prop: 'createUserName', width: 100 },
        { label: '创建时间', prop: 'createTime', width: 100 }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getFinancePayBackQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(item => {
          switch (item.operationMode) {
            case 1:
              item.operationModeName = '个人申请'
              break
            case 2:
              item.operationModeName = '财务销账'
              break
            case 3:
              item.operationModeName = '报销'
          }
          switch (item.state) {
            case 1:
              item.stateName = '审核中'
              break
            case 2:
              item.stateName = '通过'
              break
            case 3:
              item.stateName = '退回'
          }
          if (item.operationMode === 1) {
            if (item.payBackType === 1) {
              item.operationModeName += '(还款)'
            } else {
              item.operationModeName += '(工资代扣)'
            }
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
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
    if (this.params) {
      this.fromValiData.fatherId = this.params.id
    }
    this.fromValiData.paymentType = this.type
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
