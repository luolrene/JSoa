<!-- 流程管理 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader"  :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import { getAssetsApplyQuery } from '@/api/integrated/fixedAssets.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      multipleSelection: [],
      fromValiData: {},
      fromData: [],
      tableData: [],
      tableHeader: [
        {
          prop: 'dicTypeName',
          label: '流程名称',
          width: 100,
          type: 'view'
        },
        {
          prop: 'dicName',
          label: '描述',
          width: 100
        }
      ],
      button: {
        width: 250,
        buttonList: [{ name: '修改', type: 'primary', click: 'handleEdit' }]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getAssetsApplyQuery({})
        .then(res => {
          this.tableData = res.result
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
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
        title: '修改',
        maxmin: true,
        shadeClose: false
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
  created() {}
}
</script>

<style scoped lang="scss">
.el-tabs /deep/ .el-tabs__item {
  font-size: 16px;
}
</style>
