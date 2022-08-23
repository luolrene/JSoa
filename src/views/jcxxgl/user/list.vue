<!-- 角色信息管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="部门:" prop="groupId">
            <el-cascader v-model="groupId" :options="groupData" placeholder="请选择部门" filterable ref="myCascader" :props="{ checkStrictly: true }" clearable @change="doSearch"></el-cascader>
          </el-form-item>
          <el-form-item label="预期转正时间:">
            <el-date-picker v-model="formalTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入职时间:">
            <el-date-picker v-model="inductionTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()" title="查询">查询</el-button>
        <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-upload2" @click="dataInput()">数据导入</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-download" @click="dataExport()">数据导出</el-button>
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 5">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import exp from './exp.vue'
import edit from './edit.vue'
import detail from './detail.vue'
import input from './input.vue'
import { getUserQueryPageData, getUserDelUsers, getUserChangeFreeze, getUserFreeze, getUserResetPassword } from '@/api/jcxxgl/user.js'
import { getGroupQueryAllGroupsTree } from '@/api/jcxxgl/group.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,
      groupData: [],
      formalTime: [],
      inductionTime: [],
      groupId: [],
      showList: true,
      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'name', label: '用户名称' },
        {
          type: 'select',
          prop: 'freeze',
          label: '账号状态',
          data: [{ name: '冻结', id: '0' }, { name: '正常', id: '1' }]
        },
        {
          type: 'select',
          prop: 'onTheJobStatus',
          label: '在职状态',
          data: [
            { name: '在职', id: '1' },
            { name: '离职', id: '2' },
            { name: '试用期', id: '3' },
            { name: '退休', id: '4' },
            { name: '临时', id: '5' },
            { name: '实习期', id: '6' },
            { name: '挂靠', id: '7' },
            { name: '其他', id: '8' }
          ]
        },
        {
          type: 'select',
          prop: 'contractType',
          label: '用工形式',
          data: [
            { id: '1', name: '劳动合同' },
            { id: '2', name: '劳务协议' },
            { id: '3', name: '实习协议' },
            { id: '4', name: '兼职协议' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'name', label: '姓名', width: 90, type: 'view', fixed: 'left' },
        { prop: 'jobNumber', label: '工号', width: 80, fixed: 'left' },
        { prop: 'companyName', label: '单位', width: 70, fixed: 'left' },
        { prop: 'groupName', label: '部门', width: 150, fixed: 'left' },
        { prop: 'roleName', label: '角色', width: 120, fixed: 'left' },
        { prop: 'administrativeRankName', label: '行政职级', width: 80, fixed: 'left' },
        { prop: 'technicalRankName', label: '技术职级', width: 80 },
        { prop: 'marketRankName', label: '市场职级', width: 80 },
        { prop: 'onTheJobStatusName', label: '在职状态', width: 80 },
        { prop: 'inductionTime', label: '入职时间', width: 100 },
        { prop: 'formalTimeActual', label: '转正时间', width: 100 },
        { prop: 'seniority', label: '工龄', width: 60 },
        { prop: 'idNumber', label: '身份证号', width: 160 },
        { prop: 'idNumberTime', label: '证件有效期', width: 100 },
        { prop: 'nation', label: '民族', width: 80 },
        { prop: 'sex', label: '性别', width: 60 },
        { prop: 'birthTime', label: '出生日期', width: 100 },
        { prop: 'age', label: '年龄', width: 60 },
        { prop: 'educationName', label: '学历', width: 80 },
        { prop: 'school', label: '毕业学校', width: 150 },
        { prop: 'professionalDirection', label: '毕业专业', width: 150 },
        { prop: 'graduate', label: '毕业时间', width: 100 },
        { prop: 'politicalOutlookName', label: '政治面貌', width: 80 },
        { prop: 'maritalStatusName', label: '婚姻状态', width: 80 },
        { prop: 'registeredName', label: '户口性质', width: 80 },
        { prop: 'bankCode', label: '银行账号(银行)', width: 180 },
        { prop: 'rankLevNum', label: '职称等级', width: 100 },
        { prop: 'rankLevName', label: '职称名称', width: 100 },
        { prop: 'certification', label: '资格证', width: 120 },
        { prop: 'environment', label: '环境持证', width: 90 },
        { prop: 'agriculture', label: '农业持证', width: 90 },
        { prop: 'position', label: '职卫持证', width: 90 },
        { prop: 'oldUnit', label: '原工作单位', width: 180 },
        { prop: 'oldPost', label: '原工作岗位', width: 180 },
        { prop: 'workingYear', label: '原工作年限', width: 120 },
        { prop: 'mailingAddress', label: '通信地址', width: 180 },
        { prop: 'maritalStatusAddress', label: '户口地址', width: 180 },
        { prop: 'mobile', label: '联系电话', width: 120 },
        { prop: 'mail', label: '电子邮箱', width: 120 },
        { prop: 'relative', label: '紧急联系人', width: 100 },
        { prop: 'relativePhone', label: '紧急联系人电话', width: 140 },
        { prop: 'contractTypeName', label: '用工形式', width: 100 },
        { prop: 'deadline', label: '合同期限', width: 100 },
        { prop: 'fristContractStartTime', label: '第一次签订开始日期', width: 180 },
        { prop: 'contractEndTimeShow', label: '末次合同到期时间', width: 180 },
        { prop: 'contractSum', label: '合同签订次数', width: 120 },
        { prop: 'publicHomeName', label: '申请公租房', width: 100 },
        { prop: 'annualLeave', label: '年假', width: 80 },
        { prop: 'insuredStateName', label: '参保状态', width: 80 },
        { prop: 'freezeName', label: '账号状态', width: 80 },
        { prop: 'remark', label: '备注', width: 150 }
      ],
      button: {
        width: 400,
        buttonList: [
          { name: '备注', type: 'success', click: 'handleExp' },
          { name: '重置密码', type: 'primary', click: 'handleReset' },
          {
            name: '解冻',
            type: 'primary',
            click: 'handleThaw',
            condition: function (params) {
              if (params.freeze === '0') {
                return true
              }
            }
          },
          {
            name: '冻结',
            type: 'primary',
            click: 'handleFreeze',
            condition: function (params) {
              if (params.freeze === '1') {
                return true
              }
            }
          },
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (Number(this.$store.getters.userInfo.level) >= 5) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      multipleSelection: [],
      positionData: [],
      groupOption: [],
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getUserQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
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
            switch (xdd.politicalOutlook) {
              case '1':
                xdd.politicalOutlookName = '群众'
                break
              case '2':
                xdd.politicalOutlookName = '党员'
                break
              case '3':
                xdd.politicalOutlookName = '共青团员'
                break
              case '4':
                xdd.politicalOutlookName = '民主党派'
            }
            switch (xdd.maritalStatus) {
              case '1':
                xdd.maritalStatusName = '未婚'
                break
              case '2':
                xdd.maritalStatusName = '已婚'
                break
              case '3':
                xdd.maritalStatusName = '离异'
            }
            switch (xdd.registered) {
              case '1':
                xdd.registeredName = '城镇'
                break
              case '2':
                xdd.registeredName = '农村'
            }
            switch (xdd.publicHome) {
              case '1':
                xdd.publicHomeName = '是'
                break
              case '2':
                xdd.publicHomeName = '否'
            }
            switch (xdd.insuredState) {
              case '1':
                xdd.insuredStateName = '已参保'
                break
              case '2':
                xdd.insuredStateName = '未参保'
                break
              case '3':
                xdd.insuredStateName = '已退休'
                break
            }
            switch (xdd.freeze) {
              case '0':
                xdd.freezeName = '冻结'
                break
              case '1':
                xdd.freezeName = '正常'
            }
            switch (xdd.rankLev) {
              case '1':
                xdd.rankLevNum = '高级'
                break
              case '2':
                xdd.rankLevNum = '中级'
                break
              case '3':
                xdd.rankLevNum = '初级'
                break
              case '4':
                xdd.rankLevNum = '无职称'
            }
            switch (xdd.contractType) {
              case '1':
                xdd.contractTypeName = '劳动合同'
                break
              case '2':
                xdd.contractTypeName = '劳务协议'
                break
              case '3':
                xdd.contractTypeName = '实习协议'
                break
              case '4':
                xdd.contractTypeName = '兼职协议'
            }
            switch (xdd.education) {
              case '1':
                xdd.educationName = '硕士'
                break
              case '2':
                xdd.educationName = '本科'
                break
              case '3':
                xdd.educationName = '大专'
                break
              case '4':
                xdd.educationName = '中专'
                break
              case '5':
                xdd.educationName = '高中'
                break
              case '6':
                xdd.educationName = '高中以下'
            }
            switch (xdd.onTheJobStatus) {
              case '1':
                xdd.onTheJobStatusName = '在职'
                break
              case '2':
                xdd.onTheJobStatusName = '离职'
                break
              case '3':
                xdd.onTheJobStatusName = '试用期'
                break
              case '4':
                xdd.onTheJobStatusName = '退休'
                break
              case '5':
                xdd.onTheJobStatusName = '临时'
                break
              case '6':
                xdd.onTheJobStatusName = '实习期'
                break
              case '7':
                xdd.onTheJobStatusName = '挂靠'
                break
              case '8':
                xdd.onTheJobStatusName = '其他'
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
      if (this.groupId) {
        this.fromValiData.groupId = this.groupId[this.groupId.length - 1]
      }
      this.fromValiData.formalTimeStart = this.formalTime[0]
      this.fromValiData.formalTimeEnd = this.formalTime[1]
      this.fromValiData.inductionTimeStart = this.inductionTime[0]
      this.fromValiData.inductionTimeEnd = this.inductionTime[1]
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      delete this.fromValiData.formalTimeStart
      delete this.fromValiData.formalTimeEnd
      delete this.fromValiData.inductionTimeStart
      delete this.fromValiData.inductionTimeEnd
      this.inductionTime = []
      this.formalTime = []
      this.groupId = []
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleExp(params) {
      this.$layer.iframe({
        content: {
          content: exp, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Min,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            dictData: this.positionData
          } // props
        },
        area: ['1520px', '760px'],
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
            // dictData: this.positionData
          } // props
        },
        area: ['1520px', '760px'],
        title: '编辑',
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
      id.ids = id.ids.substring(0, id.ids.length - 1)
      if (id.ids) {
        window.open(
          process.env.BASE_API +
          process.env.JS_Server +
          '/Excel/user/download?' +
          'ids=' +
          id.ids
        )
      } else {
        window.open('../../../../static/模板.xlsx')
      }
    },
    handleReset(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将重置密码为初始密码, 是否继续',
        type: 'success',
        confirm: function () {
          let ids = {}
          ids.ids = params.id
          getUserResetPassword(ids).then(res => {
            that.getListData()
            that.$share.message('重置成功', 'success')
          })
        }
      })
    },
    handleThaw(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将解除账号冻结状态, 是否继续',
        type: 'success',
        confirm: function () {
          let ids = {}
          ids.ids = params.id
          getUserChangeFreeze(ids).then(res => {
            that.getListData()
            that.$share.message('解除成功', 'success')
          })
        }
      })
    },
    handleFreeze(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将账号设置为冻结状态, 是否继续',
        type: 'success',
        confirm: function () {
          let ids = {}
          ids.ids = params.id
          getUserFreeze(ids).then(res => {
            that.getListData()
            that.$share.message('设置成功', 'success')
          })
        }
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getUserDelUsers({ id: row.id }).then(res => {
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
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    // 部门
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
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            showList: this.showList
          } // props
        },
        area: ['1520px', '760px'],
        title: '用户详情',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.getListData()
    this.getGroupData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
