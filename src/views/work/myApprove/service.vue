<template>
  <div class="operate-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="title ">资产基本信息</div>
        <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" submitName='确定' scrollbarHeight="500px">
        </fromItem>
      </el-col>
      <el-col :span="16">
        <div class="title ">维修记录</div>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :dataSum='fromTable.dataSum' @handleSizeChange="handleSizeChange">
        </tableItem>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getAssetsCallQueryPageData } from '@/api/integrated/fixedAssets.js'
import { getAssetsDetailsGetDataDetailsTwo, getAssetsDetailsGetDataDetailsOne } from '@/api/work/myApprove.js'
export default {
  props: {
    way: Number,
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      loading: false,
      fromData: {},
      tableFromData: {

      },
      tableData: [],
      fromValiData: {

      },
      fromTable: {
        pageSize: 99,
        pageNow: 1,
        operationType: '维修'
      },
      rules: {},
      tableHeader: [
        {
          prop: 'operatorUser',
          label: '操作人',
          width: 80
        },
        {
          prop: 'operationType',
          label: '操作分类',
          width: 80
        },
        {
          prop: 'operationContent',
          label: '操作内容',
          width: 200
        },
        {
          prop: 'operationTime',
          label: '操作时间',
          width: 120
        }
      ],
      fromItemList: [
        {
          label: '资产类别',
          prop: 'typeName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '资产名称',
          prop: 'name',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '标准型号',
          prop: 'standardModel',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '资产编号',
          prop: 'assetNumber',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '状态',
          prop: 'state',
          value: '',
          type: 'select',
          data: [
            { name: '闲置', id: '1' },
            { name: '使用', id: '2' },
            { name: '维修', id: '3' },
            { name: '报废', id: '4' }
          ],
          disabled: true
        },
        {
          label: '来源',
          prop: 'source',
          value: '',
          type: 'select',
          data: [
            { name: '购入', id: '1' },
            { name: '捐赠', id: '2' },
            { name: '租赁', id: '3' },
            { name: '其他', id: '4' }
          ],
          disabled: true
        },
        {
          label: '供应商',
          prop: 'supplierName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '入库日期',
          prop: 'warehousingTime',
          value: '',
          type: 'date',
          disabled: true
        },
        {
          label: '物品金额',
          prop: 'amountOfMoney',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '使用部门',
          prop: 'groupNameAll',
          value: '',
          type: 'input',
          disabled: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$layer.close(this.layerid)
    },
    getListData() {
      if (this.way === 1) {
        getAssetsDetailsGetDataDetailsTwo(this.fromData).then(res => {
          this.fromValiData = res.result
          this.fromTable.detailsId = this.fromValiData.id
        }).then(() => {
          getAssetsCallQueryPageData(this.fromTable).then(res => {
            res.result.pageList.forEach(xdd => {
              xdd.operationContent =
                xdd.operationType +
                '操作' +
                ':' +
                ' ' +
                '操作人:' +
                xdd.operatorUser
            })
            this.tableData = res.result.pageList
            this.fromTable.dataSum = res.result.dataSum
            this.loading = false
          })
        })
      } else {
        getAssetsDetailsGetDataDetailsOne(this.fromData).then(res => {
          this.fromValiData = res.result
        }).then(() => {
          getAssetsCallQueryPageData(this.fromTable).then(res => {
            res.result.pageList.forEach(xdd => {
              xdd.operationContent =
                xdd.operationType +
                '操作' +
                ':' +
                ' ' +
                '操作人:' +
                xdd.operatorUser
            })
            this.tableData = res.result.pageList
            this.fromTable.dataSum = res.result.dataSum
            this.loading = false
          })
        })
      }
    },

    handleSizeChange(val, pageSize) {
      this.fromTable.pageNow = val
      if (pageSize) {
        this.fromTable.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    this.fromData.id = this.params.applyId
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.title {
  margin: 10px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
</style>
