<template>
  <div class="operate-container">
    <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="doAdd()">添加</el-button>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :button="button" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" style='margin-top:15px;'>
    </tableItem>
  </div>
</template>

<script>
import {
  getReimbursementTravelQueryPageData,
  getReimbursementTravelDel
} from '@/api/finance/expense.js'
import edit from '../travel_edit.vue'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      loading: false,
      sum: null,
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
      treeData: [],
      tableHeader: [
        { prop: 'travelStartTime', label: '出差开始时间', width: 120 },
        { prop: 'travelEndTime', label: '出差结束时间', width: 120 },
        { prop: 'travelPlace', label: '出发地点', width: 120 },
        { prop: 'travelDestination', label: '目的地', width: 120 },
        { label: '油费', prop: 'travelOilCost', width: 120 },
        { label: '过路费', prop: 'travelRoadToll', width: 120 },
        { label: '停车费', prop: 'travelParkingRate', width: 120 },
        { label: '交通费', prop: 'travelShortDistance', width: 120 },
        { label: '住宿天数', prop: 'travelHotelDays', width: 120 },
        { label: '住宿金额', prop: 'travelHotelMoney', width: 120 },
        { label: '其他支出', prop: 'travelItemOfExpenditure', width: 120 },
        { label: '餐费', prop: 'travelMeals', width: 120 },
        { label: '合计', prop: 'travelSum', width: 120 }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getReimbursementTravelQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          let sum =
            xdd.travelMeals +
            xdd.travelItemOfExpenditure +
            xdd.travelHotelMoney +
            xdd.travelShortDistance +
            xdd.travelLongDistance +
            xdd.travelParkingRate +
            xdd.travelRoadToll +
            xdd.travelOilCost
          xdd.travelSum = Number(sum).toFixed(2)
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.num = res.result.dataSum
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
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getReimbursementTravelDel({ ids: row.id }).then(res => {
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
