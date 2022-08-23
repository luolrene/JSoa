<template>
  <div class="pc-container">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="20">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加流程</el-button>
          <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 5">批量删除</el-button>

        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" v-if="num==='2'">
        </tableItem>
        <tableItem :obj="this" :tableData="tableData1" :tableHeader="tableHeader1" :button="button" :loading="loading" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" v-if="num==='1'">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import edit from './edit.vue'
import process from './process.vue'
import {
  getOaProcessGetChildrenSuper,
  getOaProcessQueryPageData,
  getOaProcessDel
} from '../../../api/integrated/flow.js'
export default {
  data() {
    return {
      loading: false,
      num: '2',
      props: {
        label: 'name',
        children: 'children'
      },
      typeData: {
        fatherId: 0,
        fatherName: ' '
      },
      infoData: {},
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        fatherId: 0
      },
      fromData: [
        { type: 'input', prop: 'name', label: '流程名称' },
        {
          type: 'select',
          prop: 'state',
          label: '是否启用',
          data: [{ name: '启用', id: '1' }, { name: '停用', id: '2' }]
        }
      ],
      tableData: [],
      tableData1: [],

      treeData: [],
      tableHeader: [
        { prop: 'name', label: '主流程名称', width: 150 },
        { prop: 'processTypeName', label: '对应版块', width: 150 },
        { prop: 'stateName', label: '是否启用', width: 80 },
        { prop: 'remarks', label: '备注', width: 200 }
      ],
      tableHeader1: [
        { prop: 'name', label: '子流程名称', width: 150 },
        { prop: 'processTypeName', label: '对应版块', width: 150 },
        { prop: 'stateName', label: '是否启用', width: 80 },
        { prop: 'condition', label: '条件', width: 120 },
        { prop: 'remarks', label: '备注', width: 200 }
      ],
      button: {
        width: 250,
        buttonList: [
          {
            name: '流程明细',
            type: 'primary',
            click: 'handleDetail',
            condition: params => {
              // 判定条件
              if (params.existence) {
                return false
              } else {
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
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      if (this.fromValiData.fatherId === 0) {
        getOaProcessQueryPageData(this.fromValiData).then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.state) {
              case '1':
                xdd.stateName = '启用'
                break
              case '2':
                xdd.stateName = '停用'
            }
            switch (xdd.processType) {
              case '1':
                xdd.processTypeName = '公用'
                break
              case '2':
                xdd.processTypeName = '定制'
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
      } else {
        this.num = '1'
        getOaProcessQueryPageData(this.fromValiData)
          .then(res => {
            res.result.pageList.forEach(xdd => {
              switch (xdd.state) {
                case '1':
                  xdd.stateName = '启用'
                  break
                case '2':
                  xdd.stateName = '停用'
              }
              switch (xdd.processType) {
                case '1':
                  xdd.processTypeName = '公用'
                  break
                case '2':
                  xdd.processTypeName = '定制'
              }
            })
            this.tableData1 = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    // 获取树
    getTreeData() {
      getOaProcessGetChildrenSuper({}).then(res => {
        this.treeData = res.result
      })
    },
    // 点击树
    getNodeClick(data, node, now) {
      this.fromValiData.fatherId = data.id
      this.typeData.fatherId = data.id
      this.typeData.fatherName = data.name
      this.typeData.processType = data.processType
      this.getListData()
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    // 返回顶部
    doBackToTop() {
      delete this.fromValiData.fatherId
      this.num = '2'
      this.typeData.fatherId = 0
      this.fromValiData.fatherId = 0
      this.getTreeData()
      this.doReset('fromValiData')
      this.getListData()
    },
    // 流程明细
    handleDetail(params) {
      this.$layer.iframe({
        content: {
          content: process, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '流程明细',
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
            fatherId: this.typeData
          } // props
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
        message:
          '此操作将永久删除该数据及其' +
          '<span style="color:red;font-weight:700">子数据</span>' +
          ', 是否继续?',
        confirm: function () {
          getOaProcessDel({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
            that.getTreeData()
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
    }
  },
  mounted() {
    this.getListData()
    this.getTreeData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
