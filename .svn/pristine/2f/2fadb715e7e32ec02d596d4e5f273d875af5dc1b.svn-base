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
          <el-form-item label="借款类型:">
            <el-select v-model="type" multiple clearable collapse-tags filterable placeholder="请选择借款类型" @change="getListData()">
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
        <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-download" @click="dataExport()" v-if="(this.$store.getters.userInfo.roleName.split(',')).includes('出纳')||custodianrData.includes(userId) ">数据导出</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-user" @click="handleOperation()" v-if="Number(this.$store.getters.userInfo.level) >= 5 ">操作管理</el-button>
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 8">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getDictionariesGetById, getFinanceLoanQueryPageData, getFinanceLoanApply, getFinanceLoanModify, getFinanceLoanDel } from '@/api/finance/borrow.js'
import { getGroupGetDataOne, getUserGetDataByName } from '@/api/common.js'
import exportList from './export_list.vue'
import refund from './handle/refund.vue'
import refundEdit from './handle/refundEdit.vue'
import cause from './handle/cause.vue'
import detail from './detail.vue'
import operation from './operation.vue'
import edit from './edit.vue'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,
      operator: false,
      userId: this.$store.getters.userInfo.id,
      userData: [],
      groupData: [],
      state: [],
      type: [],
      time: [],
      times: [],
      checkTimes: [],
      paymentTimes: [],
      userIds: [],
      custodianrData: [], // 管理人
      groupIds: [],
      stateData: [
        { name: '未提交', id: '0' },
        { name: '审核中', id: '1' },
        { name: '未付款', id: '2' },
        { name: '已付款', id: '4' },
        { name: '已核销', id: '3' },
        { name: '已退回', id: '5' },
        { name: '已作废', id: '6' }
      ],
      typeData: [
        { name: '日常费用', id: '1' },
        { name: '保证金', id: '2' },
        { name: '专家费', id: '3' },
        { name: '总经办', id: '4' },
        { name: '差旅费', id: '5' },
        { name: '备用金', id: '6' },
        { name: '招投标', id: '7' },
        { name: '采购', id: '8' },
        { name: '其他', id: '9' }
      ],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'select',
          prop: 'delayState',
          label: '是否延期',
          data: [
            { name: '未延期', id: 1 },
            { name: '已延期', id: 2 },
            { name: '延期审核中', id: 3 }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'typeName', label: '借款类型', width: 100, type: 'view' },
        { prop: 'name', label: '申请人', width: 100 },
        { prop: 'groupName', label: '部门', width: 100 },
        { prop: 'loanNumber', label: '借款编号', width: 100 },
        { prop: 'borrowingBalance', label: '借款金额', width: 100 },
        { prop: 'notCancelMoney', label: '未核销金额', type: 'view2', width: 80 },
        { prop: 'stateName', label: '状态', width: 80 },
        { prop: 'delayStateName', label: '是否延期', width: 80 },
        { prop: 'createTime', label: '借款申请时间', width: 100 }
      ],
      button: {
        width: 250,
        buttonList: [
          {
            name: '提交',
            type: 'primary',
            click: 'handleSubmit',
            condition: params => {
              if (params.state === '0') {
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
            name: '销账',
            type: 'primary',
            click: 'handleCancel',
            condition: params => {
              if (params.state === '4' && ((this.$store.getters.userInfo.roleName.split(',')).includes('出纳') || this.operator)) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '还款',
            type: 'primary',
            click: 'handleRefund',
            condition: params => {
              if (params.state === '4' && params.notCancelMoney !== 0 && params.userId === this.$store.getters.userInfo.id) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '延期',
            type: 'primary',
            click: 'handleCause',
            condition: params => {
              if (params.state === '4' && params.delayState !== 3) {
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
              if ((params.state === '0' || params.state === '5') && params.userId === this.$store.getters.userInfo.id) {
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
              if (['2', '3', '4'].includes(params.state)) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '作废',
            type: 'danger',
            click: 'handleCancellation',
            condition: params => {
              if (params.userId === this.$store.getters.userInfo.id && ['0', '1', '2'].includes(params.state)) {
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
      // 类型
      if (this.type) {
        this.fromValiData.type = this.type.toString()
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
      getFinanceLoanQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
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
            case '3':
              xdd.stateName = '已销账'
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
          switch (xdd.delayState) {
            case 1:
              xdd.delayStateName = '未延期'
              break
            case 2:
              xdd.delayStateName = '已延期'
              break
            case 3:
              xdd.delayStateName = '延期审核中'
          }
          switch (xdd.type) {
            case '1':
              xdd.typeName = '日常费用'
              break
            case '2':
              xdd.typeName = '保证金'
              break
            case '3':
              xdd.typeName = '专家费'
              break
            case '4':
              xdd.typeName = '总经办'
              break
            case '5':
              xdd.typeName = '差旅费'
              break
            case '6':
              xdd.typeName = '备用金'
              break
            case '7':
              xdd.typeName = '采购'
              break
            case '8':
              xdd.typeName = '招投标'
              break
            case '9':
              xdd.typeName = '其他'
          }
          switch (xdd.payment) {
            case '1':
              xdd.paymentName = '现金'
              break
            case '2':
              xdd.paymentName = '银行'
          }
          if (xdd.state === 0 || xdd.state === 1) {
            xdd.approvalMoney = null
            xdd.approvalRepaymentTime = null
            xdd.balanceMoney = null
            xdd.notCancelMoney = null
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
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.state = []
      this.type = []
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
              type: 1
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
    // 操作管理
    // 29为采购菜单 30为付款菜单 31为借款菜单 32为报销菜单
    handleOperation() {
      this.$layer.iframe({
        content: {
          content: operation, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            id: 31
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '操作管理',
        maxmin: true,
        shadeClose: false
      })
    },
    getCustodian() {
      getDictionariesGetById({ id: 31 }).then(res => {
        this.custodianrData = res.result.dicCode.split(',')
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
    // 延期
    handleCause(params) {
      this.$layer.iframe({
        content: {
          content: cause, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '原因添加',
        maxmin: true,
        shadeClose: false
      })
    },
    // 提交
    handleSubmit(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将提交申请，是否继续?',
        confirm: function () {
          getFinanceLoanApply(params).then(res => {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getListData()
          })
        }
      })
    },
    // 付款
    handlePayment(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将确认此申请已成功付款，是否继续?',
        confirm: function () {
          params.state = 4
          getFinanceLoanModify(params).then(res => {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getListData()
          })
        }
      })
    },
    // 还款 --创建人
    handleRefund(params) {
      this.$layer.iframe({
        content: {
          content: refundEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            datas: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '还款',
        maxmin: true,
        shadeClose: false
      })
    },
    // 核销 --财务
    handleCancel(params) {
      this.$layer.iframe({
        content: {
          content: refundEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            datas: params,
            type: 2
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '销账',
        maxmin: true,
        shadeClose: false
      })
    },
    // 作废
    handleCancellation(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将作废本次申请，是否继续?',
        confirm: function () {
          params.state = 6
          getFinanceLoanModify(params).then(res => {
            that.$message({
              type: 'success',
              message: '操作成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getFinanceLoanDel({ ids: row.id }).then(res => {
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
    // 表格
    handleExcel(params) {
      window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/FinanceLoanById/download?' + 'id=' + params.id)
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: 1
          } // props
        },
        area: this.$layer_Size.Max,
        title: '申请详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: refund, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '还款明细',
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
    // 获取管理人员
    getOperator() {
      getDictionariesGetById({ id: 31 }).then(res => {
        let operator = res.result.dicCode.split(',')
        this.operator = operator.includes(this.userId)
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
