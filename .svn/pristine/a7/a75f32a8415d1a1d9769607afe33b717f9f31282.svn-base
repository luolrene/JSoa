<!-- 用品申领
<template>
  <div class="pc-container">
    <div class="btn">
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">申请用品</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="handleSearch()">领用历史</el-button>
    </div>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      times: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'select',
          prop: 'type',
          label: '请求类型',
          data: []
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '申请时间',
          width: 140,
          type: 'view'
        },
        {
          prop: 'exp',
          label: '申请物品',
          width: 300,
          type: 'view2'
        },
        {
          prop: 'exp',
          label: '备注',
          width: 100
        },
        {
          prop: 'exp',
          label: '状态',
          width: 100
        }
      ],
      button: {
        width: 250,
        buttonList: [
          // { name: '编辑', type: 'primary', click: 'handleEdit' },
          // { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      // getPositionRankQueryPageData(this.fromValiData)
      //   .then(res => {
      //     this.tableData = res.result.pageList
      //     this.fromValiData.dataSum = res.result.dataSum
      //     this.loading = false
      //   })
      //   .catch(err => {
      //     this.$message.error(err.message)
      //     this.loading = false
      //   })
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

    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getPositionRankDel({ ids: row.id }).then(res => {
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
.btn {
  margin-bottom: 10px;
  float: left;
}
</style> -->
