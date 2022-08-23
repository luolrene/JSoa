<template>
  <div class="operate-container">
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import { getTaskLogQueryPageData } from '@/api/public/task.js'
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
      tableData: [],
      tableHeader: [
        {
          prop: 'content',
          label: '操作内容',
          width: 100
        },
        {
          prop: 'createUserName',
          label: '操作人',
          width: 180
        },

        {
          prop: 'createTime',
          label: '操作时间',
          width: 100
        }
      ],
      button: {
        buttonList: []
      }
    }
  },

  methods: {
    getListData() {
      getTaskLogQueryPageData(this.fromValiData).then(res => {
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
    this.fromValiData.fatherId = this.params.id
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
