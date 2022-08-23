<!-- 资产明细 -->
<template>
  <div class='operate-container contractDetail'>
    <el-descriptions title='供应商详情' :column='4' :size='size' border>
      <el-descriptions-item>
        <template slot='label'>
          <i class='el-icon-user'></i>
          供应商
        </template>
        {{SupplierData.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          联系人
        </template>
        {{SupplierData.contacts}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          联系电话
        </template>
        {{SupplierData.telephone}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          合作时间
        </template>
        {{SupplierData.warehousingTime}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot='label'>
          规模(/人)
        </template>
        {{SupplierData.supplierScale}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          性质
        </template>
        {{SupplierData.natureName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot='label'>
          通信地址
        </template>
        {{SupplierData.mailingAddress}}
      </el-descriptions-item>
    </el-descriptions>
    <div style='margin-top:40px'>
      <div style="font-size: 16px;font-weight: 700;margin-bottom:20px;">资产详情</div>
      <tableItem :obj="this" :isSelection="false" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
    </div>
  </div>
</template>

<script>
import {
  getAssetsDetailsQueryPageData,
  getAssetsSupplierQueryPageData
} from '@/api/integrated/fixedAssets.js'
export default {
  components: {},
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      loading: false,
      size: '',
      SupplierData: null,
      fileList: [],
      AssetsData: {},
      fixation: [], // 固定
      expend: [], // 易耗

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableHeader: [
        { prop: 'name', label: '资产名称', width: 100 },
        { prop: 'assetNumber', label: '资产编号', width: 100 },
        { prop: 'typeNameAll', label: '资产类别', width: 120 },
        { prop: 'standardModel', label: '标准型号', width: 100 },
        { prop: 'employ', label: '部门-所用人', width: 120 },
        { prop: 'stateName', label: '资产状态', width: 60 },
        { prop: 'maintenanceName', label: '维保信息', width: 60 }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getAssetsDetailsQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.state) {
            case '1':
              xdd.stateName = '闲置'
              break
            case '2':
              xdd.stateName = '使用'
              break
            case '3':
              xdd.stateName = '维保'
              break
            case '4':
              xdd.stateName = '报废'
          }
          switch (xdd.source) {
            case '1':
              xdd.sourceName = '购入'
              break
            case '2':
              xdd.sourceName = '捐赠'
              break
            case '3':
              xdd.sourceName = '租赁'
              break
            case '4':
              xdd.sourceName = '其他'
          }
          if (xdd.maintenance) {
            xdd.maintenanceName = '有'
          } else {
            xdd.maintenanceName = '无'
          }
          if (xdd.userId || xdd.groupNameAll) {
            xdd.employ = xdd.groupNameAll + '-' + xdd.userName
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
    },
    getSupplierData() {
      getAssetsSupplierQueryPageData(this.fromValiData).then(res => {
        switch (res.result.pageList[0].nature) {
          case '1':
            res.result.pageList[0].natureName = '个人'
            break
          case '2':
            res.result.pageList[0].natureName = '政府'
            break
          case '3':
            res.result.pageList[0].natureName = '事业单位'
            break
          case '4':
            res.result.pageList[0].natureName = '私有企业'
            break
          case '5':
            res.result.pageList[0].natureName = '国有企业'
            break
          case '6':
            res.result.pageList[0].natureName = '外资企业'
            break
          case '7':
            res.result.pageList[0].natureName = '合资企业'
        }
        this.SupplierData = res.result.pageList[0]
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
      this.fromValiData.id = this.params.supplierId
      this.fromValiData.supplierId = this.params.supplierId
      this.getSupplierData()
      this.getListData()
    }
  },
  created() { }
}
</script>
<style lang='scss'>
.contractDetail {
  .my-label {
    background-color: #e1f3d8 !important;
  }
}
</style>
