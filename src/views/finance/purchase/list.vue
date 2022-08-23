<!-- 采购管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="申请人:">
            <el-select v-model="userIds" multiple clearable collapse-tags filterable placeholder="请选择申请人" @change="getListData()">
              <el-option v-for="item in userData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物品类别:">
            <el-select v-model="purchaseType" multiple clearable collapse-tags filterable placeholder="请选择物品类别" @change="getListData()">
              <el-option v-for="item in purchaseTypeData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="state" multiple clearable collapse-tags filterable placeholder="请选择状态" @change="getListData()">
              <el-option v-for="item in stateData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门:">
            <el-select v-model="groupIds" multiple clearable collapse-tags filterable placeholder="请选择部门" @change="getListData()">
              <el-option v-for="item in groupData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实际金额:">
            <el-input v-model="fromValiData.actualMoneyStart" type="Number" style="width: 90px" placeholder="最小金额" />~
            <el-input v-model="fromValiData.actualMoneyEnd" type="Number" style="width: 90px" placeholder="最大金额" />
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-date-picker v-model="time" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListData()" style="width: 215px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="申请时间:">
            <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListData()" style="width: 215px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="审核时间:">
            <el-date-picker v-model="checkTimes" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListData()" style="width: 215px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-download" @click="dataExport()" v-if="(this.$store.getters.userInfo.roleName.split(',')).includes('出纳')||custodianrData.includes(userId) ">数据导出</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-user" @click="handleOperation()" v-if="Number(this.$store.getters.userInfo.level) >= 5 ">操作管理</el-button>
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 8">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum="fromValiData.dataSum" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getDictionariesGetById } from '@/api/finance/borrow.js'
import { getGroupGetDataOne, getUserGetDataByName } from '@/api/common.js'
import {
  getPurchaseModifyActualMoneyState,
  getPurchaseQueryPageData,
  getPurchaseApply,
  getPurchaseDel
} from '@/api/finance/purchase.js'
import operation from '../borrowMoeny/operation.vue'
import exportList from '../borrowMoeny/export_list.vue'
import detail from './detail.vue'
import edit from './edit.vue'
import amend from './amend.vue'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,
      operator: false,
      userId: this.$store.getters.userInfo.id,
      custodianrData: [], // 管理人
      userData: [],
      groupData: [],
      stateData: [
        { name: '未提交', id: '0' },
        { name: '审核中', id: '1' },
        { name: '已审核', id: '2' },
        { name: '已退回', id: '3' },
        { name: '已采购', id: '4' }
      ],
      purchaseTypeData: [
        { name: '行政办公类', id: '行政办公类' },
        { name: '生活用品类', id: '生活用品类' },
        { name: '生产耗材类', id: '生产耗材类' },
        { name: '固定资产类', id: '固定资产类' },
        { name: '仪器设备类', id: '仪器设备类' },
        { name: '标准书籍类', id: '标准书籍类' },
        { name: '标准物质类', id: '标准物质类' },
        { name: '能力验证', id: '能力验证' },
        { name: '仪器维修耗材', id: '仪器维修耗材' },
        { name: '办公软件', id: '办公软件' }
      ],
      times: [],
      time: [],
      checkTimes: [],
      userIds: [],
      groupIds: [],
      state: [],
      purchaseType: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'input',
          prop: 'purchaseName',
          label: '物资名称'
        }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'purchaseType', label: '物资类别', type: 'view', width: 100 },
        { prop: 'loanNumber', label: '付款编号', width: 100 },
        { prop: 'groupName', label: '部门', width: 100 },
        { prop: 'createUserName', label: '申请人', width: 100 },
        { prop: 'purchaseName', label: '物资名称', width: 100 },
        { prop: 'estimateMoney', label: '预计金额', width: 100 },
        { prop: 'actualMoney', label: '实际金额', width: 100 },
        { prop: 'specifications', label: '型号/规格', width: 100 },
        { prop: 'stateName', label: '状态', width: 80 }
      ],
      button: {
        width: 250,
        buttonList: [
          {
            name: '提交',
            type: 'primary',
            click: 'handleSubmit',
            condition: params => {
              if ((params.state === '0' || params.state === '3') && params.userId === this.$store.getters.userInfo.id) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.state === '0' && params.userId === this.$store.getters.userInfo.id) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '导出表格',
            type: 'primary',
            click: 'handleExcel',
            condition: params => {
              if (params.state === '2' || params.state === '4') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '修改',
            type: 'primary',
            click: 'handleAmend',
            condition: params => {
              if (params.state === '2' && this.operator) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '采购完成',
            type: 'primary',
            click: 'handleFulfill',
            condition: params => {
              if (params.state === '2' && this.operator) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      // 物品类别
      if (this.purchaseType) {
        this.fromValiData.purchaseType = this.purchaseType.toString()
      }
      // 状态
      if (this.state) {
        this.fromValiData.state = this.state.toString()
      }
      // 创建时间
      if (this.time) {
        this.fromValiData.startTime = this.time[0]
        this.fromValiData.endTime = this.time[1]
      }
      // 提交时间
      if (this.times) {
        this.fromValiData.submitTimeStart = this.times[0]
        this.fromValiData.submitTimeEnd = this.times[1]
      }
      // 审核时间
      if (this.checkTimes) {
        this.fromValiData.toExamineTimeStart = this.checkTimes[0]
        this.fromValiData.toExamineTimeEnd = this.checkTimes[1]
      }
      // 申请人
      if (this.userIds) {
        this.fromValiData.userIds = this.userIds.toString()
      }
      // 部门
      if (this.groupIds) {
        this.fromValiData.groupIds = this.groupIds.toString()
      }
      getPurchaseQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(item => {
          switch (item.state) {
            case '0':
              item.stateName = '未提交'
              break
            case '1':
              item.stateName = '审核中'
              break
            case '2':
              item.stateName = '已审核'
              break
            case '3':
              item.stateName = '已退回'
              break
            case '4':
              item.stateName = '已采购'
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
    // 提交
    handleSubmit(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将提交申请，是否继续?',
        confirm: function () {
          getPurchaseApply(params).then(res => {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getListData()
          })
        }
      })
    },
    // 修改
    handleAmend(params) {
      this.$layer.iframe({
        content: {
          content: amend, // 传递的组件对象
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
    // 完成
    handleFulfill(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将确认已完成采购，是否继续?',
        confirm: function () {
          params.state = '4'
          getPurchaseModifyActualMoneyState(params).then(res => {
            that.$message({
              type: 'success',
              message: '操作成功'
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
      delete this.fromValiData.actualMoneyStart
      delete this.fromValiData.actualMoneyEnd
      this.state = []
      this.purchaseType = []
      this.times = []
      this.time = []
      this.userIds = []
      this.groupIds = []
      this.checkTimes = []
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    // 操作管理
    // 29为采购菜单 30为付款菜单 31为借款菜单 32为报销菜单
    handleOperation() {
      this.$layer.iframe({
        content: {
          content: operation, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            id: 29
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '操作管理',
        maxmin: true,
        shadeClose: false
      })
    },
    getCustodian() {
      getDictionariesGetById({ id: 29 }).then(res => {
        this.custodianrData = res.result.dicCode.split(',')
      })
    },
    // 获取管理人员
    getOperator() {
      getDictionariesGetById({ id: 29 }).then(res => {
        let operator = res.result.dicCode.split(',')
        this.operator = operator.includes(this.userId)
      })
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
          getPurchaseDel({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
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
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '申请详情',
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
        this.$layer.iframe({
          content: {
            content: exportList, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: id,
              type: 5
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '导出表头选择',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$share.message('请选择需要下载的数据列表', 'warning')
      }
    },
    // 表格
    handleExcel(params) {
      window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/PurchaseById/download?' + 'id=' + params.id)
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    // 获取一级部门
    getOneGroup() {
      getGroupGetDataOne({}).then(res => {
        this.groupData = res.result.map(xdd => {
          return {
            id: xdd.id,
            name: xdd.name
          }
        })
      })
    },
    // 获取全部人
    getUserData() {
      getUserGetDataByName({}).then(res => {
        this.userData = res.result.map(xdd => {
          return {
            id: xdd.id,
            name: xdd.name
          }
        })
      })
    }
  },
  mounted() {
    this.getListData()
    this.getOperator()
  },
  created() {
    this.getOneGroup()
    this.getUserData()
    this.getCustodian()
  }
}
</script>

<style scoped lang="scss">
>>> input::-webkit-outer-spin-button,
>>> input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

>>> input[type='Number'] {
  -moz-appearance: textfield !important;
}
</style>
