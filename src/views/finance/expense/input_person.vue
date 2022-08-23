<!-- 人员分配 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-check" @click="doConfirm()">确认</el-button>
    </fromSearch>
    <div>
      <span style="color: royalblue;">已选中人员(点击列表)：</span>
      <el-tag v-for="(xdd,index) in multipleSelection" :key="index" closable @close="getCloseTag(index)" style="margin-right: 10px;margin-bottom: 15px;">{{xdd.name}}</el-tag>
    </div>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :loading="loading" customHeight="400" :isSelection="false" @getCellClick="getCellClick" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getUserGetData } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    layerid: '',
    userData: Array
  },
  components: {},
  data() {
    return {
      loading: false,
      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null,
        position: null
      },
      fromData: [{ type: 'input', prop: 'name', label: '用户名称' }],
      tableData: [],
      tableHeader: [
        { prop: 'groupName', label: '部门' },
        { prop: 'name', label: '用户名称' },
        { prop: 'roleName', label: '角色' },
        { prop: 'administrativeRankName', label: '行政职级' },
        { prop: 'level', label: '用户级别' },
        { prop: 'sex', label: '性别' }
      ],
      multipleSelection: [],
      positionData: [],
      groupOption: [],
      groupIds: [],
      userList: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getUserGetData(this.fromValiData)
        .then(res => {
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
        if (xdd.id === params.id) {
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
    doConfirm() {
      let selectPerson = { userName: '', userId: '' }
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要分配的人员', 'warning')
        return
      }
      this.multipleSelection = Array.from(new Set(this.multipleSelection))
      this.multipleSelection.forEach(xdd => {
        selectPerson.userName += xdd.name + ','
        selectPerson.userId += xdd.id + ','
      })
      selectPerson.userName = selectPerson.userName.substring(
        0,
        selectPerson.userName.length - 1
      )
      selectPerson.userId = selectPerson.userId.substring(
        0,
        selectPerson.userId.length - 1
      )
      this.$parent.fromValiData.counterpartsUserId = selectPerson.userId
      this.$parent.fromValiData.counterpartsUser = selectPerson.userName
      this.$parent.userData = this.multipleSelection
      this.$layer.close(this.layerid)
    }
  },
  mounted() {
    if (this.userData) {
      this.multipleSelection = this.userData
    }
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
