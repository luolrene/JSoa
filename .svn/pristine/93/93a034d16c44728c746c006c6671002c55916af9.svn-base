<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" submitName='确定' :disabled="true">
    </fromItem>
  </div>
</template>

<script>
import {
  getAssetsDetailsGetDataDetailsTwo,
  getAssetsDetailsGetDataDetailsOne
} from '@/api/work/myApprove.js'
export default {
  props: {
    way: Number,
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromData: {},
      fromValiData: {},
      rules: {},
      fromItemList: [
        {
          label: '资产类别',
          prop: 'typeName',
          value: '',
          type: 'input'
        },
        {
          label: '资产名称',
          prop: 'name',
          value: '',
          type: 'input'
        },
        {
          label: '标准型号',
          prop: 'standardModel',
          value: '',
          type: 'input'
        },
        {
          label: '资产编号',
          prop: 'assetNumber',
          value: '',
          type: 'input'
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
          ]
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
          ]
        },
        {
          label: '供应商',
          prop: 'supplierName',
          value: '',
          type: 'input'
        },
        {
          label: '入库日期',
          prop: 'warehousingTime',
          value: '',
          type: 'date'
        },
        {
          label: '物品金额',
          prop: 'amountOfMoney',
          value: '',
          type: 'input'
        },
        {
          label: '使用部门',
          prop: 'groupNameAll',
          value: '',
          type: 'input'
        },
        {
          label: '物品所在地',
          prop: 'location',
          value: '',
          type: 'input'
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
        })
      } else {
        getAssetsDetailsGetDataDetailsOne(this.fromData).then(res => {
          this.fromValiData = res.result
        })
      }
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
</style>
