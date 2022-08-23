<template>
  <div class="operate-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="未读消息" name="first">
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :isPage="false"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second" lazy>
        <tableItem :obj="this" :tableData="tableData2" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :isPage="false"></tableItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import detail from './detail.vue'
import { getNoticeQueryPageData } from '@/api/login.js'
export default {
  inject: ['reload'],
  data() {
    return {
      loading: false,
      activeName: 'first',
      types: {
        first: true,
        second: false
      },
      fromValiData: {
        pageSize: 99,
        pageNow: 1,
        createUser: this.$store.getters.userInfo.id
      },
      tableData: [],
      tableData2: [],
      tableHeader: [
        {
          prop: 'noticeNews',
          label: '消息内容',
          width: 120,
          type: 'view'
        },
        {
          prop: 'createTime',
          label: '通知时间',
          width: 90
        }
      ]
    }
  },
  methods: {
    getListData(a) {
      this.loading = true
      this.fromValiData.type = a
      getNoticeQueryPageData(this.fromValiData)
        .then(res => {
          if (this.fromValiData.type === 1) {
            this.loading = false
            this.tableData = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
          } else {
            this.loading = false
            this.tableData2 = res.result.pageList
            this.fromValiData.dataSum2 = res.result.dataSum
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            secret: true
          } // props
        },
        area: this.$layer_Size.No,
        title: '内容详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleClick(tab) {
      if (tab.name === 'first') {
        this.getListData(1)
      } else {
        this.getListData(2)
      }
    }
  },
  mounted() {
    this.getListData(1)
  },
  created() { },
  destroyed() {
    this.reload()
  }
}
</script>

<style scoped lang="scss">
</style>
