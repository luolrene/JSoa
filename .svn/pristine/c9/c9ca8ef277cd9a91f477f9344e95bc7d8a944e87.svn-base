<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-edit-outline" @click="handelBulkInventory">批量盘点</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isPage="false" :dataSum='fromValiData.dataSum' :button="button" @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import inventory from './inventory.vue'
import {
  getAssetsDetailsQueryPageData, // 固资分页
  getAssetsConsumableQueryPageData // 易耗分页
} from '@/api/integrated/fixedAssets.js'
export default {
  data() {
    return {
      loading: false,
      multipleSelection: [],
      fromValiData: {
        pageSize: 999,
        pageNow: 1,
        assetsType: '1'
      },
      fromData: [
        {
          type: 'select',
          prop: 'assetsType',
          label: '资产类型',
          data: [{ name: '固定资产', id: '1' }, { name: '易耗物品', id: '2' }]
        },
        {
          type: 'select',
          prop: 'inventory',
          label: '盘点信息',
          data: [{ name: '有', id: '1' }, { name: '无', id: '2' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '资产名称',
          width: 100
        },
        {
          prop: 'typeNameAll',
          label: '资产类别',
          width: 120
        },
        {
          prop: 'amountOfMoney',
          label: '金额',
          width: 100
        }
      ],
      button: {
        width: 100,
        buttonList: [
          { name: '盘点', type: 'primary', click: 'handelInventory' }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      if (this.fromValiData.assetsType === '1') {
        getAssetsDetailsQueryPageData(this.fromValiData)
          .then(res => {
            res.result.pageList.forEach(xdd => {
              xdd.assetsType = '1'
              switch (xdd.inventory) {
                case '1':
                  xdd.inventoryName = '有'
                  break
                case '2':
                  xdd.inventoryName = '无'
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
      } else if (this.fromValiData.assetsType === '2') {
        getAssetsConsumableQueryPageData(this.fromValiData)
          .then(res => {
            res.result.pageList.forEach(xdd => {
              xdd.assetsType = '2'
              switch (xdd.inventory) {
                case '1':
                  xdd.inventoryName = '有'
                  break
                case '2':
                  xdd.inventoryName = '无'
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
      }
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
    // 盘点
    handelInventory(params) {
      this.$layer.iframe({
        content: {
          content: inventory, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '盘点',
        maxmin: true,
        shadeClose: false
      })
    },
    // 批量盘点
    handelBulkInventory() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要盘点的列表数据', 'warning')
        return
      }
      let paramsData = { assetsIds: '', assetsName: '' }
      this.multipleSelection.forEach(xdd => {
        paramsData.assetsType = xdd.assetsType
        paramsData.assetsIds += xdd.id + ','
        paramsData.assetsName += xdd.name + ','
      })
      paramsData.assetsIds = paramsData.assetsIds.substring(
        0,
        paramsData.assetsIds.length - 1
      )
      paramsData.assetsName = paramsData.assetsName.substring(
        0,
        paramsData.assetsName.length - 1
      )
      this.handelInventory(paramsData)
    }
  },
  mounted() {
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
