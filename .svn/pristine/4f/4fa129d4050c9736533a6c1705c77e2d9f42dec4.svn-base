<!-- 固资管理 -->
<template>
  <div class="pc-container">
    <el-tabs type="card" v-model="activeName" @tab-click="handleTab">
      <el-tab-pane label="固定资产" name="first">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
          <template v-if="boxshow">
            <template slot="other">
              <el-form-item label="资产类别:">
                <el-cascader :options="options" v-model="typeId" @change="getCheckedNodes" :props="{ multiple: true, checkStrictly: true }" clearable></el-cascader>
              </el-form-item>
              <el-form-item label="部门:" prop="groupId">
                <el-cascader v-model="groupId" :options="groupData" placeholder="请选择部门" filterable ref="myCascader" :props="{ checkStrictly: true }" clearable @change="doSearch"></el-cascader>
              </el-form-item>
              <el-form-item label="资产状态:">
                <el-select v-model="state" multiple clearable collapse-tags filterable placeholder="请选择资产状态" @change="getListData()">
                  <el-option v-for="item in stateData" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物品金额:">
                <el-input v-model="fromValiData.actualMoneyStart" type="Number" style="width: 90px" placeholder="最小金额" />~
                <el-input v-model="fromValiData.actualMoneyEnd" type="Number" style="width: 90px" placeholder="最大金额" />
              </el-form-item>
              <el-form-item label="创建时间:">
                <el-date-picker v-model="time" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListData()" style="width: 215px">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="入库时间:">
                <el-date-picker v-model="storageTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListData()" style="width: 215px">
                </el-date-picker>
              </el-form-item>
            </template>
            <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
            <el-button type="primary" class="default-btn" icon="el-icon-s-platform" @click="handleProperty()" v-if="Number(this.$store.getters.userInfo.level) >= 4">资产分类</el-button>
            <el-button type="primary" class="default-btn" icon="el-icon-s-platform" @click="handleSupplier()" v-if="show">供应商库</el-button>
            <el-button type="primary" class="default-btn" icon="el-icon-share" @click="handleAssets()" v-if="Number(this.$store.getters.userInfo.level) > 4">流程设置</el-button>
            <el-button type="primary" class="default-btn" icon="el-icon-user-solid" @click="handlePrincipal()" v-if="Number(this.$store.getters.userInfo.level) >= 4">资产负责人</el-button>
          </template>
          <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd() " v-if="show">添加资产</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-upload2" @click="dataInput()" v-if="show">数据导入</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-download" @click="dataExport()">数据导出</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-takeaway-box" @click="handleStorages()" v-if="Number(this.$store.getters.userInfo.level) >= 4 ||show">确认入库</el-button>
          <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
          <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <!-- <el-tab-pane label="易耗物品" lazy>
        <tableItem :obj="this" :tableData="tableData1" :tableHeader="tableHeader1" :button="button1" :dataSum='fromValiData.dataSum1' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane> -->
      <el-tab-pane label="报废资产" lazy>
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData1" :isShow="boxshow">
          <template v-if="boxshow">
            <template slot="other">
              <el-form-item label="报废时间:">
                <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
                </el-date-picker>
              </el-form-item>
            </template>
            <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          </template>
          <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
          <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData2" :tableHeader="tableHeader2" :button="button2" :dataSum='fromValiData.dataSum2' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getAssetsTypeGetChildren,
  getAssetsDetailsQueryPageData, // 固资分页
  getAssetsDetailsModify,
  getAssetsConsumableQueryPageData, // 易耗分页
  getAssetsDetailsDel, // 固资删除
  getAssetsConsumableDel, // 易耗删除
  getAssetsTypeJudgmentOperation, // 是否为资产操作用户
  getAssetsDetailsAddSecondaryConfirmation // 确认入库
} from '@/api/integrated/fixedAssets.js'
import { getGroupQueryAllGroupsTree } from '@/api/jcxxgl/group.js'
import property from './property/list.vue' // 资产分类
import supplier from './supplier/list.vue' // 供应商库
import keep from './keep.vue' // 维保信息
import scrap from './scrap.vue' // 报废 归还 申请 报废评估
import progress from './progress.vue' // 进度
import workFlow from './workFlow/list.vue' // 流程
import editExpend from './edit_expend.vue' // 易耗
import editFixation from './edit_fixation.vue' // 固资
import details from './details.vue'
import input from './input.vue' // 导入
import principal from './principal.vue' // 资产负责人
import handle from './handle.vue' // 操作
export default {
  data() {
    return {
      loading: false,
      boxshow: false,
      show: false,
      activeName: 'first',
      manager: [],
      time: [],
      times: [],
      storageTime: [],
      state: [],
      stateData: [
        { name: '闲置', id: '1' },
        { name: '使用', id: '2' },
        { name: '维修', id: '3' },
        { name: '报废', id: '4' },
        { name: '审批中', id: '5' }
      ],
      groupData: [],
      options: [],
      lab: '1',
      userId: this.$store.getters.userInfo.id,
      multipleSelection: [],
      typeId: '',
      groupId: '',
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        state: '',
        typeId: ''
      },
      pageData: {
        pageSize: 999,
        pageNow: 1,
        typeId: ''
      },
      fromData: [
        { type: 'input', prop: 'name', label: '资产名称' },
        {
          type: 'select',
          prop: 'storage',
          label: '是否确认入库',
          data: [
            { name: '是', id: 1 },
            { name: '否', id: 0 }
          ]
        }
      ],
      fromData1: [
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
        }
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
          width: 120
        },
        {
          prop: 'groupNameAll',
          label: '使用部门',
          width: 120
        },
        {
          prop: 'stateName',
          label: '资产状态',
          width: 60,
          type: 'view2',
          condition: params => {
            if (params.stateName === '报废') {
              return '#F56C6C'
            } else if (params.stateName === '闲置') {
              return '#27c24c'
            } else if (params.stateName === '维修') {
              return '#DB9834'
            } else {
              return '#0195db'
            }
          }
        },
        {
          prop: 'maintenanceName',
          label: '维保信息',
          width: 60
        }
      ],
      button: {
        width: 200,
        buttonList: [
          {
            name: '维保信息',
            type: 'primary',
            click: 'handleKeep'
          },
          {
            name: '确认入库',
            type: 'primary',
            click: 'handleStorage',
            condition: params => {
              if (params.storage === 0 && params.newIds.split(',').includes(this.userId)) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '完成维修',
            type: 'primary',
            click: 'verify',
            condition: params => {
              if (params.state === '3' && params.auditStatus !== 2) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '操作',
            type: 'primary',
            click: 'handle',
            condition: params => {
              if (params.auditStatus !== 2 && params.newIds.split(',').includes(this.userId)) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '二维码',
            type: 'text',
            click: 'handleQRcode'
          }
        ]
      },
      tableData1: [],
      tableHeader1: [
        {
          prop: 'name',
          label: '物品名称',
          width: 100
        },
        {
          prop: 'typeNameAll',
          label: '资产类别',
          width: 100
        },
        {
          prop: 'quantity',
          label: '数量',
          width: 100
        },
        {
          prop: 'amountOfMoney',
          label: '物品金额',
          width: 100
        },
        {
          prop: 'warehousingTime',
          label: '购入日期',
          width: 100
        }
      ],
      button1: {
        width: 250,
        buttonList: [
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      tableData2: [],
      tableHeader2: [
        { prop: 'name', label: '资产名称', width: 100, type: 'view' },
        { prop: 'assetNumber', label: '资产编号', width: 100 },
        { prop: 'typeNameAll', label: '资产类别', width: 100 },
        { prop: 'scrapTime', label: '报废时间', width: 100 },
        { prop: 'scrapReason', label: '报废原因', width: 200 },
        { prop: 'scrapTypeName', label: '报废评估状态', width: 100 },
        { prop: 'evaluationRemarks', label: '评估备注', width: 200 }
      ],
      button2: {
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
  watch: {
    'lab': {
      handler: function (newV) {
        if (newV) {
          this.fromValiData.state = ''
        }
        if (newV === 3) {
          this.fromValiData.state = '4'
        }
      }
    }
  },
  methods: {
    // 判断是否为操作用户
    criteria() {
      getAssetsTypeJudgmentOperation({}).then(res => {
        this.show = res.result
      })
    },
    getCheckedNodes(node) {
      let ids = ''
      node.forEach(xdd => {
        if (xdd.length > 1) {
          xdd = xdd.pop()
          ids += xdd + ','
        } else {
          ids += xdd + ','
        }
      })
      this.fromValiData.typeId = ids.substring(0, ids.lastIndexOf(','))
      this.getListData()
    },
    getListData() {
      this.loading = true
      if (this.lab === '1') {
        // 状态
        if (this.state) {
          this.fromValiData.state = this.state.toString()
        }
        // 创建时间
        if (this.time) {
          this.fromValiData.timeStart = this.time[0]
          this.fromValiData.timeEnd = this.time[1]
        }
        // 入库时间
        if (this.storageTime) {
          this.fromValiData.warehousingTimeStartTime = this.storageTime[0]
          this.fromValiData.warehousingTimeEndTime = this.storageTime[1]
        }
        getAssetsDetailsQueryPageData(this.fromValiData).then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.newIds = xdd.operationUserIdAll + ',' + xdd.assetsUserIdAll
            switch (xdd.state) {
              case '1':
                xdd.stateName = '闲置'
                break
              case '2':
                xdd.stateName = '使用'
                break
              case '3':
                xdd.stateName = '维修'
                break
              case '4':
                xdd.stateName = '报废'
            }
            if (xdd.auditStatus === 2) {
              xdd.stateName = '审核中'
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
            switch (xdd.company) {
              case '1':
                xdd.companyName = '九升检测'
                break
              case '2':
                xdd.companyName = '集团公司'
                break
              case '3':
                xdd.companyName = '两山生态'
                break
              case '4':
                xdd.companyName = '吉东科技'
                break
              case '5':
                xdd.companyName = '碧泉科技'
                break
              case '6':
                xdd.companyName = '环测科技'
            }
            if (xdd.maintenance) {
              xdd.maintenanceName = '有'
            } else {
              xdd.maintenanceName = '无'
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.fromValiData.dataSum1 = res.result.dataSum
          this.loading = false
        })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else if (this.lab === '2') {
        getAssetsConsumableQueryPageData(this.fromValiData).then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.state) {
              case '4':
                xdd.stateName = '报废'
            }
          })
          this.tableData1 = res.result.pageList
          this.loading = false
        })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else if (this.lab === '3') {
        this.fromValiData.state = '4'
        getAssetsDetailsQueryPageData(this.fromValiData).then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.scrapType) {
              case '1':
                xdd.scrapTypeName = '评估中'
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
          this.tableData2 = res.result.pageList
          this.fromValiData.dataSum2 = res.result.dataSum
          this.loading = false
        })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    handleTab(tab) {
      this.fromValiData.pageNow = 1
      this.fromValiData.pageSize = 10
      if (tab.label === '固定资产') {
        this.lab = '1'
      } else if (tab.label === '易耗物品') {
        this.lab = '2'
      } else {
        this.lab = '3'
      }
      this.doReset()
      this.getListData()
    },
    doSearch() {
      if (this.groupId) {
        this.fromValiData.groupIds = this.groupId[this.groupId.length - 1]
      }
      this.fromValiData.scrapStartTime = this.times[0]
      this.fromValiData.scrapEndTime = this.times[1]
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.state = []
      this.time = []
      this.times = []
      this.storageTime = []
      this.groupId = ''
      delete this.fromValiData.groupIds
      delete this.fromValiData.actualMoneyStart
      delete this.fromValiData.actualMoneyEnd
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    // 资产分类
    handleProperty() {
      this.$layer.iframe({
        content: {
          content: property, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '资产分类',
        maxmin: true,
        shadeClose: false
      })
    },
    // 供应商库
    handleSupplier() {
      this.$layer.iframe({
        content: {
          content: supplier, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '供应商库',
        maxmin: true,
        shadeClose: false
      })
    },
    // 流程设置
    handleAssets() {
      this.$layer.iframe({
        content: {
          content: workFlow, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '流程设置',
        maxmin: true,
        shadeClose: false
      })
    },
    // 资产负责人
    handlePrincipal() {
      this.$layer.iframe({
        content: {
          content: principal, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Normal,
        title: '资产负责人',
        maxmin: true,
        shadeClose: false
      })
    },
    // 导入
    dataInput() {
      this.$layer.iframe({
        content: {
          content: input, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Normal,
        title: '文件导入',
        maxmin: true,
        shadeClose: false
      })
    },
    // 导出
    dataExport() {
      let id = { ids: '' }
      this.multipleSelection.forEach(xdd => {
        id.ids += xdd.id + ','
      })
      if (id.ids) {
        id.ids = id.ids.substring(0, id.ids.length - 1)
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/AssetsDetails/download?' + 'ids=' + id.ids)
      } else {
        window.open('../../../../static/固定资产模板.xlsx')
      }
    },
    // 添加
    handleAdd() {
      if (this.lab === '1') {
        this.$layer.iframe({
          content: {
            content: editFixation, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {} // props
          },
          area: this.$layer_Size.Normal,
          title: '添加固定资产',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.lab === '2') {
        this.$layer.iframe({
          content: {
            content: editExpend, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {} // props
          },
          area: this.$layer_Size.Normal,
          title: '添加易耗资产',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleEdit(params) {
      if (this.lab === '1') {
        this.$layer.iframe({
          content: {
            content: editFixation, // 传递的组件对象
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
      } else {
        this.$layer.iframe({
          content: {
            content: editExpend, // 传递的组件对象
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
      }
    },
    // 维保
    handleKeep(params) {
      this.$layer.iframe({
        content: {
          content: keep, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '维保信息',
        maxmin: true,
        shadeClose: false
      })
    },
    // 维修完成
    verify(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将确认物品已维修好, 是否继续?',
        confirm: function () {
          params.state = params.maintenanceStatus
          getAssetsDetailsModify(params).then(res => {
            that.$message({
              type: 'success',
              message: '确认成功'
            })
            that.getListData()
          })
        }
      })
    },
    // 确认入库
    handleStorage(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将确认物品已成功入库, 是否继续?',
        confirm: function () {
          let id = {}
          id.ids = params.id
          getAssetsDetailsAddSecondaryConfirmation(id).then(res => {
            that.$message({
              type: 'success',
              message: '确认成功'
            })
            that.getListData()
          })
        }
      })
    },
    // 批量确认入库
    handleStorages(params) {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选需确认的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleStorage(ids)
    },
    handleQRcode(params) {
      let url = encodeURIComponent('http://oa.9sjc.top/#/qrCode?' + 'id=' + params.id)
      window.open(process.env.BASE_API + process.env.JS_Server + '/qrCode/AssetsDetails/download?' + 'url=' + url)
    },
    // 查询进度
    handleProgress(params) {
      this.$layer.iframe({
        content: {
          content: progress, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            dataList: params
          } // props
        },
        area: ['1000px', '600px'],
        title: '申请进度',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      if (this.lab === '1') {
        this.$share.confirm({
          confirm: function () {
            getAssetsDetailsDel({ ids: row.id }).then(res => {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
              that.getListData()
            })
          }
        })
      } else {
        this.$share.confirm({
          confirm: function () {
            getAssetsConsumableDel({ ids: row.id }).then(res => {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
              that.getListData()
            })
          }
        })
      }
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
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
        let Data = this.handleData(res.result)
        this.handelOption(Data)
        this.options = Data
      })
    },
    handelOption(options) {
      options.forEach(item => {
        if (item.children.length === 0) {
          delete item.children
        } else {
          this.handelOption(item.children)
        }
      })
    },
    getGroupData() {
      let fromData = {}
      fromData.father = '0'
      fromData.pageSize = 999
      fromData.pageNow = 1
      getGroupQueryAllGroupsTree(fromData).then(res => {
        this.groupData = res.result
        this.handelOption(this.groupData)
      })
    },
    // 转换对象中的键名
    handleData(data) {
      let newData = data.map(item => {
        let option = {
          value: item.id,
          label: item.name
        }
        if (item.children && item.children !== []) {
          option.children = this.handleData(item.children)
        }
        return option
      })
      return newData
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
        area: this.$layer_Size.Maxs,
        title: '资产信息',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails2(params) {
      if (params.state === '4') {
        this.$layer.iframe({
          content: {
            content: scrap, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params,
              showData: true
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '资产报废',
          maxmin: true,
          shadeClose: false
        })
      } else if (params.stateName === '审核中') {
        this.$layer.iframe({
          content: {
            content: progress, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              dataList: params
            } // props
          },
          area: ['1000px', '600px'],
          title: '申请进度',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Maxs,
          title: '资产信息',
          maxmin: true,
          shadeClose: false
        })
      }
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
    // 操作
    handle(params) {
      this.$layer.iframe({
        content: {
          content: handle, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: '1'
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '操作',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.getGroupData()
    this.getListData()
    this.getAssetsData()
  },
  created() {
    this.criteria()
  }
}
</script>

<style scoped lang="scss">
.el-tabs /deep/ .el-tabs__item {
  font-size: 16px;
}
>>> input::-webkit-outer-spin-button,
>>> input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

>>> input[type='Number'] {
  -moz-appearance: textfield !important;
}
</style>
