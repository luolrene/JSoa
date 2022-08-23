<!-- 分组管理 -->
<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="20">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-circle-check" @click="doGet()">确认</el-button>
        </fromSearch>
        <div>
          <span style="color: royalblue;">已选部门(点击列表)：</span>
          <el-tag v-for="(xdd,index) in multipleSelection" :key="index" closable @close="getCloseTag(index)" style="margin-right: 10px;margin-bottom: 15px;">{{xdd.name}}</el-tag>
        </div>
        <tableItem ref="infoTable" :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :isPage="false" @getCellClick="getCellClick">
        </tableItem>
        <div style="display: flex;">
          <el-button type="primary" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getGroupQueryPageData,
  getGroupQueryAllGroupsTree
} from '@/api/jcxxgl/group.js'
export default {
  props: {
    params: Object,
    groupData: Array,
    layerid: ''
  },
  data() {
    return {
      loading: false,
      presentNode: '',
      props: {
        label: 'name',
        children: 'children'
      },
      fromValiData: {
        pageSize: 999,
        pageNow: 1,
        keyWord: null,
        father: '0'
      },
      fromData: [{ type: 'input', prop: 'keyWord', label: '部门名称' }],
      paramsData: {
        father: 0
      },
      tableData: [],
      treeData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '部门名称',
          width: 250
        },
        {
          prop: 'exp',
          label: '备注',
          width: 250
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    getListData(id) {
      this.loading = true
      if (id) {
        this.fromValiData.father = id
      }
      getGroupQueryPageData(this.fromValiData)
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
    getTreeData() {
      getGroupQueryAllGroupsTree({}).then(res => {
        this.treeData = res.result
      })
    },
    appendTree(params) {
      this.$refs.myTree.$refs.elTree.append(params, this.presentNode)
    },
    editTree(params) {
      let xdd = this.$refs.myTree.$refs.elTree.getNode(params.id)
      xdd.data.exp = params.exp
      xdd.data.father = params.father
      xdd.data.id = params.id
      xdd.data.name = params.name
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
    doBackToTop() {
      this.fromValiData.father = 0
      this.getTreeData()
      this.doReset('fromValiData')
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
    getNodeClick(data, node, now) {
      this.paramsData.fatherName = data.name
      this.paramsData.father = data.id
      this.presentNode = node
      this.multipleSelection = this.multipleSelection
      this.getListData(data.id)
    },
    getCloseTag(index) {
      this.multipleSelection.splice(index, 1)
    },
    doGet() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请勾选需要的部门', 'warning')
        return
      }
      this.multipleSelection = Array.from(new Set(this.multipleSelection))
      // let obj = {}
      // this.multipleSelection = this.multipleSelection.reduce((cur, next) => {
      //   obj[next.id] ? '' : (obj[next.id] = true && cur.push(next))
      //   return cur
      // }, [])

      let ids = { id: '', name: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
        ids.name += xdd.name + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      ids.name = ids.name.substring(0, ids.name.length - 1)
      this.$parent.fromValiData.groupId = ids.id
      this.$parent.groupData = this.multipleSelection
      this.$parent.fromValiData.groupIdAll = ids.id
      this.$parent.fromValiData.groupNameAll = ids.name
      this.$parent.getData(ids)
      this.$layer.close(this.layerid)
      this.handleGet(ids)
    },
    handleGet(row) {
      this.$layer.close(this.layerid)
      this.btnLoading = false
    }
  },
  mounted() {
    if (this.groupData) this.multipleSelection = this.groupData
    this.getListData()
    this.getTreeData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
