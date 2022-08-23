<!-- 固资管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">
        <el-form-item label="报废时间:">
          <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../fixedAssets/details.vue'
import scrap from '../fixedAssets/scrap.vue' // 报废 归还 申请 报废评估
import {
  getAssetsTypeGetChildren,
  getAssetsDetailsQueryPageData // 固资分页
} from '@/api/integrated/fixedAssets.js'
import { getGroupQueryPageData } from '@/api/jcxxgl/group.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      times: [],
      multipleSelection: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        state: '4'
      },
      pageData: {
        pageSize: 999,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'name', label: '资产名称' },
        {
          type: 'select',
          prop: 'scrapType',
          label: '报废评估状态',
          data: [
            { name: '有价值', id: '2' },
            { name: '无价值', id: '3' },
            { name: '评估中', id: '4' }
          ]
        },
        { type: 'select', prop: 'typeId', label: '资产类别', data: [] }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '资产名称',
          width: 100,
          type: 'view'
        },
        {
          prop: 'assetNumber',
          label: '资产编号',
          width: 100
        },
        {
          prop: 'typeNameAll',
          label: '资产类别',
          width: 100
        },
        {
          prop: 'scrapTime',
          label: '报废时间',
          width: 100
        },
        {
          prop: 'scrapReason',
          label: '报废原因',
          width: 200
        },
        {
          prop: 'scrapTypeName',
          label: '报废评估状态',
          width: 100
        },
        {
          prop: 'evaluationRemarks',
          label: '评估备注',
          width: 200
        }
      ],
      button: {
        width: 200,
        buttonList: [
          {
            name: '报废评估',
            type: 'primary',
            click: 'handleAssess',
            condition: params => {
              if (params.scrapType === '1' && params.auditStatus !== 2) {
                return true
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getAssetsDetailsQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.scrapType) {
              case '1':
                xdd.scrapTypeName = '待评估'
                break
              case '2':
                xdd.scrapTypeName = '有价值'
                break
              case '3':
                xdd.scrapTypeName = '无价值'
            }
            if (xdd.auditStatus === 2) {
              xdd.scrapTypeName = '评估中'
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
    },
    doSearch() {
      this.fromValiData.scrapStartTime = this.times[0]
      this.fromValiData.scrapEndTime = this.times[1]
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.times = []
      delete this.fromValiData.scrapStartTime
      delete this.fromValiData.scrapEndTime
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    // 报废评估
    handleAssess(params) {
      this.$layer.iframe({
        content: {
          content: scrap, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: '4'
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '报废评估',
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
    },
    getAssetsData() {
      getAssetsTypeGetChildren({}).then(res => {
        this.fromData.forEach(item => {
          if (item.prop === 'typeId') {
            item.data = res.result
          }
        })
      })
    },
    getGroup() {
      getGroupQueryPageData({ pageSize: 999, pageNow: 1, father: '0' }).then(
        res => {
          this.fromData.forEach(item => {
            if (item.prop === 'groupId') {
              item.data = res.result.pageList
            }
          })
        }
      )
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '资产信息',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.getGroup()
    this.getListData()
    this.getAssetsData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.el-tabs /deep/ .el-tabs__item {
  font-size: 16px;
}
</style>
