<!-- 付款申请 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="状态:">
            <el-select v-model="state" multiple clearable collapse-tags filterable placeholder="请选择状态" @change="getListData()">
              <el-option v-for="item in stateData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请类型:">
            <el-select v-model="type" multiple clearable collapse-tags filterable placeholder="请选择申请类型" @change="getListData()">
              <el-option v-for="item in typeData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请人:">
            <el-select v-model="userIds" multiple clearable collapse-tags filterable placeholder="请选择申请人" @change="getListData()">
              <el-option v-for="item in userData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门:">
            <el-select v-model="groupIds" multiple clearable collapse-tags filterable placeholder="请选择部门" @change="getListData()">
              <el-option v-for="item in groupData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
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
          <el-form-item label="付款时间:">
            <el-date-picker v-model="paymentTimes" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListData()" style="width: 215px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置 </el-button>
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
import { getPaymentFinanceDel, getPaymentFinanceApply, getPaymentFinanceModify, getPaymentFinanceQueryPageData } from '@/api/finance/payment.js'
import { getGroupGetDataOne, getUserGetDataByName } from '@/api/common.js'
// import excelPayment from '../../../../static/excel/payment.vue'
import exportList from '../borrowMoeny/export_list.vue'
import operation from '../borrowMoeny/operation.vue'
// import payment from '../borrowMoeny/handle/payment.vue'
import detail from './detail.vue'
import edit from './edit.vue'
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
      state: [],
      type: [],
      time: [],
      times: [],
      checkTimes: [],
      paymentTimes: [],
      userIds: [],
      groupIds: [],
      stateData: [
        { name: '未提交', id: '0' },
        { name: '审核中', id: '1' },
        { name: '已审核', id: '2' },
        { name: '已退回', id: '3' },
        { name: '已付款', id: '4' }

      ],
      typeData: [
        { name: '保证金', id: '1' },
        { name: '日常费用', id: '2' },
        { name: '采购付款', id: '3' },
        { name: '招投标付款', id: '4' }
      ],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        keyWord: null
      },
      fromData: [],
      tableData: [],
      tableHeader: [
        { prop: 'typeName', label: '申请类型', width: 100, type: 'view' },
        { prop: 'loanNumber', label: '付款编号', width: 100 },
        { prop: 'groupName', label: '部门', width: 100 },
        { prop: 'createUserName', label: '申请人', width: 100 },
        { prop: 'paymentMoney', label: '申请金额', width: 100 },
        { prop: 'paymentCause', label: '申请原因', width: 100 },
        { prop: 'paymentTime', label: '申请时间', width: 100 },
        { prop: 'stateName', label: '状态', width: 80 }
      ],
      button: {
        width: 250,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.userId === this.$store.getters.userInfo.id && (params.state === '0' || params.state === '5')) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '付款',
            type: 'primary',
            click: 'handlePayment',
            condition: params => {
              if (params.state === '2' && ((this.$store.getters.userInfo.roleName.split(',')).includes('出纳') || this.operator)) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '提交',
            type: 'primary',
            click: 'handleApply',
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
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      // 状态
      if (this.state) {
        this.fromValiData.state = this.state.toString()
      }
      // 申请类型
      if (this.type) {
        this.fromValiData.type = this.type.toString()
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
      // 付款时间
      if (this.paymentTimes) {
        this.fromValiData.paymentStateTimeStart = this.paymentTimes[0]
        this.fromValiData.paymentStateTimeEnd = this.paymentTimes[1]
      }
      // 申请人
      if (this.userIds) {
        this.fromValiData.userIds = String(this.userIds)
      }
      // 部门
      if (this.groupIds) {
        this.fromValiData.groupIds = String(this.groupIds)
      }
      getPaymentFinanceQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.type) {
              case '1':
                xdd.typeName = '保证金'
                break
              case '2':
                xdd.typeName = '日常费用'
                break
              case '3':
                xdd.typeName = '采购付款'
                break
              case '4':
                xdd.typeName = '招投标付款'
            }
            switch (xdd.state) {
              case '0':
                xdd.stateName = '未提交'
                break
              case '1':
                xdd.stateName = '审核中'
                break
              case '2':
                xdd.stateName = '未付款'
                break
              case '4':
                xdd.stateName = '已付款'
                break
              case '5':
                xdd.stateName = '已退回'
                break
              case '6':
                xdd.stateName = '已作废'
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handlePayment(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将确认此申请已成功付款，是否继续?',
        confirm: function () {
          params.state = 4
          getPaymentFinanceModify(params).then(res => {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getListData()
          })
        }
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
              type: 3
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
      window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/PaymentFinanceById/download?' + 'id=' + params.id)
    },
    // 提交
    handleApply(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将提交申请，是否继续?',
        confirm: function () {
          getPaymentFinanceApply(params).then(res => {
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
      this.type = []
      this.state = []
      this.time = []
      this.times = []
      this.checkTimes = []
      this.paymentTimes = []
      this.userIds = []
      this.groupIds = []
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
            id: 30
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '操作管理',
        maxmin: true,
        shadeClose: false
      })
    },
    getCustodian() {
      getDictionariesGetById({ id: 30 }).then(res => {
        this.custodianrData = res.result.dicCode.split(',')
      })
    },
    // 获取管理人员
    getOperator() {
      getDictionariesGetById({ id: 30 }).then(res => {
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
          getPaymentFinanceDel({ ids: row.id }).then(res => {
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
</style>
