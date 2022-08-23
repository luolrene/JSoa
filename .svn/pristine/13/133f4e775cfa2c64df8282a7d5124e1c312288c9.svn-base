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
        </fromSearch>
        <tableItem ref="infoTable" :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :isSelection="false" :loading="loading" :isPage="false">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
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
} from '../../../api/jcxxgl/group.js'
export default {
  props: {
    params: Object,
    ids: {
      type: Array,
      default: () => []
    },
    layerid: ''
  },
  components: {},
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
      button: {
        width: 250,
        buttonList: [{ name: '确认', type: 'primary', click: 'doGet' }]
      },
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
          if (this.ids.length === 0) {
            this.$nextTick(() => {
              this.tableData.forEach(xdd => {
                this.$refs.infoTable.$refs.myTable.toggleRowSelection(xdd, true)
              })
            })
          } else {
            this.$nextTick(() => {
              this.ids.forEach(xdd => {
                this.tableData.forEach(arc => {
                  if (arc.id === xdd) {
                    this.$refs.infoTable.$refs.myTable.toggleRowSelection(
                      arc,
                      true
                    )
                  }
                })
              })
            })
          }
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
    getNodeClick(data, node, now) {
      this.paramsData.fatherName = data.name
      this.paramsData.father = data.id
      this.presentNode = node
      this.getListData(data.id)
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
    doGet(row) {
      this.$parent.fromValiData.groupId = row.id
      this.$parent.fromValiData.groupName = row.name
      this.$parent.fromValiData.state = '其他部门'

      this.$parent.getOrId()
      this.$layer.close(this.layerid)
      this.handleGet(row)
    },
    handleGet(row) {
      this.$layer.close(this.layerid)
      this.btnLoading = false
    }
  },
  mounted() {
    this.getListData()
    this.getTreeData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
