<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-check" @click="handleConfirm()">确认</el-button>
    </fromSearch>
    <div>
      <span style="color: royalblue;">已选中人员(点击列表)：</span>
      <el-tag v-for="(xdd,index) in multipleSelection" :key="index" closable @close="getCloseTag(index)" style="margin-right: 10px;margin-bottom: 15px;">{{xdd.name}}</el-tag>
    </div>
    <tableItem :obj="this" :tableData="tableData" :layerid="layerid" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection="false" @getCellClick="getCellClick" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>
<script>
import { getToExamineStepTransfer } from '../../../api/work/myApprove.js'
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getGroupQueryPageData } from '@/api/jcxxgl/group.js'
export default {
  props: {
    params: Object,
    new: Number,
    type: String,
    layerid: ''
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'name', label: '姓名' },
        {
          type: 'select',
          prop: 'companyName',
          label: '单位',
          data: [
            { id: '1', name: '九升检测' },
            { id: '2', name: '集团公司' },
            { id: '3', name: '两山生态' },
            { id: '4', name: '吉东科技' },
            { id: '5', name: '碧泉科技' }
          ]
        },
        { type: 'select', prop: 'groupId', label: '部门名称', data: [] }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'name', label: '姓名', width: 90 },
        { prop: 'jobNumber', label: '工号', width: 80 },
        { prop: 'companyName', label: '单位', width: 70 },
        { prop: 'groupName', label: '部门', width: 150 },
        { prop: 'roleName', label: '角色', width: 120 }
      ],
      button: {
        width: 100,
        buttonList: [{ name: '确认', type: 'primary', click: 'handleConfirm' }]
      },
      multipleSelection: []
    }
  },
  methods: {
    onSubmit() {
      this.fromValiData.id = this.params.id
      this.fromValiData.type = this.type
      getToExamineStepTransfer(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$share.message('移交成功')
          if (this.new === 1) {
            this.$parent.handelCheck()
          } else {
            this.$parent.getListData()
          }
          this.btnLoading = false
          this.reload()
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    handleConfirm() {
      if (this.multipleSelection.length > 0) {
        let row = { name: '', id: '' }
        this.multipleSelection.forEach(xdd => {
          row.name += xdd.name + ','
          row.id += xdd.id + ','
        })
        row.name = row.name.slice(0, row.name.length - 1)
        row.id = row.id.slice(0, row.id.length - 1)
        this.fromValiData.currentUserName = row.name
        this.fromValiData.currentUserId = row.id
        this.onSubmit()
        this.$layer.close(this.layerid)
      } else {
        this.$message({
          showClose: true,
          message: '请选择需要移交的人员',
          type: 'warning'
        })
      }
    },
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
    getCellClick(params) {
      let isSwitch = true
      this.multipleSelection.forEach(xdd => {
        if (xdd.mobile === params.mobile) {
          isSwitch = false
        }
      })
      if (isSwitch) {
        this.multipleSelection.push(params)
      }
    },
    getCloseTag(index) {
      this.multipleSelection.splice(index, 1)
    },
    // 获取部门信息
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
    }
  },
  mounted() {
    // this.fromValiData.id = this.params.id
    this.getListData()
    this.getGroup()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
