<template>
  <div class="operate-container">
    <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="doAdd()" v-if="params.state==='0'||params.state==='3' ">添加</el-button>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :button="button" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" style='margin-top:15px;'>
    </tableItem>
  </div>
</template>

<script>
import {
  getReimbursementCostQueryPageData,
  getReimbursementCostDel
} from '@/api/finance/expense.js'
import edit from '../cost_edit.vue'
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
      button: {
        width: 200,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (this.params.state === 0) {
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
              if (this.params.state === 0) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      tableData: [],
      tableHeader: [
        { label: '费用类型', prop: 'costTypeName', width: 120 },
        { label: '报销金额', prop: 'costMoney', width: 120 },
        { label: '报销原因', prop: 'costReason', width: 120 },
        { label: '关联招待', prop: 'receptionNumber', width: 120 },
        { label: '关联采购', prop: 'purchaseNumber', width: 120 },
        { label: '备注', prop: 'remarks', width: 200 }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getReimbursementCostQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.costType) {
            case 1:
              xdd.costTypeName = '日常报销'
              break
            case 2:
              xdd.costTypeName = '差旅报销'
              break
            case 3:
              xdd.costTypeName = '招待报销'
              break
            case 4:
              xdd.costTypeName = '采购报销'
              break
            case 5:
              xdd.costTypeName = '招投标报销'
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
    },
    doAdd() {
      if (this.num === 4) {
        this.$message.warning('单笔报销最多添加4条明细,请重新创建报销信息', 5)
      } else {
        this.$layer.iframe({
          content: {
            content: edit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              dataList: this.params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加',
          maxmin: true,
          shadeClose: false
        })
      }
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
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getReimbursementCostDel({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
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
      this.fromValiData.fatherId = this.params.id
    }

    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
