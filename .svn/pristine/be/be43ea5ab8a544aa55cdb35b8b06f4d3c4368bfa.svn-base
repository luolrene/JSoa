<!-- 人员分配 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
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
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getGroupQueryPageData } from '@/api/jcxxgl/group.js'
export default {
  props: {
    layerid: '',
    isFenp: String,
    data: Array
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
        position: null,
        groupId: null
      },
      fromData: [
        { type: 'input', prop: 'name', label: '用户名称' },
        { type: 'select', prop: 'groupId', label: '部门名称', data: [] }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '用户名称'
        },
        {
          prop: 'roleName',
          label: '角色'
        },
        {
          prop: 'administrativeRankName',
          label: '行政职级'
        },
        {
          prop: 'groupName',
          label: '分组'
        },
        {
          prop: 'level',
          label: '用户级别'
        },
        {
          prop: 'sex',
          label: '性别'
        }
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
      getUserQueryPageData(this.fromValiData)
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
    getGroup() {
      getGroupQueryPageData({ pageSize: 999, pageNow: 1, father: '0' }).then(
        res => {
          this.fromData[1].data = res.result.pageList
        }
      )
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.groupIds = []
      this.fromValiData.groupId = null
      this.fromValiData.pageNow = 1
      delete this.fromValiData.isFenp
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
    doConfirm() {
      let selectPerson = { userName: '', userId: '' }
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要分配的人员', 'warning')
        return
      }
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
      this.$parent.fromValiData.userId = selectPerson.userId
      this.$parent.fromValiData.userName = selectPerson.userName
      this.$parent.onSubmit()
      this.$layer.close(this.layerid)
      // this.handleGet(row)
      // this.$parent.getOrId()

      // this.$parent.getPerson(selectPerson).then(arg => {
      //   if (arg) {
      //     this.$layer.close(this.layerid)
      //     this.$share.message('添加成功')
      //   }
      // })
    }
  },
  mounted() {
    this.getListData()
    this.getGroup()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
